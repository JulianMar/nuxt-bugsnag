import { useNuxtApp } from '#imports'
export const useBugsnag = () => {
  return useNuxtApp().$bugsnag
}
