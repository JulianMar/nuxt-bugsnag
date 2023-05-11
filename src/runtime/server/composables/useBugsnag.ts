import { Client } from '@bugsnag/js'
import { useNitroApp } from '#imports'

export const useBugsnag = (): Client => {
  return useNitroApp().$bugsnag
}
