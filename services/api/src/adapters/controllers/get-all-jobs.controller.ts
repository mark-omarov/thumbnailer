import type { Request, Response } from 'express';
import { createPgJobRepositoryAdapter } from '@thumbnailer/shared';

export async function getAllJobsController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const jobRepository = createPgJobRepositoryAdapter();
    const jobs = await jobRepository.findAllJobs();
    res.json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get jobs.' });
  }
}
