import Bugsnag from '@bugsnag/js'
import type { NodeConfig } from '@bugsnag/node'
import type { NitroApp } from 'nitropack'
import enhanceOptions from '../../utils/enhanceOptions'
import mockBugsnag from '../../utils/mockBugsnag'
import { defineNitroPlugin } from '#internal/nitro/plugin'
import { useRuntimeConfig } from '#imports'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const config = useRuntimeConfig()
  const options = enhanceOptions<NodeConfig>(config.public.bugsnag)

  try {
    const client = Bugsnag.start(options)
    // @ts-expect-error NitroApp does not have $bugsnag by default
    nitroApp.$bugsnag = client
  }
  catch (error) {
    console.log('Bugsnag set to mock mode')

    // @ts-expect-error NitroApp does not have $bugsnag by default
    nitroApp.$bugsnag = mockBugsnag
  }
})
