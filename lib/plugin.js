import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
const options = <%= serialize(options) %>
options.plugins = [new BugsnagPluginVue()]

let bugsnagClient

export default function ({ app }, inject) {
  if (!Bugsnag._client) {
    bugsnagClient = Bugsnag.start(options)
    Bugsnag.getPlugin('vue').installVueErrorHandler(Vue)
  } else {
    bugsnagClient = Bugsnag._client
  }

  inject('bugsnag', bugsnagClient)
}
