import express from 'express';
import { jobRouter } from './routes/index.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.use('/jobs', jobRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`API listening on port ${PORT}`);
});
