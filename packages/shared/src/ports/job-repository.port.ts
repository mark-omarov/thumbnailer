import type { schema } from '@thumbnailer/db';

export type Job = typeof schema.jobs.$inferSelect;
export type JobStatus = (typeof schema.jobs.status.enumValues)[number];

export type JobRepositoryPort = {
  insertJob(job: Job): Promise<void>;
  findJobById(jobId: string): Promise<Job | null>;
  findAllJobs(): Promise<Job[]>;
  updateJob(job: Job): Promise<void>;
};
