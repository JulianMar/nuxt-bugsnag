import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
const options = <%= serialize(options) %>
options.plugins = [new BugsnagPluginVue(Vue)]

export default function ({ app }, inject) {
  const bugsnagClient = Bugsnag.start(options)

  inject('bugsnag', bugsnagClient)
}
