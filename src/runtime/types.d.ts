import type { Client } from '@bugsnag/js'

export interface Bugsnag extends Client {}

declare module '#app' {
  interface NuxtApp {
    $bugsnag: Bugsnag
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $bugsnag: Bugsnag
  }
}

export {}
