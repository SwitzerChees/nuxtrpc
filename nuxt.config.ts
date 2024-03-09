// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
    asyncContext: true,
    viewTransition: true,
  },
  imports: {
    presets: [
      {
        from: '~/types',
        imports: [
          {
            name: 'APIRoutes',
            as: 'APIRoutes',
          },
        ],
      },
    ],
  },
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
  nitro: {
    imports: {
      presets: [
        {
          from: 'h3',
          type: true,
          imports: [
            {
              name: 'H3Event',
              as: 'H3Event',
            },
          ],
        },
        {
          from: 'zod',
          imports: [
            {
              name: 'z',
              as: 'z',
            },
          ],
        },
        {
          from: 'zod',
          type: true,
          imports: [
            {
              name: 'infer',
              as: 'zinfer',
            },
          ],
        },
      ],
    },
  },
})
