import type { Client } from '@bugsnag/js'

const mockBugsnag = {
  notify: (error: any) => {
    console.warn('[Bugsnag] Error logged (not initialized):', error)
  },
  leaveBreadcrumb: (name: string, metadata?: object) => {
    console.log('[Bugsnag] Breadcrumb:', name, metadata)
  },
  setUser: (id?: string, email?: string, name?: string) => {
    console.log('[Bugsnag] setUser:', { id, email, name })
  },
  setContext: (context: string) => {
    console.log('[Bugsnag] setContext:', context)
  },
  addMetadata: (section: string, values: Record<string, any>) => {
    console.log('[Bugsnag] addMetadata:', section, values)
  },
  clearMetadata: (section: string, key?: string) => {
    console.log('[Bugsnag] clearMetadata:', section, key)
  },
  getMetadata: () => undefined,
  getUser: () => ({}),
  getContext: () => undefined,
  isStarted: () => false,
  startSession: () => mockBugsnag,
  pauseSession: () => {},
  resumeSession: () => mockBugsnag,
  addOnError: () => () => {},
  addOnSession: () => () => {},
  addOnBreadcrumb: () => () => {},
  getPlugin: () => undefined,
} as unknown as Client

export default mockBugsnag
