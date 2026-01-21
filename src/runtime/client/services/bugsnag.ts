import type { Client, BrowserConfig } from '@bugsnag/js'
import type { App } from 'vue'
import Bugsnag from '@bugsnag/js'
import { bugsnagClient, isInitialized } from '../state'
import mockBugsnag from '../../utils/mockBugsnag'

interface NuxtAppLike {
  vueApp: App
}

export function startBugsnag(options: BrowserConfig, nuxtApp: NuxtAppLike): Client {
  // Already started
  if (Bugsnag.isStarted()) {
    return bugsnagClient.value
  }

  try {
    const client = Bugsnag.start(options)
    bugsnagClient.value = client
    isInitialized.value = true

    // Register Vue plugin for error handling
    const plugin = Bugsnag.getPlugin('vue')
    if (plugin) {
      nuxtApp.vueApp.use(plugin)
    }

    return client
  } catch (error) {
    console.warn('[Bugsnag] Failed to start:', error)
    return mockBugsnag
  }
}
