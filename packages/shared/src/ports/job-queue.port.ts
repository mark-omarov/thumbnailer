import type { Job, Queue } from 'bullmq';

type Callback = (job: Job) => Promise<void>;

export type JobQueuePort = {
  createQueueWorker: (cb: Callback) => void;
  createQueue: () => Queue;
};
