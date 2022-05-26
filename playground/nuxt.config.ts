import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  bugsnag: {
    publishRelease: true,
    config: {
      notifyReleaseStages: ['staging', 'production'],
      apiKey: '317c3d7013a3dc4a9e152138bfe8c900'
    }
  }
})
