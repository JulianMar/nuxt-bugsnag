import path from 'node:path'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [MyModule],
  bugsnag: {
    disabled: process.env.DISABLE_BUGSNAG === 'true' || false,
    publishRelease: true,
    disableLog: true,
    config: {
      notifyReleaseStages: ['staging', 'production', 'dev'],
      apiKey: '7a923d8f26b1a5d5e74234fe982340fb',
      environment: process.env.NODE_ENV
    },
    projectRoot: path.join(__dirname, '..')
  }
})
