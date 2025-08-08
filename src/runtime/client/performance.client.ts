import type { RuntimeConfig } from '@nuxt/schema'
import BugsnagPerformance from '@bugsnag/browser-performance'
import { VueRouterRoutingProvider } from '@bugsnag/vue-router-performance'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = config.public.bugsnag

  const router = useRouter()

  options.performanceConfig.routingProvider = new VueRouterRoutingProvider(router)

  const client = BugsnagPerformance.start(options)

  nuxtApp.vueApp.provide('bugsnag-performance', client)

  return {
    provide: {
      bugsnagPerformance: client,
    },
  }
})
