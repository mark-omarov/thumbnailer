import type { Request, Response } from 'express';
import { createPgJobRepositoryAdapter } from '@thumbnailer/shared';

export async function getJobController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'Job ID is required' });
      return;
    }

    const jobRepository = createPgJobRepositoryAdapter();
    const job = await jobRepository.findJobById(req.params.id);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    res.json({
      jobId: job.jobId,
      status: job.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get job.' });
  }
}
