import type { Client } from '@bugsnag/js'
import { startBugsnag } from '../services/bugsnag'
import { startPerformance } from '../services/performance'
import {
  bugsnagClient,
  isInitialized,
  deferStart,
  storedBugsnagOptions,
  storedPerformanceOptions,
} from '../state'
import { useNuxtApp, useRouter } from '#imports'

export const initBugsnag = (): Client => {
  // Already initialized
  if (isInitialized.value) {
    return bugsnagClient.value
  }

  // Not in deferStart mode - was already initialized by plugin
  if (!deferStart.value) {
    console.warn('[Bugsnag] initBugsnag() called but deferStart is false - already initialized')
    return bugsnagClient.value
  }

  // No stored options - configuration error
  if (!storedBugsnagOptions.value) {
    console.error('[Bugsnag] No configuration found. Ensure bugsnag module is configured.')
    return bugsnagClient.value
  }

  const nuxtApp = useNuxtApp()
  const client = startBugsnag(storedBugsnagOptions.value, nuxtApp)

  // Also start performance if configured
  if (storedPerformanceOptions.value) {
    const router = useRouter()
    startPerformance(storedPerformanceOptions.value, router)
  }

  return client
}
