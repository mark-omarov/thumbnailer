import path from 'node:path';
import type { Request, Response } from 'express';
import { createMinioClient, ensureBucketExists } from '@thumbnailer/minio';
import {
  createPgJobRepositoryAdapter,
  createBullmqJobQueueAdapter,
  bullmqJobs,
} from '@thumbnailer/shared';
// TODO: Consider https://github.com/perry-mitchell/ulidx
import { v4 as uuid } from 'uuid';

import { env } from '../../env.js';

export async function createJobController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image file is required.' });
      return;
    }

    const jobRepository = createPgJobRepositoryAdapter();
    const queue = createBullmqJobQueueAdapter({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    }).createQueue();
    const minioClient = createMinioClient({
      endPoint: env.MINIO_ENDPOINT,
      port: env.MINIO_PORT,
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
      useSSL: env.MINIO_SSL,
    });

    await ensureBucketExists(minioClient, env.MINIO_BUCKET);

    const jobId = uuid();
    const now = new Date();

    const minioObjectKey = `${jobId}/original${path.extname(req.file.originalname)}`;
    await minioClient.putObject(
      env.MINIO_BUCKET,
      minioObjectKey,
      req.file.buffer
    );

    await jobRepository.insertJob({
      jobId,
      status: 'pending',
      originalImagePath: minioObjectKey,
      thumbnailImagePath: null,
      createdAt: now,
      updatedAt: now,
    });

    await queue.add(bullmqJobs.createThumbnail, {
      jobId,
      originalImagePath: minioObjectKey,
      size: getThumbnailSize(req.query.size as string),
    });

    res.status(201).json({ jobId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job.' });
  }
}

function getThumbnailSize(sizeStr: string): { width: number; height: number } {
  const size = { width: 100, height: 100 };
  if (!sizeStr) return size;
  const [width = 100, height = 100] = sizeStr.split('x').map(Number);
  if (isNaN(width) || isNaN(height) || !width || !height) return size;
  return { width, height };
}
