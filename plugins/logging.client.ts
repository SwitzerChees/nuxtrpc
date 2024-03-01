import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('app:error', (e) => {
    // eslint-disable-next-line no-console
    console.error('app:error', e)
  })
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // eslint-disable-next-line no-console
    console.error('errorHandler', error, instance, info)
  }
})
