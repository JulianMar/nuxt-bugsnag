import type { Router } from 'vue-router'
import BugsnagPerformance from '@bugsnag/browser-performance'
import { VueRouterRoutingProvider } from '@bugsnag/vue-router-performance'
import { performanceClient } from '../state'

export function startPerformance(options: any, router: Router): typeof BugsnagPerformance {
  const performanceOptions = {
    ...options,
    routingProvider: new VueRouterRoutingProvider(router),
  }

  BugsnagPerformance.start(performanceOptions)
  performanceClient.value = BugsnagPerformance

  return BugsnagPerformance
}
