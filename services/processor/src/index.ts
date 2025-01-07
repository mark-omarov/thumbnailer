import { createMinioClient } from '@thumbnailer/minio';
import {
  createMinioStorageAdapter,
  createPgJobRepositoryAdapter,
  createBullmqJobQueueAdapter,
  bullmqJobs,
} from '@thumbnailer/shared';

import { env } from './env.js';
import {
  processThumbnail,
  updateJobStatus,
} from './domain/thumbnail.service.js';

async function main() {
  const minioClient = createMinioClient({
    endPoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    useSSL: env.MINIO_SSL,
  });

  const storage = createMinioStorageAdapter(minioClient, env.MINIO_BUCKET);
  const jobRepository = createPgJobRepositoryAdapter();
  const jobQueue = createBullmqJobQueueAdapter({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  });

  jobQueue.createQueueWorker(async (job) => {
    try {
      switch (job.name) {
        case bullmqJobs.createThumbnail:
          const { jobId, originalImagePath } = job.data;
          await processThumbnail(jobId, originalImagePath, {
            storage,
            jobRepository,
          });
          return;
        default:
          console.error(`Unknown job name: ${job.name}`);
      }
    } catch (error) {
      console.error('Error processing job:', error);
      await updateJobStatus(job.data.jobId, 'failed', undefined, jobRepository);
    }
  });
}

main()
  .then(() => console.log('Processor service started'))
  .catch((err) => console.error(err));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
