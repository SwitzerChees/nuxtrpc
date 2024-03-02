// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
    asyncContext: true,
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
  modules: ['@nuxtjs/i18n', 'nuxt-primevue', '@nuxtjs/device', 'nuxt-icon'],
  css: ['~/assets/css/theme.css', 'primevue/resources/themes/aura-dark-green/theme.css', '~/assets/css/style.css'],
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
