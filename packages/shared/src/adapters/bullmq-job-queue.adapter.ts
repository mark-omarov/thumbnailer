import { Queue, Worker, type Job } from 'bullmq';

import type { JobQueuePort } from '../ports/job-queue.port.js';

export const bullmqQueueName = 'thumbnail-queue';
export const bullmqJobs = {
  createThumbnail: 'createThumbnail',
};

export function createBullmqJobQueueAdapter(connection: {
  host: string;
  port: number;
}): JobQueuePort {
  return {
    createQueueWorker(cb) {
      new Worker(bullmqQueueName, cb, { connection });
    },
    createQueue() {
      return new Queue(bullmqQueueName, { connection });
    },
  };
}
