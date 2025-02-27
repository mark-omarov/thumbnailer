import { Router } from 'express';

import { router as imagesRouter } from './routes/images.js';

const router = Router();

router.use('/images', imagesRouter);

export { router };
