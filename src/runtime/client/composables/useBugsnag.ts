import { Client } from '@bugsnag/js'
import { useNuxtApp } from '#imports'
// import BugsnagPerformance from '@bugsnag/browser-performance'
import mock from '../../utils/mockBugsnag'

export const useBugsnag = () => {
  try {
    return useNuxtApp().$bugsnag as Client
  } catch {
    console.error('Bugsnag is not available')
    return mock
  }
}

// export const useBugsnagPerformance = () => {
//   if (!import.meta.client) {
//     console.log('Bugsnag Performance should only be called on the client side - mock mode')
//     return {
//       startNetworkSpan: () => {
//         console.log('start Network Span')
//         return ({ end: () => console.log('end Network Span') })
//       },
//       startSpan: () => {
//         console.log('start Span')
//         return ({ end: () => console.log('end Span') })
//       },
//     }
//   }

//   return BugsnagPerformance
// }
