import type {
  StoragePort,
  JobRepositoryPort,
  JobStatus,
} from '@thumbnailer/shared';

type ProcessThumbnaiOpts = {
  storage: StoragePort;
  jobRepository: JobRepositoryPort;
};

export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
  thumbnailKey: string | undefined,
  jobRepository: JobRepositoryPort
): Promise<void> {
  const job = await jobRepository.findJobById(jobId);

  if (!job) {
    throw new Error(`Job ${jobId} not found`);
  }

  await jobRepository.updateJob({
    ...job,
    status,
    thumbnailImagePath: thumbnailKey ?? null,
  });
}

export async function processThumbnail(
  jobId: string,
  originalImagePath: string,
  { storage, jobRepository }: ProcessThumbnaiOpts
): Promise<void> {
  const sourceBuffer = await storage.getObject(originalImagePath);
  const thumbnailBuffer = await createThumbnail(sourceBuffer);
  const thumbnailKey = `${jobId}/thumbnail.jpg`;

  await storage.putObject(thumbnailKey, thumbnailBuffer);
  await updateJobStatus(jobId, 'completed', thumbnailKey, jobRepository);
}

async function createThumbnail(buffer: Buffer): Promise<Buffer> {
  const sharp = await import('sharp');
  return sharp.default(buffer).resize(100, 100).toBuffer();
}
