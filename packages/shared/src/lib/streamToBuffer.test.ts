import { describe, it, expect } from 'vitest';
import { Readable } from 'node:stream';

import { streamToBuffer } from './streamToBuffer.js';

describe('streamToBuffer', async () => {
  it('should convert a stream to a buffer', async () => {
    const stream = new Readable();
    stream.push('foo');
    stream.push(null);
    const buffer = await streamToBuffer(stream);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.toString()).toBe('foo');
  });
});
