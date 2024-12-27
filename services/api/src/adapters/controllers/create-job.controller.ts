import type { Request, Response } from 'express';
import { createMinioClient } from '@thumbnailer/minio';
import {
  createPgJobRepositoryAdapter,
  createBullmqJobQueueAdapter,
  bullmqJobs,
} from '@thumbnailer/shared';
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

    const jobId = uuid();
    const now = new Date();

    const minioObjectKey = `${jobId}/${req.file.originalname}`;
    await minioClient.putObject(
      env.MINIO_BUCKET,
      minioObjectKey,
      req.file.buffer
    );

    await jobRepository.insertJob({
      jobId,
      status: 'processing',
      originalImagePath: minioObjectKey,
      thumbnailImagePath: null,
      createdAt: now,
      updatedAt: now,
    });

    await queue.add(bullmqJobs.createThumbnail, {
      jobId,
      originalImagePath: minioObjectKey,
    });

    res.status(201).json({ jobId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job.' });
  }
}
