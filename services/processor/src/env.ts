import { z } from 'zod';

const envSchema = z.object({
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_SSL: z.preprocess((val) => val === 'true', z.boolean()).default(true),
  MINIO_BUCKET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()),
});

export const env = envSchema.parse(process.env);
