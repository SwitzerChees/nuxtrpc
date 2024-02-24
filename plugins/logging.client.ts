import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('app:error', (e) => {
    // eslint-disable-next-line no-console
    console.error('app:error', e)
  })
  nuxtApp.hooks.hook('trpc:error' as any, (e: { message: string }) => {
    // eslint-disable-next-line no-console
    console.error('trpc:error', e.message)
  })
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // eslint-disable-next-line no-console
    console.error('errorHandler', error, instance, info)
  }
})
