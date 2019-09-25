import { join, relative } from 'path'
import deepMerge from 'deepmerge'
import consola from 'consola'
import bugsnag from '@bugsnag/js'
import bugsnagExpress from '@bugsnag/plugin-express'
import { BugsnagSourceMapUploaderPlugin, BugsnagBuildReporterPlugin } from 'webpack-bugsnag-plugins'

module.exports = function (moduleOptions) {
  const logger = consola.withScope('Bugsnag')
  const buildDirRelative = relative(this.options.rootDir, this.options.buildDir)
  logger.info('Configuring')

  const defaults = {
    disabled: false,
    disableClientSide: false,
    disableServerSide: false,
    publishRelease: false,
    disableServerRelease: false,
    disableClientRelease: false,
    config: {
      environment: this.options.dev ? 'development' : 'production',
      appVersion: '1.0.0'
    },
    serverConfig: {},
    clientConfig: {},
    webpackConfig: {
      include: []
    }
  }

  const topLevelOptions = this.options.bugsnag || {}
  const options = deepMerge.all([moduleOptions, topLevelOptions, defaults])

  options.serverConfig = deepMerge.all([options.config, options.serverConfig])
  options.clientConfig = deepMerge.all([options.config, options.clientConfig])

  if (options.apiKey) {
    options.clientConfig.apiKey = options.apiKey
    options.serverConfig.apiKey = options.apiKey
    options.config.apiKey = options.apiKey
  }

  if (!options.disableServerRelease) {
    options.webpackConfig.include.push(`${buildDirRelative}/dist/server`)
  }
  if (!options.disableClientRelease) {
    options.webpackConfig.include.push(`${buildDirRelative}/dist/client`)
  }

  if (options.disabled) {
    logger.info('Errors will not be logged because the disable option has been set')
    return
  }

  if (!options.disableClientSide) {
    logger.info('Adding client plugin')
    this.addPlugin({
      src: join(__dirname, 'plugin.js'),
      options: options.clientConfig,
      mode: 'client'
    })
  }

  if (!options.disableServerSide) {
    options.serverConfig.logger = logger
    const bugsnagClient = bugsnag(options.serverConfig)
    bugsnagClient.use(bugsnagExpress)

    process.bugsnag = bugsnagClient
    this.addPlugin({
      src: join(__dirname, 'plugin.server.js'),
      mode: 'server'
    })

    logger.info('Adding server handlers')
    this.nuxt.hook('render:setupMiddleware', app => app.use(bugsnagClient.getPlugin('express').requestHandler))
    this.nuxt.hook('render:errorMiddleware', app => app.use(bugsnagClient.getPlugin('express').errorHandler))
    this.nuxt.hook('generate:routeFailed', ({ route, errors }) => {
      errors.forEach(({ error }) => bugsnagClient.notify(error, { metaData: { route } }))
    })
  }

  // Enable publishing of sourcemaps
  this.extendBuild((config, { isClient, isModern, isDev }) => {
    if (!options.publishRelease) {
      return
    }

    if (isClient) {
      config.devtool = '#source-map'
    }

    config.plugins.push(new BugsnagSourceMapUploaderPlugin({
      apiKey: options.clientConfig.apiKey,
      appVersion: options.config.appVersion,
      overwrite: true
    }))

    logger.info('Enabling uploading of release sourcemaps to Bugsnag')
  })

  this.extendBuild((config, app) => {
    config.plugins.push(new BugsnagBuildReporterPlugin({
      apiKey: options.serverConfig.apiKey,
      appVersion: options.config.appVersion
    }))
  })
}

module.exports.meta = require('../package.json')
