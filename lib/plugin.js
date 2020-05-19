import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
const options = <%= serialize(options) %>
options.plugins = [new BugsnagPluginVue(Vue)]
const bugsnagClient = Bugsnag.start(options)

export default function ({ app }, inject) {
  inject('bugsnag', bugsnagClient)
}
