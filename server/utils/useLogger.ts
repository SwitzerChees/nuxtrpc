import pino from 'pino'

let _logger: pino.Logger

const useLogger = () => {
  if (!_logger) {
    const { logLevel } = env.config()

    _logger = pino({
      level: logLevel,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    })
  }
  return _logger
}
export default useLogger
