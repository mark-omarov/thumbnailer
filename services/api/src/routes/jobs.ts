import type { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { thumbnailQueue } from '../lib/queue.js';
import { db, schema } from '@thumbnailer/db';
import { eq } from 'drizzle-orm';
import { minioClient, bucketName } from '../lib/minioClient.js';

export async function uploadJob(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image file is required.' });
      return;
    }

    const jobId = uuid();
    const now = new Date();

    const minioObjectKey = `${jobId}/${req.file.originalname}`;
    await minioClient.putObject(bucketName, minioObjectKey, req.file.buffer);

    await db.insert(schema.jobs).values({
      jobId,
      status: 'processing',
      originalImagePath: minioObjectKey,
      createdAt: now,
      updatedAt: now,
    });

    await thumbnailQueue.add('createThumbnail', {
      jobId,
      originalImagePath: minioObjectKey,
    });

    res.status(201).json({ jobId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job.' });
  }
}

export async function getJob(req: Request, res: Response): Promise<void> {
  const { id: jobId } = req.params;

  if (!jobId) {
    res.status(400).json({ message: 'Job ID is required' });
    return;
  }

  const [record] = await db
    .select()
    .from(schema.jobs)
    .where(eq(schema.jobs.jobId, jobId));

  if (!record) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  res.status(200).json({
    jobId: record.jobId,
    status: record.status,
  });
}

export async function getThumbnail(req: Request, res: Response): Promise<void> {
  const { id: jobId } = req.params;

  if (!jobId) {
    res.status(400).json({ message: 'Job ID is required' });
    return;
  }

  const [record] = await db
    .select()
    .from(schema.jobs)
    .where(eq(schema.jobs.jobId, jobId));

  if (!record) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  if (record.status !== 'completed' || !record.thumbnailImagePath) {
    res.status(400).json({ message: 'Thumbnail is not available yet.' });
    return;
  }

  try {
    const objectStream = await minioClient.getObject(
      bucketName,
      record.thumbnailImagePath
    );
    objectStream.pipe(res);
  } catch (err) {
    console.error('Error fetching thumbnail from Minio', err);
    res.status(500).json({ message: 'Error fetching thumbnail from storage.' });
  }
}

export async function getJobs(req: Request, res: Response): Promise<void> {
  const results = await db.select().from(schema.jobs);
  res.status(200).json(
    results.map(({ jobId, status, createdAt, updatedAt }) => ({
      jobId,
      status,
      createdAt,
      updatedAt,
    }))
  );
}
