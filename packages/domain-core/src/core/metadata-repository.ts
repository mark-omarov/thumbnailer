import type { Metadata, MetadataId } from './metadata.js';

export type MetadataRepository = {
  save: (metadata: Metadata) => Promise<MetadataId>;
  findById: (id: string) => Promise<Metadata | null>;
  updateStatus: (id: string, status: Metadata['status']) => Promise<void>;
};
