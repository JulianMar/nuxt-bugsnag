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
      notifyReleaseStages: ['staging', 'production'],
      apiKey: 'YOUR_BROWSER_API_KEY'
    }
  }
}
