import type { Client } from '@thumbnailer/minio';

import type { StoragePort } from '../ports/storage.port.js';
import { streamToBuffer } from '../lib/streamToBuffer.js';

export function createMinioStorageAdapter(
  client: Client,
  bucketName: string
): StoragePort {
  return {
    async getObject(key: string): Promise<Buffer> {
      const objectStream = await client.getObject(bucketName, key);
      return streamToBuffer(objectStream);
    },
    async putObject(key: string, data: Buffer): Promise<void> {
      await client.putObject(bucketName, key, data);
    },
  };
}
