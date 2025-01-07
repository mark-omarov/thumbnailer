import { z } from 'zod';

// TODO: This and env.ts in processor could be part of shared package

const envSchema = z.object({
  MINIO_ENDPOINT: z.string(),
  MINIO_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  MINIO_ACCESS_KEY: z.string(),
  MINIO_SECRET_KEY: z.string(),
  MINIO_SSL: z.preprocess((val) => val === 'true', z.boolean()).default(true),
  MINIO_BUCKET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  PORT: z.number().default(3000),
  MAX_FILE_SIZE: z.number().default(15 * 1024 * 1024), // 15MB
});

export const env = envSchema.parse(process.env);
