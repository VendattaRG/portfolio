// Checks every page in the sitemap of a running server for the SEO basics.
// Usage: npm run build && npm start, then: npm run check:seo  (or BASE=http://host:port node scripts/check-seo.mjs)
const BASE = (process.env.BASE || 'http://localhost:3000').replace(/\/$/, '')
const ORIGIN = 'https://www.fahadmurtaza.me'

const failures = []
const fail = (where, msg) => failures.push(`${where}: ${msg}`)
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]
const metaTag = (html, key, val) =>
  html.match(new RegExp(`<meta[^>]*${key}="${val}"[^>]*>`))?.[0] ?? ''
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')

async function get(path, opts) {
  return fetch(BASE + path, opts)
}

const sitemapRes = await get('/sitemap.xml')
if (!sitemapRes.ok) {
  console.error(`sitemap.xml: HTTP ${sitemapRes.status}`)
  process.exit(1)
}
const urls = [...(await sitemapRes.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const titles = new Map()

for (const url of urls) {
  if (!url.startsWith(ORIGIN)) fail(url, `sitemap URL is not on ${ORIGIN}`)
  if (url !== ORIGIN && url.endsWith('/')) fail(url, 'trailing slash in sitemap URL')
  const path = url.slice(ORIGIN.length) || '/'
  const res = await get(path)
  if (res.status !== 200) {
    fail(path, `HTTP ${res.status}`)
    continue
  }
  const html = await res.text()

  const h1s = (html.match(/<h1[\s>]/g) || []).length
  if (h1s !== 1) fail(path, `${h1s} <h1> elements (want 1)`)

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').trim()
  if (!title) fail(path, 'missing <title>')
  else if (titles.has(title)) fail(path, `duplicate title, also on ${titles.get(title)}`)
  else titles.set(title, path)

  const desc = decode(attr(metaTag(html, 'name', 'description'), 'content') ?? '')
  if (desc.length < 50 || desc.length > 160) fail(path, `meta description is ${desc.length} chars (want 50–160)`)

  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0]
  const href = canonical && attr(canonical, 'href')
  if (href !== url) fail(path, `canonical is ${href ?? 'missing'} (want ${url})`)

  const ogImage = attr(metaTag(html, 'property', 'og:image'), 'content')
  if (!ogImage) fail(path, 'missing og:image')
  // posts and service pages have their own share image
  else if (/^\/(blog|services)\/[^/]+$/.test(path) && !ogImage.startsWith(`${url}/opengraph-image`))
    fail(path, `og:image is ${ogImage} (want this page's own image)`)
  else {
    const img = await get(ogImage.slice(ORIGIN.length))
    if (!img.ok || img.headers.get('content-type') !== 'image/png') fail(path, `og:image does not load (${img.status})`)
  }
  if (!metaTag(html, 'property', 'og:title')) fail(path, 'missing og:title')
  if (!metaTag(html, 'name', 'twitter:card')) fail(path, 'missing twitter:card')

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  if (blocks.length === 0) fail(path, 'no JSON-LD')
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1])
      for (const item of [data].flat()) {
        if (item.url && !String(item.url).startsWith(ORIGIN)) fail(path, `JSON-LD url ${item.url} is off-origin`)
      }
    } catch (e) {
      fail(path, `JSON-LD does not parse: ${e.message}`)
    }
  }
}

// site-wide files
const robots = await get('/robots.txt')
const robotsText = await robots.text()
if (!robots.ok || !robotsText.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('/robots.txt', 'missing or no Sitemap line')

const llms = await get('/llms.txt')
const llmsText = await llms.text()
if (!llms.ok || !(llms.headers.get('content-type') || '').startsWith('text/plain')) fail('/llms.txt', 'missing or not text/plain')
for (const url of urls) if (!llmsText.includes(url)) fail('/llms.txt', `does not list ${url}`)

// old template URLs redirect somewhere useful
for (const [from, to] of [
  ['/work', '/#work'],
  ['/work/some-project', '/#work'],
  ['/blog/new-milestone-in-my-career-2', '/blog'],
]) {
  const r = await get(from, { redirect: 'manual' })
  const loc = r.headers.get('location') || ''
  if (![301, 308].includes(r.status) || !loc.endsWith(to)) fail(from, `redirect ${r.status} → ${loc || 'none'} (want permanent → ${to})`)
}

const missing = await get('/this-page-does-not-exist')
if (missing.status !== 404) fail('/this-page-does-not-exist', `HTTP ${missing.status} (want 404)`)

if (failures.length) {
  console.error(failures.map((f) => `✗ ${f}`).join('\n'))
  console.error(`\n${failures.length} problem(s) across ${urls.length} pages`)
  process.exit(1)
}
console.log(`OK ${urls.length} pages`)
process.exit(0) // keep-alive connections to a remote host would otherwise hold the process open
