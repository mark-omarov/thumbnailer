export type UploadedImage = {
  name: string;
  buffer: Buffer;
};

export type storeUploadedImage = (image: UploadedImage) => Promise<string>;
