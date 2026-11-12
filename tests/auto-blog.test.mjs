import { describe, expect, it } from 'vitest'
import { isDue } from '../scripts/auto-blog.mjs'

// 2026-11-13 is a Friday; its week starts Monday 2026-11-09.
describe('isDue', () => {
  it('is due when nothing is dated this week', () => {
    expect(isDue(['2026-11-02', '2026-11-08'], '2026-11-13')).toBe(true)
  })

  it('is due with one post earlier this week', () => {
    expect(isDue(['2026-11-09'], '2026-11-13')).toBe(true)
  })

  it('is not due once two posts are dated this week', () => {
    expect(isDue(['2026-11-09', '2026-11-11'], '2026-11-13')).toBe(false)
  })

  it('posts at most once a day', () => {
    expect(isDue(['2026-11-13'], '2026-11-13')).toBe(false)
  })

  it('treats Sunday as the end of the week, not the start', () => {
    expect(isDue(['2026-11-09', '2026-11-10'], '2026-11-15')).toBe(false)
    expect(isDue(['2026-11-09', '2026-11-10'], '2026-11-16')).toBe(true)
  })
})
