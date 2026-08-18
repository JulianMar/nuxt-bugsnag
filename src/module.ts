import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  extendViteConfig,
  addImports,
  addServerPlugin,
  addVitePlugin,
} from '@nuxt/kit'
import type { BrowserConfig } from '@bugsnag/js'
import { BugsnagSourceMapUploaderPlugin } from '@bugsnag/vite-plugin-bugsnag'
import defu from 'defu'
import type { BrowserConfiguration } from '@bugsnag/browser-performance'

export interface ModuleOptions {
  disabled: boolean
  publishRelease: boolean
  disableLog: boolean
  baseUrl: string
  projectRoot: string
  performance: boolean
  deferStart: boolean
  config: {
    apiKey: string
    notifyReleaseStages?: string[]
    environment?: string
    appVersion?: string
    performanceConfig?: Partial<BrowserConfiguration>
  } & Partial<BrowserConfig>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-bugsnag',
    configKey: 'bugsnag',
    compatibility: {
      nuxt: '>=4.0.0',
    },
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
      appVersion: '1.0.0',
      performanceConfig: {},
    },
    performance: false,
    deferStart: false,
    projectRoot: '/',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    if (options.disabled) {
      console.log('[bugsnag] module disabled. Startup interrupted')
      return
    }

    nuxt.options.runtimeConfig.public.bugsnag = defu(
      nuxt.options.runtimeConfig.public.bugsnag,
      {
        ...options.config,
        deferStart: options.deferStart,
      },
    )

    if (options.performance) {
      nuxt.options.runtimeConfig.public.bugsnag.performanceConfig = defu(
        {
          apiKey: options.config.apiKey,
          releaseStage: options.config.environment,
        },
        nuxt.options.runtimeConfig.public.bugsnag.performanceConfig,
        options.config.performanceConfig,
      )
    }

    // client
    addPlugin(resolve('./runtime/client/plugin'))

    addImports({
      name: 'useBugsnag',
      as: 'useBugsnag',
      from: resolve('./runtime/client/composables/useBugsnag'),
    })

    addImports({
      name: 'initBugsnag',
      as: 'initBugsnag',
      from: resolve('./runtime/client/composables/initBugsnag'),
    })

    addImports({
      name: 'useBugsnagPerformance',
      as: 'useBugsnagPerformance',
      from: resolve('./runtime/client/composables/useBugsnag'),
    })

    // performance
    if (options.performance) {
      addPlugin(resolve('./runtime/client/performance.client'))
    }

    // server
    addServerPlugin(resolve('./runtime/server/plugins/bugsnag'))

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push(
        ...[
          'nuxt-bugsnag > @bugsnag/plugin-vue',
          'nuxt-bugsnag > @bugsnag/js',
          'nuxt-bugsnag > @bugsnag/browser-performance',
          'nuxt-bugsnag > @bugsnag/vue-router-performance',
        ],
      )
    })

    nuxt.addHooks({
      'nitro:config': (config) => {
        if (config.imports === undefined) {
          config.imports = {
            imports: [],
          }
        }

        // @ts-expect-error expect error here because it can be undefined
        config.imports.imports.push({
          name: 'useBugsnag',
          as: 'useBugsnag',
          from: resolve('./runtime/server/composables/useBugsnag'),
        })
      },
    })

    if (!options.publishRelease || nuxt.options.dev) {
      return
    }

    nuxt.options.sourcemap = { server: 'hidden', client: 'hidden' }

    const logger = options.disableLog ? { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} } : undefined

    addVitePlugin(BugsnagSourceMapUploaderPlugin({
      apiKey: options.config.apiKey,
      appVersion: options.config.appVersion,
      overwrite: true,
      logger,
    }), { client: true })

    addVitePlugin(BugsnagSourceMapUploaderPlugin({
      apiKey: options.config.apiKey,
      appVersion: options.config.appVersion,
      overwrite: true,
      logger,
      projectRoot: options.projectRoot,
    }), { server: true })
  },
})
