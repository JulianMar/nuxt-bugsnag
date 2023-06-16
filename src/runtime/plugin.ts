import Bugsnag, { BrowserConfig, Client } from '@bugsnag/js'
import { RuntimeConfig } from '@nuxt/schema'
import enhanceOptions from './utils/enhanceOptions'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const options = enhanceOptions<BrowserConfig>(config.public.bugsnag)

  // we check the internal client to prevent the [bugsnag] Bugsnag.start() was called more than once. Ignoring. error
  let client: Client | null = (Bugsnag as any)._client
  if (client === null) {
    client = Bugsnag.start(options)
  }

  nuxtApp.vueApp.provide('bugsnag-client', client)

  const plugin = Bugsnag.getPlugin('vue')

  if (plugin !== undefined) {
    nuxtApp.vueApp.use(plugin)
  }

  return {
    provide: {
      bugsnag: client
    }
  }
})
