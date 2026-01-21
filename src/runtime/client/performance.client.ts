import type { RuntimeConfig } from '@nuxt/schema'
import { startPerformance } from './services/performance'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(() => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = config.public.bugsnag
  const isDeferStart = options.deferStart ?? false

  // If deferStart is enabled, performance will be started by initBugsnag()
  if (isDeferStart) {
    return
  }

  // Immediate initialization
  const router = useRouter()
  startPerformance(options.performanceConfig, router)
})
