import { eq } from 'drizzle-orm';
import type { MetadataRepository, Metadata } from '@thumbnailer/domain-core';

import { schema, type DrizzleDatabase } from '../db/index.js';
import { MetadataRepositoryError } from './metadata-repository-errors.js';

const toDomain = (metadata: schema.MetadataSelectSchema): Metadata => ({
  id: metadata.id,
  status: metadata.status,
  uploadedImagePath: metadata.uploadedImagePath,
  thumbnailImagePath: metadata.thumbnailImagePath ?? undefined,
  createdAt: new Date(metadata.createdAt),
});

const fromDomain = (metadata: Metadata): schema.MetadataInsertSchema => ({
  id: metadata.id,
  status: metadata.status,
  uploadedImagePath: metadata.uploadedImagePath,
  thumbnailImagePath: metadata.thumbnailImagePath ?? null,
});

export const metadataRepositoryDrizzle = (
  db: DrizzleDatabase
): MetadataRepository => ({
  save: async (metadata: Metadata) => {
    const [record] = await db
      .insert(schema.metadata)
      .values(fromDomain(metadata))
      .returning({ id: schema.metadata.id });
    if (!record)
      throw new MetadataRepositoryError(
        `Failed to save metadata: ${JSON.stringify(metadata, null, 2)}`
      );
    return record.id;
  },
  findById: async (id: string) => {
    const [record] = await db
      .select()
      .from(schema.metadata)
      .where(eq(schema.metadata.id, id));
    return record ? toDomain(record) : null;
  },
  updateStatus: async (id: string, status: Metadata['status']) => {
    await db
      .update(schema.metadata)
      .set({ status })
      .where(eq(schema.metadata.id, id));
  },
});
