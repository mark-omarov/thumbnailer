import { describe, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { Readable } from 'node:stream';
import type { Client } from '@thumbnailer/minio';

import { createMinioStorageAdapter } from './minio-storage.adapter.js';

const client: Pick<Client, 'getObject' | 'putObject'> = {
  getObject: vi.fn(async (bucketName: string, key: string) => {
    const stream = new Readable();
    stream.push(bucketName);
    stream.push(':');
    stream.push(key);
    stream.push(null);
    return stream;
  }),
  putObject: vi.fn(),
};

describe('minio-storage.adapter', async () => {
  const bucketName = 'test-bucket';
  let adapter: ReturnType<typeof createMinioStorageAdapter>;

  beforeAll(() => {
    adapter = createMinioStorageAdapter(client as Client, bucketName);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get an object from minio', async () => {
    const key = 'test-get-key';
    const result = await adapter.getObject(key);

    expect(client.getObject).toHaveBeenCalledTimes(1);
    expect(client.getObject).toHaveBeenCalledWith(bucketName, key);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.toString()).toBe(`${bucketName}:${key}`);
  });

  it('should put an object to minio', async () => {
    const key = 'test-put-key';
    const bufferData = Buffer.from('test-data', 'utf-8');

    await adapter.putObject(key, bufferData);

    expect(client.putObject).toHaveBeenCalledTimes(1);
    expect(client.putObject).toHaveBeenCalledWith(bucketName, key, bufferData);
  });
});
