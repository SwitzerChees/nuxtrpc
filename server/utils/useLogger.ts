import pino from 'pino'

const useLogger = () => {
  const { logLevel } = useEnv()
  const logger = pino({ level: logLevel })
  return logger
}
export default useLogger
