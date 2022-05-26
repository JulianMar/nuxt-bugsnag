import { useNuxtApp } from '#app'
export const useBugsnag = () => {
  return useNuxtApp().$bugsnag
}
