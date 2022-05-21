import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { browser, node } from '@bugsnag/source-maps'

export interface ModuleOptions {
  disabled: boolean,
  publishRelease: boolean,
  config: {
    apiKey: string,
    notifyReleaseStages: string[]
    environment: string,
    appVersion: string
  },
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-bugsnag',
    configKey: 'bugsnag'
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
  setup (options, nuxt) {
    if (options.disabled) {
      return
    }

    const { resolve } = createResolver(import.meta.url)

    addPlugin(resolve('./runtime/plugin'))

    if (!options.publishRelease) {
      return
    }

    nuxt.options.runtimeConfig.public.bugsnag = options.config
    nuxt.options.vite.build.sourcemap = 'hidden'

    nuxt.options.nitro.hooks = {
      compiled: async (nitro) => {
        if (nitro.options.dev) {
          return
        }

        nitro.logger.start('\n upload of sourcemaps to bugsnag \n')
        await node.uploadMultiple({
          apiKey: options.config.apiKey,
          appVersion: options.config.appVersion,
          directory: nitro.options.output.serverDir,
          logger: nitro.logger,
          overwrite: true,
          projectRoot: '/'
        })

        await browser.uploadMultiple({
          apiKey: options.config.apiKey,
          appVersion: options.config.appVersion,
          directory: nitro.options.output.publicDir,
          logger: nitro.logger,
          overwrite: true,
          baseUrl: 'http://localhost:3000'
        })

        nitro.logger.success('\n upload of sourcemaps to bugsnag \n')
      }
    }
  }
})
