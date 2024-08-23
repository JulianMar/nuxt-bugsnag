import { Client } from '@bugsnag/js'
import { useNuxtApp } from '#imports'
import BugsnagPerformance from '@bugsnag/browser-performance'

export const useBugsnag = () => {
  return useNuxtApp().$bugsnag as Client
}

export const useBugsnagPerformance = () => {
  if (!import.meta.client) {
    console.log('Bugsnag Performance should only be called on the client side - mock mode')
    return {
      startNetworkSpan: () => {
        console.log('start Network Span')
        return ({ end: () => console.log('end Network Span') })
      },
      startSpan: () => {
        console.log('start Span')
        return ({ end: () => console.log('end Span') })
      },
    }
  }

  return BugsnagPerformance
}
