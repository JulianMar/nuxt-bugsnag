import Bugsnag, { BrowserConfig, Client } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { defineNuxtPlugin, isVue2 } from '#app'
export default defineNuxtPlugin((nuxtApp) => {
  const options: BrowserConfig = { ...nuxtApp.payload.config.public.bugsnag }

  options.plugins = [new BugsnagPluginVue()]
  options.onError = (event) => {
    event.errors[0].stacktrace = event.errors[0].stacktrace.map((row) => {
      row.file = row.file.replace('file://', '')
      return row
    })
  }

  // we check the internal client to prevent the [bugsnag] Bugsnag.start() was called more than once. Ignoring. error
  let client: Client | null = (Bugsnag as any)._client
  if (client === null) {
    client = Bugsnag.start(options)
  }

  nuxtApp.vueApp.provide<Client>('bugsnag-client', client)

  const vuePlugin = client.getPlugin('vue')

  if (isVue2) {
    vuePlugin.installVueErrorHandler(nuxtApp.vueApp)
  } else {
    nuxtApp.vueApp.use(vuePlugin)
  }

  return {
    provide: {
      bugsnag: client
    }
  }
})
