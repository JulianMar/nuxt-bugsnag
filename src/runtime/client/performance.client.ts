import { type RuntimeConfig } from '@nuxt/schema'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'
import BugsnagPerformance from '@bugsnag/browser-performance'
import { VueRouterRoutingProvider } from '@bugsnag/vue-router-performance'

export default defineNuxtPlugin((nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = config.public.bugsnag

  const router = useRouter()

  options.performanceConfig.routingProvider = new VueRouterRoutingProvider(router)

  const client = BugsnagPerformance.start(options)

  nuxtApp.vueApp.provide('bugsnag-performance', client)

  return {
    provide: {
      bugsnagPerformance: client
    }
  }
})
