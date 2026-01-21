export default defineNuxtConfig({
  modules: ['../../../src/module'],
  bugsnag: {
    deferStart: true,
    config: {
      apiKey: 'test-api-key-deferstart',
    },
  },
})
