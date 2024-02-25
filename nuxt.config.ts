// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['trpc-nuxt'],
  },
  modules: ['@nuxtjs/i18n', 'nuxt-primevue', '@nuxtjs/device'],
  css: ['~/assets/css/theme.css', 'primevue/resources/themes/aura-dark-green/theme.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
  },
})
