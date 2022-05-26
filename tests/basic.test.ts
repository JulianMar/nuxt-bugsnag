import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils'

describe('example', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    server: true
  })

  it('Renders Hello Nuxt', async () => {
    expect(await $fetch('/')).toMatch('@bugsnag/js')
  })

  it('Renders borked page', async () => {
    const result = await fetch('/borked')
    expect(result.status.toString()).toMatch('500')
  })

  it('Renders Hello Nuxt', async () => {
    const result = await $fetch('/')
    expect(result).toContain('apiKey:"317c3d7013a3dc4a9e152138bfe8c900"')
  })
})
