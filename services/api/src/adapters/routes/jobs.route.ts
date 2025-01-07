import { Router } from 'express';
import multer from 'multer';

import { createJobController } from '../controllers/create-job.controller.js';
import { getJobController } from '../controllers/get-job.controller.js';
import { getAllJobsController } from '../controllers/get-all-jobs.controller.js';
import { getThumbnailController } from '../controllers/get-thumbnail.controller.js';
import { maxFileSize, validateExtension } from '../image-file.adapter.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: (_req, file, cb) =>
    cb(null, validateExtension(file.originalname)),
});

router.post('/', upload.single('image'), createJobController);
router.get('/:id', getJobController);
router.get('/:id/thumbnail', getThumbnailController);
router.get('/', getAllJobsController);

export { router as jobRouter };
