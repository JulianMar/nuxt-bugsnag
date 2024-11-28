import path from 'node:path'

export default defineNuxtConfig({
  modules: ['../src/module'],

  bugsnag: {
    disabled: process.env.DISABLE_BUGSNAG === 'true' || false,
    publishRelease: true,
    disableLog: false,
    config: {
      notifyReleaseStages: ['staging', 'production', 'dev'],
      apiKey: '317c3d7013a3dc4a9e152138bfe8c900',
      environment: process.env.NODE_ENV
    },
    performance: true,
    projectRoot: path.join(__dirname, '..')
  },

  devtools: {enabled: true},
  compatibilityDate: '2024-10-03',
})
