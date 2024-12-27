import express from 'express';

import { jobRouter } from '../adapters/routes/jobs.route.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/jobs', jobRouter);

  app.get('/health', (_req, res) => {
    res.status(200).send('OK');
  });

  return app;
}
