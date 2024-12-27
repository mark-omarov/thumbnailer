import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './node_modules/@thumbnailer/db/dist/schema.js',
  out: './drizzle',
  schemaFilter: 'application',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
