import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg'; // cjs shenanigans (-_-)
import * as schema from './drizzle.js';

const { Pool } = pg;

export const createDrizzleConnection = (config: pg.PoolConfig) => {
  const pool = new Pool(config);
  return drizzle(pool, { schema });
};

export type DrizzleDatabase = ReturnType<typeof createDrizzleConnection>;
