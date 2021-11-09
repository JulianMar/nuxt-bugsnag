import * as path from 'path'
import consola from 'consola'
import { BugsnagSourceMapUploaderPlugin, BugsnagBuildReporterPlugin } from 'webpack-bugsnag-plugins'
import { defineNuxtModule, addPlugin, extendWebpackConfig, addTemplate } from '@nuxt/kit'

export default defineNuxtModule({
  configKey: 'bugsnag',
  defaults: {
    disabled: false,
    disableClientSide: false,
    disableServerSide: false,
    publishRelease: false,
    disableServerRelease: false,
    disableClientRelease: false,
    config: {
      notifyReleaseStages: [],
      apiKey: '',
      environment: 'production',
      appVersion: '1.0.0'
    },
    webpackConfig: {
      include: []
    },
    reporterOptions: {}
  },
  setup (options, nuxt) {
    const logger = consola.withScope('Bugsnag')
    const buildDirRelative = path.relative(nuxt.options.rootDir, nuxt.options.buildDir)
    logger.info('Configuring')

    options.config.environment = nuxt.options.dev ? 'development' : 'production'

    if (options.disabled) {
      logger.info('Errors will not be logged because the disable option has been set')
      return
    }

    if (!options.disableServerRelease) {
      options.webpackConfig.include.push(`${buildDirRelative}/dist/server`)
    }
    if (!options.disableClientRelease) {
      options.webpackConfig.include.push(`${buildDirRelative}/dist/client`)
    }

    if (!options.disableClientSide) {
      logger.info('Adding client plugin')
      addTemplate({
        filename: 'bugsnag.options.mjs',
        getContents: ({ utils }) => {
          const name = utils.importName('bugsnag_options_obj')
          return `
            const ${name} = () => Promise.resolve(${JSON.stringify(options.config)})\n
            export default ${name}
          `
        }
      })

      addPlugin({
        src: path.join(__dirname, 'plugin.js')
      })
    }

    // Enable publishing of sourcemaps
    extendWebpackConfig((config) => {
      if (!options.publishRelease || nuxt.options.isDev) {
        return
      }

      if (nuxt.options.isClient) {
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

    extendWebpackConfig((config) => {
      if (!options.publishRelease || nuxt.options.isDev) {
        return
      }

      config.plugins.push(new BugsnagBuildReporterPlugin({
        apiKey: options.config.apiKey,
        appVersion: options.reporterOptions.appVersion || options.config.appVersion,
        ...options.reporterOptions
      }))
    })
  }
})
