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
    browserApiKey: 'YOUR_BROWSER_API_KEY',
    serverApiKey: 'YOUR_SERVER_API_KEY',
    options: {
      notifyReleaseStages: ['staging', 'production']
    }
  }
}
