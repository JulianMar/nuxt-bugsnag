import Bugsnag from '@bugsnag/js'
import { NodeConfig } from '@bugsnag/node'
import { sendError } from 'h3'
import { NitroApp } from 'nitropack'
import enhanceOptions from '../../utils/enhanceOptions'
import { defineNitroPlugin, useRuntimeConfig } from '#imports'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const config = useRuntimeConfig()
  const options = enhanceOptions<NodeConfig>(config.public.bugsnagModule)

  const client = Bugsnag.start(options)

  const errorHandler = nitroApp.h3App.options.onError

  nitroApp.h3App.options.onError = (error, event) => {
    client.notify(error, e => e.addMetadata('h3', { path: event.path }))

    if (errorHandler === undefined) {
      return sendError(event, error)
    }

    errorHandler && errorHandler(error, event)
  }

  // @ts-ignore
  nitroApp.$bugsnag = client
})
