import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { defineNuxtPlugin } from '#app'
import optionsLoader from '#build/bugsnag.options.mjs';


let bugsnagClient

export default defineNuxtPlugin(async (nuxtApp) => {
  const options = await optionsLoader()
  options.plugins = [new BugsnagPluginVue()]
  if (!Bugsnag._client) {
    bugsnagClient = Bugsnag.start(options)
    Bugsnag.getPlugin('vue').installVueErrorHandler(nuxtApp.vueApp)
  } else {
    bugsnagClient = Bugsnag._client
  }

  nuxtApp.provide('bugsnag', bugsnagClient)
})
