import { describe, expect, it } from 'vitest'
import { EXPERIENCE, PROJECTS } from '@/lib/data'
import { SERVICES, getService } from '@/lib/services'

describe('services', () => {
  it('has the five service pages in order', () => {
    expect(SERVICES.map((s) => s.slug)).toEqual([
      'ai-pentest-automation',
      'web-application-penetration-testing',
      'ai-agent-development',
      'full-stack-development',
      'cloud-devops',
    ])
  })

  it.each(SERVICES.map((s) => [s.slug, s] as const))('%s has complete page content', (_slug, s) => {
    expect(s.deliverables.length).toBeGreaterThanOrEqual(4)
    expect(s.deliverables.length).toBeLessThanOrEqual(6)
    expect(s.steps.length).toBeGreaterThanOrEqual(3)
    expect(s.steps.length).toBeLessThanOrEqual(4)
    expect(s.faq.length).toBeGreaterThanOrEqual(3)
    expect(s.metaDescription.length).toBeGreaterThanOrEqual(50)
    expect(s.metaDescription.length).toBeLessThanOrEqual(160)
    for (const k of s.projects) expect(PROJECTS.some((p) => p.key === k)).toBe(true)
  })

  it('finds a service by slug and returns undefined for unknown slugs', () => {
    expect(getService('cloud-devops')?.title).toBe('Cloud & DevOps')
    expect(getService('nope')).toBeUndefined()
  })
})

describe('cv data', () => {
  it('lists the five roles, newest first and current role marked', () => {
    expect(EXPERIENCE).toHaveLength(5)
    expect(EXPERIENCE[0].current).toBe(true)
    expect(EXPERIENCE.filter((e) => e.current)).toHaveLength(1)
  })

  it('lists the five projects in showcase order', () => {
    expect(PROJECTS.map((p) => p.key)).toEqual(['shax', 'argus', 'scrh', 'dentasmart', 'jukebox'])
  })
})
