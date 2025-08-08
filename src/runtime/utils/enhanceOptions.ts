import type { BrowserConfig } from '@bugsnag/js'
import type { NodeConfig } from '@bugsnag/node'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

export default function enhanceOptions<T extends BrowserConfig | NodeConfig>(moduleOptions: any): T {
  const options: T = { ...moduleOptions }

  options.plugins = [...options.plugins || [], new BugsnagPluginVue()]

  options.onError = options.onError || []

  if (typeof options.onError === 'function') {
    const originalOnError = options.onError
    options.onError = [originalOnError]
  };

  options.onError.push((event) => {
    event.errors[0].stacktrace = event.errors[0].stacktrace.map((row) => {
      row.file = row.file.replace('file://', '')
      return row
    })
  })

  return options
}
