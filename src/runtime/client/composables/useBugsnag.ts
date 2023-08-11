import { Client } from '@bugsnag/js'
import { useNuxtApp } from '#imports'

export const useBugsnag = () => {
  return useNuxtApp().$bugsnag as Client
}
