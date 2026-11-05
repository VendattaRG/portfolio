import { describe, expect, it } from 'vitest'
import { getAllPosts, getPost } from '@/lib/posts'

const FIX = 'tests/fixtures/posts'

describe('posts', () => {
  it('returns published posts, newest first', () => {
    expect(getAllPosts(FIX).map((p) => p.slug)).toEqual(['b', 'a'])
  })

  it('excludes drafts', () => {
    expect(getAllPosts(FIX).some((p) => p.slug === 'draft')).toBe(false)
  })

  it('treats a missing draft flag as published', () => {
    expect(getPost('b', FIX)?.draft).toBe(false)
  })

  it('fails loudly, naming the file, when frontmatter is incomplete', () => {
    expect(() => getAllPosts('tests/fixtures/bad')).toThrow(/bad\.mdx.*date/)
  })

  it('estimates reading time at 220 words a minute, at least 1', () => {
    expect(getPost('a', FIX)?.minutes).toBe(1)
  })

  it('rounds a 440-word post to 2 minutes', () => {
    expect(getAllPosts('tests/fixtures/long')[0].minutes).toBe(2)
  })

  it('rejects a date that is not YYYY-MM-DD', () => {
    expect(() => getAllPosts('tests/fixtures/baddate')).toThrow(/when\.mdx.*date/)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getPost('missing', FIX)).toBeUndefined()
  })
})

describe('formatDate', () => {
  it('formats an ISO date for display without timezone drift', async () => {
    const { formatDate } = await import('@/lib/posts')
    expect(formatDate('2026-11-02')).toBe('2 Nov 2026')
  })
})

describe('real content', () => {
  it('loads the published posts without errors', () => {
    expect(getAllPosts().length).toBeGreaterThanOrEqual(3)
  })

  it('gives every service page at least one related post', async () => {
    const { SERVICES } = await import('@/lib/services')
    const tags = new Set(getAllPosts().flatMap((p) => p.tags))
    for (const s of SERVICES) expect(s.postTags.some((t) => tags.has(t)), s.slug).toBe(true)
  })
})
