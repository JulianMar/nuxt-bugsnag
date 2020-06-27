import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
const options = <%= serialize(options) %>
options.plugins = [new BugsnagPluginVue()]

export default function ({ app }, inject) {
  const bugsnagClient = Bugsnag.start(options)
  Bugsnag.getPlugin('vue').installVueErrorHandler(Vue)
  
  inject('bugsnag', bugsnagClient)
}
