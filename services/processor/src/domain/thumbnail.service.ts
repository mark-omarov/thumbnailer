import path from 'node:path';
import type {
  StoragePort,
  JobRepositoryPort,
  JobStatus,
} from '@thumbnailer/shared';

type ProcessThumbnaiOpts = {
  jobId: string;
  originalImagePath: string;
  size: { width: number; height: number };
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

export async function processThumbnail({
  jobId,
  originalImagePath,
  size,
  storage,
  jobRepository,
}: ProcessThumbnaiOpts) {
  const sourceBuffer = await storage.getObject(originalImagePath);
  const thumbnailBuffer = await createThumbnail(sourceBuffer, size);
  const thumbnailKey = `${jobId}/thumbnail${path.extname(originalImagePath)}`;

  await storage.putObject(thumbnailKey, thumbnailBuffer);
  await updateJobStatus(jobId, 'completed', thumbnailKey, jobRepository);
}

async function createThumbnail(
  buffer: Buffer,
  size: { width: number; height: number }
): Promise<Buffer> {
  const sharp = await import('sharp');
  return sharp.default(buffer).resize(size.width, size.height).toBuffer();
}
