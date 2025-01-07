import { pgEnum, pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const applicationSchema = pgSchema('application');

export const status = applicationSchema.enum('status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const jobs = applicationSchema.table('jobs', {
  jobId: uuid('job_id').primaryKey().notNull(),
  status: status('status').notNull(),
  originalImagePath: text('original_image_path'),
  thumbnailImagePath: text('thumbnail_image_path'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
