// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
    asyncContext: true,
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  // imports: {
  //   presets: [
  //     {
  //       from: 'h3',
  //       imports: [
  //         {
  //           name: 'H3Event',
  //           type: true,
  //           as: 'H3Event',
  //         },
  //       ],
  //     },
  //   ],
  // },
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
    locales: ['de'],
    defaultLocale: 'de',
    strategy: 'no_prefix',
    compilation: {
      jit: true,
    },
  },
})
