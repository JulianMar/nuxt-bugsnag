import { join } from 'path'
import consola from 'consola'
import bugsnag from '@bugsnag/js'
import bugsnagExpress from '@bugsnag/plugin-express'

module.exports = function (options) {
  const logger = consola.withScope('Bugsnag')
  logger.info('Configuring')

  const bugsnagOptions = { ...this.options.bugsnag, ...options }

  if (bugsnagOptions.apiKey) {
    bugsnagOptions.browserApiKey = bugsnagOptions.apiKey
    bugsnagOptions.serverApiKey = bugsnagOptions.apiKey
  }

  logger.info('Adding browser plugin')
  this.addPlugin({
    src: join(__dirname, 'plugin.js'),
    options: { apiKey: bugsnagOptions.browserApiKey },
    ssr: false
  })

  const bugsnagClient = bugsnag({ apiKey: bugsnagOptions.serverApiKey, logger })
  bugsnagClient.use(bugsnagExpress)

  logger.info('Adding server handlers')
  this.nuxt.hook('render:setupMiddleware', app => app.use(bugsnagClient.getPlugin('express').requestHandler))
  this.nuxt.hook('render:errorMiddleware', app => app.use(bugsnagClient.getPlugin('express').errorHandler))
  this.nuxt.hook('generate:routeFailed', ({ route, errors }) => {
    errors.forEach(({ error }) => bugsnagClient.notify(error, { metaData: { route } }))
  })
}

module.exports.meta = require('../package.json')
