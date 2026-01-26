import type { Router } from 'vue-router'
import BugsnagPerformance from '@bugsnag/browser-performance'
import { VueRouterRoutingProvider } from '@bugsnag/vue-router-performance'
import { performanceClient } from '../state'

export function startPerformance(options: any, router: Router): typeof BugsnagPerformance {
  const performanceOptions = {
    ...options,
    routingProvider: new VueRouterRoutingProvider(router),
  }

  try {
    BugsnagPerformance.start(performanceOptions)
    performanceClient.value = BugsnagPerformance
  } catch (error) {
    console.warn('[Bugsnag] Failed to start Performance monitoring:', error)
  }

  return BugsnagPerformance
}
