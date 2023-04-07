import { useNuxtApp } from '#app'
import { Bugsnag } from '../types'

export const useBugsnag = () => {
  const bugsnag: Bugsnag = useNuxtApp().$bugsnag

  return bugsnag
}
