import { defineNuxtModule, addPlugin, createResolver, isNuxt3, extendWebpackConfig, extendViteConfig } from '@nuxt/kit'
import { browser, node } from '@bugsnag/source-maps'
import { BrowserConfig } from '@bugsnag/js'
import { join } from 'node:path'

const { resolve } = createResolver(import.meta.url)
export interface ModuleOptions {
  disabled: boolean,
  publishRelease: boolean,
  config: {
    apiKey: string,
    notifyReleaseStages?: string[]
    environment?: string,
    appVersion?: string
  } | Partial<BrowserConfig>,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-bugsnag',
    configKey: 'bugsnag',
    compatibility: {
      nuxt: '^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    disabled: false,
    publishRelease: false,
    config: {
      notifyReleaseStages: [],
      apiKey: '',
      environment: 'production',
      appVersion: '1.0.0'
    }
  },
  hooks: {
    'autoImports:extend': (imports) => {
      imports.push({ name: 'useBugsnag', as: 'useBugsnag', from: resolve('./runtime/composables/useBugsnag') })
    }
  },
  setup (options, nuxt) {
    if (options.disabled) {
      return
    }

    if (isNuxt3()) {
      nuxt.options.runtimeConfig.public.bugsnag = options.config as any
    } else {
      nuxt.options.publicRuntimeConfig.bugsnag = options.config as any
    }

    addPlugin(resolve('./runtime/plugin'))

    if (!options.publishRelease || nuxt.options.dev) {
      return
    }

    extendWebpackConfig((config) => {
      config.devtool = '#source-map'
    })

    extendViteConfig((config) => {
      config.build.sourcemap = 'hidden'
    })

    nuxt.addHooks({
      'nitro:config': (config) => {
        config.hooks = {
          compiled: async (nitro) => {
            nitro.logger.log('')
            nitro.logger.start('upload of sourcemaps to bugsnag \n')
            const promises = []

            promises.push(node.uploadMultiple({
              apiKey: options.config.apiKey,
              appVersion: options.config.appVersion,
              directory: nitro.options.output.serverDir,
              logger: nitro.logger,
              overwrite: true,
              projectRoot: '/'
            }))

            promises.push(browser.uploadMultiple({
              apiKey: options.config.apiKey,
              appVersion: options.config.appVersion,
              directory: nitro.options.output.publicDir,
              logger: nitro.logger,
              overwrite: true,
              baseUrl: 'http://localhost:3000'
            }))

            await Promise.all(promises)

            nitro.logger.log('')
            nitro.logger.success('upload of sourcemaps to bugsnag \n')
          }
        }
      },
      'build:done': async (config) => {
        if (isNuxt3) {
          return
        }
        config.nuxt._logger.log('')
        config.nuxt._logger.start('upload of sourcemaps to bugsnag \n')

        const promises = []

        promises.push(node.uploadMultiple({
          apiKey: options.config.apiKey,
          appVersion: options.config.appVersion,
          directory: join(config.options.buildDir, 'dist', 'server'),
          logger: config.nuxt._logger,
          overwrite: true,
          projectRoot: '/'
        }))

        promises.push(browser.uploadMultiple({
          apiKey: options.config.apiKey,
          appVersion: options.config.appVersion,
          directory: join(config.options.buildDir, 'dist', 'client'),
          logger: config.nuxt._logger,
          overwrite: true,
          baseUrl: 'http://localhost:3000/_nuxt'
        }))

        await Promise.all(promises)

        config.nuxt._logger.log('')
        config.nuxt._logger.success('upload of sourcemaps to bugsnag \n')
      }
    })
  }
})
