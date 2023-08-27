import { Client } from "@bugsnag/js"
import { error } from "console"

function logger (...args: any) {
  throw new Error(args)
}

const instance = {
  notify: logger,
}

export default instance as any as Client
