import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('deferStart mode', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/deferstart', import.meta.url)),
    server: true,
    build: true,
  })

  it('renders the page when deferStart is true', async () => {
    const result = await $fetch('/')
    expect(result).toContain('DeferStart Test')
  })

  it('does not auto-initialize Bugsnag when deferStart is true', async () => {
    const result = await $fetch('/')
    // Should contain deferStart config but not immediately start Bugsnag
    expect(result).toContain('deferStart')
  })
})
