import type { Config } from 'drizzle-kit'

export default {
  schema: 'server/database/schema.ts',
  out: 'server/database/migrations',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '10432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test123',
    database: process.env.DB || 'app',
  },
} as Config
