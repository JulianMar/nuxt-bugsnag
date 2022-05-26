import { defineNuxtModule, addPlugin, createResolver, addAutoImport, addTemplate, addComponent } from '@nuxt/kit'
import { browser, node } from '@bugsnag/source-maps'
import { BrowserConfig } from '@bugsnag/js'

const { resolve } = createResolver(import.meta.url)
export interface ModuleOptions {
  disabled: boolean,
  publishRelease: boolean,
  config: Partial<{
    apiKey: string,
    notifyReleaseStages?: string[]
    environment?: string,
    appVersion?: string
  }| BrowserConfig>,
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
  hooks: {
    'autoImports:extend': (imports) => {
      imports.push({ name: 'useBugsnag', as: 'useBugsnag', from: resolve('./runtime/composables/useBugsnag') })
    }
  },
  setup (options, nuxt) {
    if (options.disabled) {
      return
    }

    nuxt.options.runtimeConfig.public.bugsnag = options.config

    addPlugin(resolve('./runtime/plugin'))

    if (!options.publishRelease) {
      return
    }

    nuxt.options.vite.build.sourcemap = 'hidden'

    nuxt.options.nitro.hooks = {
      compiled: async (nitro) => {
        if (nitro.options.dev) {
          return
        }

        nitro.logger.log('')
        nitro.logger.start('upload of sourcemaps to bugsnag \n')

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

        nitro.logger.log('')
        nitro.logger.success('upload of sourcemaps to bugsnag \n')
      }
    }
  }
})
