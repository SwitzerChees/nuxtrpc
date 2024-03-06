const useEnv = () => {
  const env = process.env.NODE_ENV
  const isDev = env === 'development'
  const isProd = env === 'production'
  const logLevel = process.env.LOG_LEVEL || 'debug'
  return { env, isDev, isProd, logLevel }
}
export default useEnv
