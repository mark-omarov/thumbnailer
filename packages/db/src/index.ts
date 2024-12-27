import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg'; // cjs shenanigans (-_-)
import * as schema from './schema.js';
import { env } from './env.js';

const { Pool } = pg;

const pool = new Pool({ connectionString: env.DATABASE_URL });

export * from 'drizzle-orm';

export { schema };

export const db = drizzle(pool, { schema });
