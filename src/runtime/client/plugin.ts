import type { BrowserConfig } from '@bugsnag/js'
import type { RuntimeConfig } from '@nuxt/schema'
import enhanceOptions from '../utils/enhanceOptions'
import { startBugsnag } from './services/bugsnag'
import {
  deferStart,
  storedBugsnagOptions,
  storedPerformanceOptions,
} from './state'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = enhanceOptions<BrowserConfig>(config.public.bugsnag)
  const isDeferStart = config.public.bugsnag.deferStart ?? false

  // Store options and state for potential deferred initialization
  storedBugsnagOptions.value = options
  deferStart.value = isDeferStart

  // Store performance options if configured
  if (config.public.bugsnag.performanceConfig.apiKey) {
    storedPerformanceOptions.value = config.public.bugsnag.performanceConfig
  }

  // If deferStart is enabled, wait for user to call initBugsnag()
  if (deferStart.value && import.meta.client) {
    return
  }

  // Immediate initialization (default behavior)
  startBugsnag(options, nuxtApp)
})
