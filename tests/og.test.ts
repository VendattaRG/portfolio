import { afterEach, expect, it, vi } from 'vitest'
import { ogImage } from '@/lib/og'

afterEach(() => vi.unstubAllGlobals())

// Vercel's build failed here: with no network fonts the renderer got an empty font list and crashed.
it('renders a share image even when Google Fonts is unreachable', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  const res = await ogImage({ kicker: 'Blog', title: 'How an autonomous pentest agent decides what to attack next' })
  const png = Buffer.from(await res.arrayBuffer())
  expect(png.subarray(1, 4).toString()).toBe('PNG')
}, 30_000)

it('renders the home share image with the photo', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  const res = await ogImage({ kicker: 'AI Security Engineer', title: 'Muhammad Fahad Murtaza', withPhoto: true })
  const png = Buffer.from(await res.arrayBuffer())
  expect(png.subarray(1, 4).toString()).toBe('PNG')
}, 30_000)
