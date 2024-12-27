import type { Request, Response } from 'express';
import { createPgJobRepositoryAdapter } from '@thumbnailer/shared';
import { createMinioClient } from '@thumbnailer/minio';

import { env } from '../../env.js';

export async function getThumbnailController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'Job ID is required' });
    return;
  }

  const jobRepository = createPgJobRepositoryAdapter();
  const job = await jobRepository.findJobById(id);

  if (!job) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  if (job.status !== 'completed' || !job.thumbnailImagePath) {
    res.status(400).json({ message: 'Thumbnail is not available yet.' });
    return;
  }

  const minioClient = createMinioClient({
    endPoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    useSSL: env.MINIO_SSL,
  });

  const objectStream = await minioClient.getObject(
    env.MINIO_BUCKET,
    job.thumbnailImagePath
  );

  objectStream.pipe(res);
}
