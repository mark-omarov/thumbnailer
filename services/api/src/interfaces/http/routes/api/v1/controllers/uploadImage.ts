import path from 'node:path';
import { type Request, type Response } from 'express';
import createHttpError from 'http-errors';
import { type UploadedImage } from '@thumbnailer/domain-core';

export const uploadImage = (req: Request, _res: Response) => {
  // TODO: ts should respect zod validation of multer supported fields
  if (!req.file) throw createHttpError(400, 'File is required');
  const uploadedImage: UploadedImage = {
    name: req.file.originalname,
    extension: path.extname(req.file.originalname),
    buffer: req.file.buffer,
  };
  console.log(uploadedImage);
};
