let _env: {
  env: string
  isDev: boolean
  isProd: boolean
  logLevel: string
  session: {
    cookieName: string
    timeoutDays: number
    refreshDays: number
  }
  database: {
    host: string
    port: number
    user: string
    password: string
    database: string
    migrationsFolder: string
  }
} | null = null

const config = () => {
  if (_env) return _env
  const env = process.env.NODE_ENV || 'development'
  const isDev = env !== 'production'
  const isProd = env === 'production'
  const logLevel = process.env.LOG_LEVEL || 'debug'

  const session = {
    cookieName: process.env.SESSION_COOKIE_NAME || 'session',
    timeoutDays: parseInt(process.env.SESSION_TIMEOUT_DAYS || '30') * 24 * 60 * 60 * 1000,
    refreshDays: parseInt(process.env.SESSION_REFRESH_DAYS || '7') * 24 * 60 * 60 * 1000,
  }

  const database = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '10432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test123',
    database: process.env.DB || 'app',
    migrationsFolder: process.env.DB_MIGRATIONS_FOLDER || 'server/database/migrations',
  }
  _env = { env, isDev, isProd, logLevel, session, database }
  return _env
}
export default { config }
