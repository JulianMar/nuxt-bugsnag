const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../') }
  ],

  bugsnag: {
    config: {
      notifyReleaseStages: ['staging', 'production']
    },
    clientConfig: {
      apiKey: 'YOUR_BROWSER_API_KEY'
    },
    serverConfig: {
      apiKey: 'YOUR_SERVER_API_KEY'
    }
  }
}
