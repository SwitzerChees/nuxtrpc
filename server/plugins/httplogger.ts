import { H3Event } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  const httpLogger = useLogger().child({ component: 'nitro' })
  nitroApp.hooks.hook('request', (event: H3Event) => {
    const pathWithoutQuery = event.path.split('?')[0]
    event.context.request = {
      method: event.method,
      path: pathWithoutQuery,
      start: Date.now(),
    }
    httpLogger.info(`Request: ${event.method} ${pathWithoutQuery}`)
  })
  nitroApp.hooks.hook('afterResponse', (event: H3Event) => {
    const status = getResponseStatus(event)
    const { method, path, start } = event.context.request
    const duration = Date.now() - start
    httpLogger.child({ status }).info(`Response ${status}: ${method} ${path} - ${duration}ms`)
  })
})
