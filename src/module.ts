import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  extendViteConfig,
  addImports,
  addServerPlugin
} from '@nuxt/kit'
import { browser, node } from 'bugsnag-source-maps-fork'
import { BrowserConfig } from '@bugsnag/js'
import defu from 'defu'
export interface ModuleOptions {
  disabled: boolean
  publishRelease: boolean
  disableLog: boolean
  baseUrl: string
  projectRoot: string
  config:
    | {
        apiKey: string
        notifyReleaseStages?: string[]
        environment?: string
        appVersion?: string
      }
    | Partial<BrowserConfig>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-bugsnag',
    configKey: 'bugsnag',
    compatibility: {
      nuxt: ' ^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    disabled: false,
    publishRelease: false,
    disableLog: false,
    baseUrl: 'http://localhost:3000',
    config: {
      notifyReleaseStages: [],
      apiKey: '',
      environment: 'production',
      appVersion: '1.0.0'
    },
    projectRoot: '/'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    if (options.disabled) {
      return
    }

    nuxt.options.runtimeConfig.public.bugsnag = defu(nuxt.options.runtimeConfig.public.bugsnag, options.config) as any

    // client
    addPlugin(resolve('./runtime/client/plugin'))

    addImports({
      name: 'useBugsnag',
      as: 'useBugsnag',
      from: resolve('./runtime/client/composables/useBugsnag')
    })

    // server
    addServerPlugin(resolve('./runtime/server/plugins/bugsnag'))

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push(
        ...['@bugsnag/plugin-vue', '@bugsnag/js']
      )
    })

    nuxt.addHooks({
      'nitro:config': (config) => {
        if (config.imports === undefined) {
          config.imports = {
            imports: []
          }
        }

        config.imports.imports.push({
          name: 'useBugsnag',
          as: 'useBugsnag',
          from: resolve('./runtime/server/composables/useBugsnag')
        })
      }
    })

    if (!options.publishRelease || nuxt.options.dev) {
      return
    }

    nuxt.options.sourcemap = { server: true, client: true }

    nuxt.addHooks({
      'nitro:init': (nitro) => {
        nitro.hooks.addHooks({
          compiled: async (nitro) => {
            const logger = nitro.logger.create({})

            if (options.disableLog) {
              logger.setReporters([
                {
                  log: () => {}
                }
              ])
            }

            logger.log('')
            logger.start('upload of sourcemaps to bugsnag \n')
            const promises: Promise<void>[] = []

            promises.push(
              node.uploadMultiple({
                apiKey: options.config.apiKey!,
                appVersion: options.config.appVersion,
                directory: nitro.options.output.serverDir,
                logger,
                overwrite: true,
                projectRoot: options.projectRoot
              })
            )

            promises.push(
              node.uploadMultiple({
                apiKey: options.config.apiKey!,
                appVersion: options.config.appVersion,
                directory: nuxt.options.buildDir,
                logger,
                overwrite: true,
                projectRoot: options.projectRoot
              })
            )

            promises.push(
              browser.uploadMultiple({
                apiKey: options.config.apiKey!,
                appVersion: options.config.appVersion,
                directory: nitro.options.output.publicDir,
                logger,
                overwrite: true,
                baseUrl: options.baseUrl
              })
            )

            await Promise.all(promises)

            logger.log('')
            logger.success('upload of sourcemaps to bugsnag \n')
          }
        })
      }
    })
  }
})
