import { describe, expect, it } from 'vitest'
import { filterPosts, topicCounts, type PostMeta } from '@/lib/blog'
import { getToc } from '@/lib/toc'

const P = (slug: string, title: string, tags: string[], description = 'A post.'): PostMeta => ({
  slug,
  title,
  description,
  tags,
  date: '2026-01-01',
  minutes: 3,
})

const POSTS = [
  P('agents', 'How an autonomous pentest agent decides what to attack next', ['ai-security', 'agents']),
  P('bola', 'Broken object-level authorization: how to find it and fix it', ['web-security', 'appsec'], 'Fix it in Django.'),
  P('career', 'From full-stack developer to offensive security engineer', ['career', 'full-stack']),
]

describe('filterPosts', () => {
  it('returns everything for an empty query and no topic', () => {
    expect(filterPosts(POSTS, '', null)).toHaveLength(3)
  })

  it('matches title words case-insensitively, ignoring extra spaces', () => {
    expect(filterPosts(POSTS, '  PENTEST  ', null).map((p) => p.slug)).toEqual(['agents'])
  })

  it('requires every word to match, across title, description and topic', () => {
    expect(filterPosts(POSTS, 'django authorization', null).map((p) => p.slug)).toEqual(['bola'])
    expect(filterPosts(POSTS, 'django career', null)).toEqual([])
  })

  it('matches topic names as shown, not only the slug', () => {
    expect(filterPosts(POSTS, 'web security', null).map((p) => p.slug)).toEqual(['bola'])
  })

  it('filters by topic, and combines topic with the query', () => {
    expect(filterPosts(POSTS, '', 'agents').map((p) => p.slug)).toEqual(['agents'])
    expect(filterPosts(POSTS, 'django', 'agents')).toEqual([])
  })

  it('ignores an unknown topic rather than hiding everything', () => {
    expect(filterPosts(POSTS, '', 'nope')).toHaveLength(3)
  })
})

describe('topicCounts', () => {
  it('counts posts per topic, most used first, then by name', () => {
    const t = topicCounts([...POSTS, P('x', 'Another', ['agents'])])
    expect(t[0]).toEqual({ tag: 'agents', label: 'Agents', count: 2 })
    expect(t.map((x) => x.count).every((c, i, a) => i === 0 || a[i - 1] >= c)).toBe(true)
    expect(t).toHaveLength(6)
  })
})

describe('getToc', () => {
  const md = [
    '## What BOLA actually is',
    'Text with ## not a heading',
    '```python',
    '## not a heading inside code',
    '```',
    '## How to fix it in `Django`',
    '### A sub-heading is skipped',
    '## Why it happens',
    '## Why it happens',
  ].join('\n')

  it('lists level-2 headings outside code blocks, with ids matching rehype-slug', () => {
    expect(getToc(md)).toEqual([
      { id: 'what-bola-actually-is', text: 'What BOLA actually is' },
      { id: 'how-to-fix-it-in-django', text: 'How to fix it in Django' },
      { id: 'why-it-happens', text: 'Why it happens' },
      { id: 'why-it-happens-1', text: 'Why it happens' },
    ])
  })
})
