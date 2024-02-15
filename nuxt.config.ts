// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['trpc-nuxt'],
  },
  modules: ['nuxt-primevue'],
  css: ['~/assets/css/main.css', 'primevue/resources/themes/aura-dark-green/theme.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
