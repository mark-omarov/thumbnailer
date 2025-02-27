import express from 'express';

import { errorHandler } from './middleware/error-handler.js';
import { router } from './routes/api/v1/index.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(errorHandler);

  app.get('/healthcheck', (_req, res) => {
    res.send('OK');
  });

  app.use('/api/v1', router);

  return app;
};
