import { describe, expect, it } from 'vitest'
import { getAllPosts } from '@/lib/posts'
import { abs, blogPostingLd, breadcrumbLd, pageMeta, personLd, serviceLd, toJsonLd } from '@/lib/seo'
import { SERVICES } from '@/lib/services'

describe('abs', () => {
  it('maps the home path to the bare origin, with no trailing slash', () => {
    expect(abs('/')).toBe('https://www.fahadmurtaza.me')
  })

  it('joins inner paths to the canonical origin', () => {
    expect(abs('/blog/x')).toBe('https://www.fahadmurtaza.me/blog/x')
  })
})

describe('pageMeta', () => {
  it('sets canonical, Open Graph url and a large Twitter card from one path', () => {
    const m = pageMeta({ title: 'Blog', description: 'd'.repeat(60), path: '/blog' })
    expect(m.alternates?.canonical).toBe('https://www.fahadmurtaza.me/blog')
    expect((m.openGraph as { url?: string }).url).toBe('https://www.fahadmurtaza.me/blog')
    expect((m.twitter as { card?: string }).card).toBe('summary_large_image')
  })

  it('falls back to the site share image, since page-level openGraph replaces the inherited one', () => {
    const m = pageMeta({ title: 'Contact', description: 'd'.repeat(60), path: '/contact' })
    const img = [(m.openGraph as { images?: unknown }).images].flat()[0] as { url: string }
    expect(img.url).toBe(abs('/opengraph-image'))
  })

  it("uses a page's own share image when it has one", () => {
    const m = pageMeta({ title: 'Post', description: 'd'.repeat(60), path: '/blog/x', image: '/blog/x/opengraph-image' })
    const img = [(m.openGraph as { images?: unknown }).images].flat()[0] as { url: string }
    expect(img.url).toBe(abs('/blog/x/opengraph-image'))
  })
})

describe('structured data', () => {
  it('describes the person with job title and social profiles', () => {
    const p = personLd()
    expect(p.jobTitle).toBe('AI Security Engineer')
    expect(p.sameAs).toContain('https://github.com/VendattaRG')
    expect(p.sameAs).toContain('https://www.linkedin.com/in/muhammad-fahad-murtaza')
  })

  it('builds breadcrumbs with absolute item URLs', () => {
    const b = breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ])
    expect(b.itemListElement[1].item).toBe(abs('/blog'))
    expect(b.itemListElement[1].position).toBe(2)
  })

  it('dates a blog post with its frontmatter date', () => {
    const post = getAllPosts()[0]
    const ld = blogPostingLd(post)
    expect(ld.datePublished).toBe(post.date)
    expect(ld.url).toBe(abs(`/blog/${post.slug}`))
  })

  it('points each service at its own page', () => {
    expect(serviceLd(SERVICES[0]).url).toBe(abs('/services/ai-pentest-automation'))
  })

  it('escapes "<" so JSON-LD can never close its script tag', () => {
    const out = toJsonLd({ name: '</script><script>alert(1)</script>' })
    expect(out).not.toContain('</script')
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>')
  })
})

describe('meta descriptions', () => {
  it.each([...getAllPosts().map((p) => [p.slug, p.description]), ...SERVICES.map((s) => [s.slug, s.metaDescription])])(
    '%s fits in a search result (50–160 chars)',
    (_k, d) => {
      expect(d.length).toBeGreaterThanOrEqual(50)
      expect(d.length).toBeLessThanOrEqual(160)
    },
  )
})
