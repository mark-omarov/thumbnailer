import { env } from './env.js';
import { createApp } from './interfaces/http/express.js';

async function main() {
  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`API listening on port ${env.PORT}`);
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

main().catch((err) => console.error(err));
