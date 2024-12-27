import { Queue } from 'bullmq';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

export const thumbnailQueue = new Queue('thumbnail-queue', {
  connection: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});
