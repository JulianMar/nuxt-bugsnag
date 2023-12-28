import Bugsnag from '@bugsnag/js'
import type { NodeConfig } from '@bugsnag/node'
import type { NitroApp } from 'nitropack'
import enhanceOptions from '../../utils/enhanceOptions'
import { defineNitroPlugin } from '#internal/nitro/plugin'
import { useRuntimeConfig } from '#imports'
import mockBugsnag from '../../utils/mockBugsnag'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const config = useRuntimeConfig()
  const options = enhanceOptions<NodeConfig>(config.public.bugsnag)

  try {
    const client = Bugsnag.start(options)
    // @ts-ignore
    nitroApp.$bugsnag = client
  } catch (error) {
    console.log('Bugsnag set to mock mode')

    // @ts-ignore
    nitroApp.$bugsnag = mockBugsnag
  }
})
