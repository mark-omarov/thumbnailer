export type UploadedImage = {
  name: string;
  extension: string;
  buffer: Buffer;
};

export type UploadedImageConfig = {
  allowedExtensions: Record<string, boolean>;
  maxFileSize: number;
};

export const uploadedImageConfig: UploadedImageConfig = {
  allowedExtensions: {
    '.jpg': true,
    '.jpeg': true,
    '.png': true,
  },
  maxFileSize: 1024 * 1024 * 2,
};
