import * as path from 'path'
import deepMerge from 'deepmerge'
import consola from 'consola'
import { BugsnagSourceMapUploaderPlugin, BugsnagBuildReporterPlugin } from 'webpack-bugsnag-plugins'

module.exports = function (moduleOptions) {
  const logger = consola.withScope('Bugsnag')
  const buildDirRelative = path.relative(this.options.rootDir, this.options.buildDir)
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
    webpackConfig: {
      include: []
    },
    reporterOptions: {}
  }

  const topLevelOptions = this.options.bugsnag || {}
  const options = deepMerge.all([defaults, topLevelOptions, moduleOptions])

  options.clientConfig = options.config

  if (options.apiKey) {
    options.clientConfig.apiKey = options.apiKey
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
      src: path.join(__dirname, 'plugin.js'),
      options: options.clientConfig
    })
  }

  // Enable publishing of sourcemaps
  this.extendBuild((config, { isClient, isModern, isDev }) => {
    if (!options.publishRelease || isDev) {
      return
    }

    if (isClient) {
      config.devtool = '#source-map'
    }

    config.plugins.push(new BugsnagSourceMapUploaderPlugin({
      apiKey: options.clientConfig.apiKey,
      appVersion: options.clientConfig.appVersion,
      overwrite: true,
      publicPath: options.clientConfig.publicPath || '*'
    }))

    logger.info('Enabling uploading of release sourcemaps to Bugsnag')
  })

  this.extendBuild((config, { isDev }) => {
    if (!options.publishRelease || isDev) {
      return
    }

    config.plugins.push(new BugsnagBuildReporterPlugin({
      apiKey: options.config.apiKey,
      appVersion: options.reporterOptions.appVersion || options.config.appVersion,
      ...options.reporterOptions
    }))
  })
}

module.exports.meta = require('../package.json')
