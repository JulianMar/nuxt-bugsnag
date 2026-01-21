import type { Client, BrowserConfig } from '@bugsnag/js'
import type BugsnagPerformanceType from '@bugsnag/browser-performance'
import { shallowRef } from 'vue'
import mockBugsnag from '../utils/mockBugsnag'

// Client instances
export const bugsnagClient = shallowRef<Client>(mockBugsnag)
export const performanceClient = shallowRef<typeof BugsnagPerformanceType | null>(null)

// State flags
export const isInitialized = shallowRef(false)
export const deferStart = shallowRef(false)

// Stored configuration for deferred init
export const storedBugsnagOptions = shallowRef<BrowserConfig | null>(null)
export const storedPerformanceOptions = shallowRef<any>(null)
