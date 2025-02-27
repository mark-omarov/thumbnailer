export class MetadataRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MetadataRepositoryError';
  }
}
