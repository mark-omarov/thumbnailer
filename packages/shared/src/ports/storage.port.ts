export type StoragePort = {
  getObject: (key: string) => Promise<Buffer>;
  putObject: (key: string, data: Buffer) => Promise<void>;
};
