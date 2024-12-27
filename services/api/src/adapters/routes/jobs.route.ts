import { Router } from 'express';
import multer from 'multer';

import { createJobController } from '../controllers/create-job.controller.js';
import { getJobController } from '../controllers/get-job.controller.js';
import { getAllJobsController } from '../controllers/get-all-jobs.controller.js';
import { getThumbnailController } from '../controllers/get-thumbnail.controller.js';
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), createJobController);
router.get('/:id', getJobController);
router.get('/:id/thumbnail', getThumbnailController);
router.get('/', getAllJobsController);

export { router as jobRouter };
