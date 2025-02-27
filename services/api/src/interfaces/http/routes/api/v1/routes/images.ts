import path from 'node:path';
import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import createHttpError from 'http-errors';
import {
  type UploadedImage,
  uploadedImageConfig,
} from '@thumbnailer/domain-core';

import { validate } from '../middleware/validate.js';
import { uploadImageFormSchema } from '../schemas/imagesBodySchema.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: uploadedImageConfig.maxFileSize,
  },
  fileFilter: (_req, file, cb) =>
    cb(
      null,
      uploadedImageConfig.allowedExtensions[path.extname(file.originalname)] ??
        false
    ),
});

router.post(
  '/',
  upload.single('image'),
  validate(uploadImageFormSchema),
  (req: Request, _res: Response) => {
    // TODO: ts should respect zod validation of multer supported fields
    if (!req.file) throw createHttpError(400, 'File is required');
    const uploadedImage: UploadedImage = {
      name: req.file.originalname,
      extension: path.extname(req.file.originalname),
      buffer: req.file.buffer,
    };
    console.log(uploadedImage);
  }
);

export { router };
