import type { Client } from '@bugsnag/js'
import { useNitroApp } from '#internal/nitro/app'

export const useBugsnag = (): Client => {
  return useNitroApp().$bugsnag
}
