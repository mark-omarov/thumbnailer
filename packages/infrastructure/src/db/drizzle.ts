import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { uuidv7 } from 'uuidv7';

export const applicationSchema = pgSchema('application');

export const metadataStatus = applicationSchema.enum('status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const metadata = applicationSchema.table('metadata', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuidv7()),
  status: metadataStatus('status').notNull(),
  uploadedImagePath: text('upload_image_path').notNull(),
  thumbnailImagePath: text('thumbnail_image_path'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const metadataSelectSchema = createSelectSchema(metadata);
export const metadataInsertSchema = createInsertSchema(metadata);

export type MetadataSelectSchema = z.infer<typeof metadataSelectSchema>;
export type MetadataInsertSchema = z.infer<typeof metadataInsertSchema>;
