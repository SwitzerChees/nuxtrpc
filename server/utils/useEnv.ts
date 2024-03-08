const useEnv = () => {
  const env = process.env.NODE_ENV
  const isDev = env === 'development'
  const isProd = env === 'production'
  const logLevel = process.env.LOG_LEVEL || 'debug'
  const sessionTimeoutDays = parseInt(process.env.SESSION_TIMEOUT_DAYS || '30') * 24 * 60 * 60 * 1000

  const database = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '10432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test123',
    database: process.env.DB || 'app',
    migrationsFolder: process.env.DB_MIGRATIONS_FOLDER || 'server/database/migrations',
  }
  return { env, isDev, isProd, logLevel, sessionTimeoutDays, database }
}
export default useEnv
