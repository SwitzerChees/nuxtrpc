module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-useless-return': 0,
    'vue/multi-word-component-names': 0, // allow PrimeVue components such as Button
    'vue/no-reserved-component-names': 0, // allow PrimeVue components such as Button
    'no-console': 2,
    quotes: [2, 'single', { avoidEscape: true }],
    semi: [2, 'never'],
    'vue/no-multiple-template-root': 0,
  },
}
