import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
const options = <%= serialize(options) %>
options.plugins = [new BugsnagPluginVue(Vue)]

let bugsnagClient

export default function ({ app }, inject) {
  if (!Bugsnag._client) {
    bugsnagClient = Bugsnag.start(options)
  } else {
    bugsnagClient = Bugsnag._client
  }

  inject('bugsnag', bugsnagClient)
}
