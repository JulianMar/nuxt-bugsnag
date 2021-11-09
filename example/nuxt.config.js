import { resolve } from 'path'
import { defineNuxtConfig } from '@nuxt/bridge'
import module from '../lib/module.js'

export default defineNuxtConfig({
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  buildModules: [
    { handler: module }
  ],

  bugsnag: {
    config: {
      notifyReleaseStages: ['staging', 'production'],
      apiKey: 'YOUR_BROWSER_API_KEY'
    }
  },
  build: {
    babel: {
      presets ({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  }
})
