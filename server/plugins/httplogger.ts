import { generateRandomString, alphabet } from 'oslo/crypto'

export default defineNitroPlugin((nitroApp) => {
  const httpLogger = logging.logger().child({ component: 'nitro' })
  nitroApp.hooks.hook('request', (event: H3Event) => {
    const pathWithoutQuery = event.path.split('?')[0]
    event.context.request = {
      method: event.method,
      path: pathWithoutQuery,
      start: Date.now(),
      requestId: generateRandomString(16, alphabet('A-Z', '0-9')),
    }
    const logger = httpLogger.child(event.context.request)
    event.context.logger = logger
    logger.info(`Request: ${event.method} ${pathWithoutQuery}`)
  })
  nitroApp.hooks.hook('afterResponse', (event: H3Event) => {
    const status = getResponseStatus(event)
    const {
      logger,
      request: { method, path, start },
    } = event.context
    const duration = Date.now() - start
    logger.child({ status, duration }).info(`Response ${status}: ${method} ${path} - ${duration}ms`)
  })
})
