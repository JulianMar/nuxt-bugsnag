import type { Client } from '@bugsnag/js'
import type BugsnagPerformance from '@bugsnag/browser-performance'
import { bugsnagClient, performanceClient } from '../state'

export const useBugsnag = (): Client => {
  return bugsnagClient.value
}

export const useBugsnagPerformance = (): typeof BugsnagPerformance | null => {
  if (!import.meta.client) {
    console.warn('[Bugsnag] Performance should only be called on the client side')
    return null
  }
  return performanceClient.value
}
