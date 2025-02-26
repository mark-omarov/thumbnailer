export const METADATA_STATUSES = [
  'pending',
  'processing',
  'completed',
  'failed',
] as const;
export type MetadataStatus = (typeof METADATA_STATUSES)[number];
export type MetadataId = string;
export type Metadata = {
  id: MetadataId;
  status: MetadataStatus;
  uploadedImagePath: string;
  thumbnailImagePath?: string;
  createdAt: Date;
  updatedAt: Date;
};
