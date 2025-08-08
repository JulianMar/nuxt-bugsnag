import type { Client } from '@bugsnag/js'

function logger(...args: any) {
  throw new Error(args)
}

const instance = {
  notify: logger,
}

export default instance as any as Client
