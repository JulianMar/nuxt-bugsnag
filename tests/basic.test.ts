import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { setup, $fetch, fetch, startServer, stopServer, buildFixture, loadFixture, useTestContext } from '@nuxt/test-utils'

describe('basic usage', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
    server: true,
    build: true
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

  it('disabled disables module', async () => {
    await reloadWithNewFixture('./fixtures/disabled')

    const result = await $fetch('/')
    expect(result).not.toContain('apiKey:"317c3d7013a3dc4a9e152138bfe8c900"')
  })

  it('map is generated', async () => {
    await reloadWithNewFixture('./fixtures/buildupload')

    const p = useTestContext().nuxt?.options.buildDir!

    const res = fs.readdirSync(path.join(p, 'output', 'server'))

    expect(res).toContain('index.mjs.map')
  })
})

const reloadWithNewFixture = async (path: string) => {
  await stopServer()

  await setup({
    rootDir: fileURLToPath(new URL(path, import.meta.url)),
    server: true,
    build: true
  })

  await loadFixture()
  await buildFixture()

  await startServer()
}
