import * as Minio from 'minio';
import { z } from 'zod';

export type * from 'minio';

export const minioClientOptionsSchema = z.object({
  endPoint: z.string(),
  port: z.number(),
  accessKey: z.string(),
  secretKey: z.string(),
  useSSL: z.boolean().default(true),
});

export function createMinioClient(
  options: z.infer<typeof minioClientOptionsSchema>
) {
  const parsedOptions = minioClientOptionsSchema.parse(options);
  return new Minio.Client(parsedOptions);
}

export async function ensureBucketExists(
  client: Minio.Client,
  bucketName: string
) {
  const exists = await client.bucketExists(bucketName);
  if (!exists) {
    await client.makeBucket(bucketName);
    console.log(`Bucket "${bucketName}" created successfully.`);
  }
}
