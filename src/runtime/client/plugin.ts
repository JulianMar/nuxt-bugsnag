import type { Client, BrowserConfig } from '@bugsnag/js'
import Bugsnag from '@bugsnag/js'
import type { RuntimeConfig } from '@nuxt/schema'
import enhanceOptions from '../utils/enhanceOptions'
import mockBugsnag from '../utils/mockBugsnag'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = enhanceOptions<BrowserConfig>(config.public.bugsnag)

  // we check the internal client to prevent the [bugsnag] Bugsnag.start() was called more than once. Ignoring. error
  let client: Client = Bugsnag
  if (!Bugsnag.isStarted()) {
    try {
      client = Bugsnag.start(options)
    }
    catch (_error) {
      console.log('[Bugsnag] started in mock mode')
      return {
        provide: {
          bugsnag: mockBugsnag,
        },
      }
    }
  }

  nuxtApp.vueApp.provide('bugsnag-client', client)

  const plugin = Bugsnag.getPlugin('vue')

  if (plugin !== undefined) {
    nuxtApp.vueApp.use(plugin)
  }

  return {
    provide: {
      bugsnag: client,
    },
  }
})
