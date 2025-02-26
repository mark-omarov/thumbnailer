import type { MetadataRepository, Metadata } from '@thumbnailer/domain-core';
import { drizzleSchema, type DrizzleDatabase } from '../db/index.js';

const toDomain = (metadata: drizzleSchema.DrizzleMetadata): Metadata => ({
  id: metadata.id,
  status: metadata.status,
  uploadedImagePath: metadata.uploadedImagePath,
  thumbnailImagePath: metadata.thumbnailImagePath ?? undefined,
  createdAt: new Date(metadata.createdAt),
  updatedAt: new Date(metadata.updatedAt),
});

const fromDomain = (metadata: Metadata): drizzleSchema.DrizzleMetadata => ({
  id: metadata.id,
  status: metadata.status,
  uploadedImagePath: metadata.uploadedImagePath,
  thumbnailImagePath: metadata.thumbnailImagePath ?? null,
  createdAt: metadata.createdAt.toISOString(),
  updatedAt: metadata.updatedAt.toISOString(),
});

export const metadataRepositoryDrizzle = (
  db: DrizzleDatabase
): MetadataRepository => ({});
