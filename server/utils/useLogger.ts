import pino from 'pino'

let _logger: pino.Logger

const useLogger = () => {
  if (!_logger) {
    const { logLevel } = useEnv()
    _logger = pino({ level: logLevel })
  }
  return _logger
}
export default useLogger
