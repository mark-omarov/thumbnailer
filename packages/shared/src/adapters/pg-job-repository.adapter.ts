import { db, schema, eq } from '@thumbnailer/db';

import type { JobRepositoryPort } from '../ports/job-repository.port.js';

export function createPgJobRepositoryAdapter(): JobRepositoryPort {
  return {
    async insertJob(job) {
      await db.insert(schema.jobs).values(job);
    },
    async findJobById(jobId) {
      const [record] = await db
        .select()
        .from(schema.jobs)
        .where(eq(schema.jobs.jobId, jobId));
      return record || null;
    },
    async findAllJobs() {
      return await db.select().from(schema.jobs);
    },
    async updateJob(job) {
      await db
        .update(schema.jobs)
        .set(job)
        .where(eq(schema.jobs.jobId, job.jobId));
    },
  };
}
