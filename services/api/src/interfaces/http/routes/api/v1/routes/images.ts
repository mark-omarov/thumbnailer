import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import { uploadedImageConfig } from '@thumbnailer/domain-core';

import { validate } from '../middleware/validate.js';
import { uploadImageBodySchema } from '../schemas/imagesBodySchema.js';
import { uploadImage } from '../controllers/uploadImage.js';

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
  validate(uploadImageBodySchema),
  uploadImage
);

export { router };
