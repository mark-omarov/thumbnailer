import { Router } from 'express';
import multer from 'multer';

import { uploadJob, getJob, getThumbnail, getJobs } from './jobs.js';

const upload = multer({ storage: multer.memoryStorage() });

export const jobRouter = Router();

jobRouter.post('/', upload.single('image'), uploadJob);
jobRouter.get('/:id', getJob);
jobRouter.get('/:id/thumbnail', getThumbnail);
jobRouter.get('/', getJobs);
