import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg'; // cjs shenanigans (-_-)
import * as schema from './schema.js';

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
export { schema };
