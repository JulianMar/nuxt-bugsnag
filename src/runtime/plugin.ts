import Bugsnag, { BrowserConfig, Client } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { defineNuxtPlugin, isVue2 } from '#app'

let client: null|Client = null
export default defineNuxtPlugin((nuxtApp) => {
  const options: BrowserConfig = { ...nuxtApp.payload.config.public.bugsnag }

  options.plugins = [new BugsnagPluginVue()]
  options.onError = (event) => {
    event.errors[0].stacktrace = event.errors[0].stacktrace.map((row) => {
      row.file = row.file.replace('file://', '')
      return row
    })
  }

  if (client === null) {
    client = Bugsnag.start(options)
  }

  nuxtApp.vueApp.provide<Client>('bugsnag-client', client)

  const vuePlugin = client.getPlugin('vue')

  if (isVue2) {
    vuePlugin?.installVueErrorHandler(nuxtApp.vueApp)
  } else {
    nuxtApp.vueApp.use(vuePlugin)
  }

  return {
    provide: {
      bugsnag: client
    }
  }
})
