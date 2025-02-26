import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const applicationSchema = pgSchema('application');

export const drizzleMetadataStatus = applicationSchema.enum('status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const drizzleMetadata = applicationSchema.table('metadata', {
  id: uuid('id').primaryKey().notNull(),
  status: drizzleMetadataStatus('status').notNull(),
  uploadedImagePath: text('upload_image_path').notNull(),
  thumbnailImagePath: text('thumbnail_image_path'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const drizzleMetadataSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  uploadedImagePath: z.string(),
  thumbnailImagePath: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DrizzleMetadata = z.infer<typeof drizzleMetadataSchema>;
