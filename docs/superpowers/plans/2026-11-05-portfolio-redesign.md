# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old Once UI template with a hand-built, statically generated Night shift portfolio (Home, Services ×5, Blog ×3, Contact) that ranks on Google.

**Architecture:** Fresh Next.js App Router project at the repo root (no `src/`). All content is typed data in `lib/` plus MDX files in `content/blog/`, so every page is built at build time. Styling is global design tokens in `app/globals.css` plus one CSS Module per page or component, ported from the approved mockup.

**Tech Stack:** Next.js 16 (App Router, TypeScript), React 19, `next/font/google`, `next-mdx-remote/rsc` + `gray-matter` + `rehype-pretty-code`/`shiki`, `next/og`, Vitest for unit tests.

**Spec:** `docs/superpowers/specs/2026-11-05-portfolio-redesign-design.md` · mockup: `docs/superpowers/specs/2026-11-05-home-mockup.html` · CV facts: `C:\Users\PC\Downloads\Muhammad-Fahad-Murtaza-CV.pdf`

## Global Constraints

- Domain `https://www.fahadmurtaza.me` (canonical host `www`, no trailing slash).
- Colors: bg `#0D0E12`, raised `#13141A`, lines `#23242B` / `#2E2F38`, text `#F2F1EA`, muted `#9A9BA3`, dim `#6E6F78` (borders and large text only), small dim text `#8A8B94`, accent coral `#FF5C47`, ink on coral `#0D0E12`. No lime anywhere.
- Fonts: Bricolage Grotesque (display), Figtree (body), JetBrains Mono (labels/meta).
- Hero: chips "Security Researcher · AI Engineer · Full Stack Developer"; H1 "Muhammad Fahad Murtaza"; line "An attacker's mindset with a builder's hands. I work across *offensive security*, AI and full-stack engineering."
- Every fact traces to the CV. Nothing confidential about SHAX internals.
- No contact form, backend, CMS, analytics, newsletter, search, or theme toggle.
- Anti-goals: gradient blobs, glassmorphism, emoji bullets, generic icon grids, centered "Hi 👋" hero. No code or assets from the old template.
- One H1 per page. WCAG AA contrast. Works at 360px wide. Motion off under `prefers-reduced-motion`.

## Review Focus

1. **Phone at 360px:** no horizontal page scroll on any page (hero grid, experience rows, work showcase, toolkit columns). Checked in Task 8 by `scrollWidth <= innerWidth` on every route.
2. **Touch and keyboard on the work showcase:** there is no hover on phones, so tap must switch the panel. Tab + Enter must also work. Pinned in Task 4 (buttons with `aria-pressed`).
3. **JavaScript off or slow:** reveal-on-scroll must never leave content invisible. Content is visible by default, and JS only adds the animation. Pinned in Task 4 (`html.js` gate).
4. **Bad post frontmatter** (missing title or date, bad date): the build fails with the file name, instead of showing "Invalid Date". Pinned in Task 3 tests.
5. **Canonical drift:** every canonical, sitemap URL and JSON-LD `url` uses exactly `https://www.fahadmurtaza.me` + path, with no trailing slash. Pinned in Task 8 (`check-seo`).

---

## File map

```
app/layout.tsx, app/globals.css, app/not-found.tsx, app/icon.svg
app/page.tsx + page.module.css                      Home
app/services/page.tsx, app/services/[slug]/page.tsx, app/services/services.module.css
app/blog/page.tsx, app/blog/[slug]/page.tsx, app/blog/blog.module.css
app/contact/page.tsx + contact.module.css
app/sitemap.ts, app/robots.ts, app/llms.txt/route.ts
app/opengraph-image.tsx, app/services/[slug]/opengraph-image.tsx, app/blog/[slug]/opengraph-image.tsx, lib/og.tsx
components/Nav.tsx(+css, client), Footer.tsx(+css), SectionHead.tsx, WorkShowcase.tsx(+css, client),
  Reveal.tsx(client), JsonLd.tsx, CopyEmail.tsx(client), ContactBlock.tsx(+css), PostList.tsx(+css)
lib/site.ts, lib/data.ts, lib/services.ts, lib/posts.ts, lib/seo.ts
content/blog/*.mdx (3)
public/images/fahad.jpg
scripts/check-seo.mjs
tests/posts.test.ts, tests/content.test.ts, tests/seo.test.ts
```

---

### Task 1: Clean slate, scaffold, shell (layout, nav, footer)

**Files:**
- Delete: `src/`, `public/images/*` (old), `public/trademark`, `public/fonts`, `postcss.config.js`, `next.config.mjs`, `LICENSE`, `next-env.d.ts`, `package-lock.json`, `node_modules`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `app/layout.tsx`, `app/globals.css`, `app/icon.svg`, `components/Nav.tsx`, `components/Nav.module.css`, `components/Footer.tsx`, `components/Footer.module.css`, `lib/site.ts`, `public/images/fahad.jpg`, `README.md`
- Copy: `.superpowers/brainstorm/1945-1793877693/content/fahad.jpg` → `public/images/fahad.jpg`

**Interfaces:**
- Produces `lib/site.ts`: `export const SITE = { url: 'https://www.fahadmurtaza.me', name: 'Muhammad Fahad Murtaza', short: 'Fahad Murtaza', email: 'fahadmurtaza021@gmail.com', city: 'Islamabad', country: 'Pakistan', tz: 'UTC+5', github: 'https://github.com/VendattaRG', linkedin: 'https://www.linkedin.com/in/muhammad-fahad-murtaza', roles: ['Security Researcher','AI Engineer','Full Stack Developer'], description: string }` and `export const NAV = [{href:'/',label:'Home'},{href:'/services',label:'Services'},{href:'/blog',label:'Blog'},{href:'/contact',label:'Contact'}]`.
- Produces CSS tokens in `globals.css`: `--bg --bg2 --line --line2 --ink --mut --dim --dim-text --ac --ac-ink`, font vars `--f-display --f-body --f-mono`, plus shared classes `.wrap` (max-width 1280px, side padding `clamp(16px,4vw,56px)`), `.kicker`, `.h2`, `.chips`, `.btn`, `.btn-ghost`, `.btn-ac`.

- [ ] **Step 1:** Delete the old files listed above. Write `package.json` (scripts `dev`, `build`, `start`, `test: vitest run`, `check:seo: node scripts/check-seo.mjs`) and install `next@16 react@19 react-dom@19 next-mdx-remote gray-matter rehype-pretty-code shiki` and dev deps `typescript @types/node @types/react @types/react-dom vitest`.
- [ ] **Step 2:** `next.config.ts` with `async redirects()` returning permanent redirects: `/work` → `/#work`, `/work/:slug` → `/#work`, `/blog/new-milestone-in-my-career-:n` → `/blog`.
- [ ] **Step 3:** `app/layout.tsx`: load the three fonts with `next/font/google` (`variable` mode) and set `metadataBase: new URL(SITE.url)` plus a title template `'%s | Muhammad Fahad Murtaza'`. Add `<html lang="en">`, a skip link, `<Nav/>`, `<main id="main">`, and `<Footer/>`. Add an inline script `document.documentElement.classList.add('js')` in the head.
- [ ] **Step 4:** Nav (client): logo "fahad" + coral "."; links with `aria-current="page"` on the active route; coral "Let's talk" button linking to `/contact`. Below 760px it shows a "Menu" button (`aria-expanded`) that opens a full-screen panel and closes on route change or Esc. Footer: the mockup's 4 columns with real links (services link to `/services/<slug>`; GitHub, LinkedIn and mailto), then the bottom line "© 2026 Muhammad Fahad Murtaza · Built by hand in Islamabad".
- [ ] **Step 5:** Placeholder `app/page.tsx` with a single H1. Run `npm run build`. Expected: build succeeds. Run `npm run dev`, open `/` in the browser pane at 1280 and at 360 wide. Expected: nav and footer match the mockup, and the mobile menu opens and closes.
- [ ] **Step 6:** Commit `chore: replace template with fresh Next.js shell`.

### Task 2: Content data (CV facts, services)

**Files:** Create `lib/data.ts`, `lib/services.ts`, `tests/content.test.ts`

**Interfaces:**
- Produces `lib/data.ts`:
  - `type PanelLine = { k: string; text: string; tone?: 'hit' | 'ok' }`
  - `type Project = { key: 'shax'|'argus'|'scrh'|'dentasmart'|'jukebox'; name; badge; cardLabel; cardText; sub; bullets: string[]; chips: string[]; panelTitle; panelTag: 'illustrative'|'flow'; lines: PanelLine[] }`, with `PROJECTS: Project[]` in that order. Copy them from the mockup v2 panels.
  - `EXPERIENCE: { from; to; role; company; note?; summary; location; current?: boolean }[]` (the 5 CV roles)
  - `COMPANIES = ['Zigron','Triomatic','AirOverflow','OctalSol']`
  - `SKILLS: { group; items: string[] }[]` (5 groups)
  - `EDUCATION`, `AWARDS: { title; org; year }[]`
  - `STATS: { value; sup?; label }[]`
- Produces `lib/services.ts`: `type Service = { slug; title; cardText; chips: string[]; metaTitle; metaDescription; intro; deliverables: string[]; steps: { title; text }[]; audience: string[]; projects: Project['key'][]; postTags: string[]; faq: { q; a }[] }`, plus `SERVICES: Service[]` and `getService(slug: string): Service | undefined`.

- [ ] **Step 1: Failing test** `tests/content.test.ts`:
```ts
expect(SERVICES.map(s => s.slug)).toEqual(['ai-pentest-automation','web-application-penetration-testing','ai-agent-development','full-stack-development','cloud-devops'])
for (const s of SERVICES) {
  expect(s.deliverables.length).toBeGreaterThanOrEqual(4); expect(s.deliverables.length).toBeLessThanOrEqual(6)
  expect(s.steps.length).toBeGreaterThanOrEqual(3); expect(s.steps.length).toBeLessThanOrEqual(4)
  expect(s.faq.length).toBeGreaterThanOrEqual(3)
  expect(s.metaDescription.length).toBeLessThanOrEqual(160)
  for (const k of s.projects) expect(PROJECTS.some(p => p.key === k)).toBe(true)
}
expect(EXPERIENCE).toHaveLength(5); expect(EXPERIENCE[0].current).toBe(true)
expect(PROJECTS.map(p => p.key)).toEqual(['shax','argus','scrh','dentasmart','jukebox'])
```
- [ ] **Step 2:** `npm test`. Expected: FAIL (modules missing).
- [ ] **Step 3:** Write the data. Service copy is plain, first person, CV facts only, no pricing. `cardText` and `chips` are the mockup's text.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: add CV and services content data`.

### Task 3: Blog engine and 3 starter posts

**Files:** Create `lib/posts.ts`, `tests/posts.test.ts`, `tests/fixtures/posts/{a.mdx,b.mdx,draft.mdx,bad.mdx}`, `content/blog/how-autonomous-pentest-agents-decide-what-to-attack.mdx`, `content/blog/broken-object-level-authorization-find-and-fix.mdx`, `content/blog/from-full-stack-developer-to-offensive-security.mdx`

**Interfaces:**
- Produces `type Post = { slug; title; description; date: string /* YYYY-MM-DD */; tags: string[]; draft: boolean; minutes: number; body: string }`, `getAllPosts(dir = 'content/blog'): Post[]` (drafts excluded, newest first), and `getPost(slug: string, dir?): Post | undefined`.
- Slug = file name without `.mdx`. `minutes = Math.max(1, Math.round(words / 220))`.

- [ ] **Step 1: Failing tests.** With the fixtures: `a` dated 2026-01-02 and `b` dated 2026-03-04 give `getAllPosts(fixtures).map(p=>p.slug)` = `['b','a']`. `draft.mdx` (draft: true) is excluded. A dir containing `bad.mdx` (no `date`) throws an error whose message contains `bad.mdx`. A 440-word body gives `minutes === 2`. `getPost('missing', fixtures)` is `undefined`.
- [ ] **Step 2:** `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implement with `fs` + `gray-matter`. Validate title, description and date (must match `/^\d{4}-\d{2}-\d{2}$/`), and throw `` `${file}: missing <field>` `` if one is missing.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5:** Write the 3 posts, as specified in the spec "Content" section (900–1400 words each, first person, dated 2026-09-18, 2026-10-14 and 2026-11-02 in the order career, BOLA, agents, tags matching the services' `postTags`). The BOLA post includes a vulnerable and a fixed handler in both Django and Express. The agents post uses general LangGraph-style pseudocode only.
- [ ] **Step 6:** Commit `feat: add blog engine and starter posts`.

### Task 4: Home page

**Files:** Create `app/page.tsx`, `app/page.module.css`, `components/SectionHead.tsx`, `components/WorkShowcase.tsx`, `components/WorkShowcase.module.css`, `components/Reveal.tsx`, `components/ContactBlock.tsx`, `components/ContactBlock.module.css`, `components/PostList.tsx`, `components/PostList.module.css`

**Interfaces:**
- Consumes `SITE`, `PROJECTS`, `EXPERIENCE`, `COMPANIES`, `SKILLS`, `EDUCATION`, `AWARDS`, `STATS`, `SERVICES`, and `getAllPosts()`.
- Produces `<SectionHead n="02" label="Services" title="What I can do for you." muted="Each one has its own page." />`, `<PostList posts={Post[]} />` (reused on `/blog`), `<ContactBlock />` (reused on service pages), and `<Reveal>` (adds `.in` via IntersectionObserver; CSS animates only under `html.js` and `prefers-reduced-motion: no-preference`).

- [ ] **Step 1:** Port the mockup section by section into server components, with sections `id="about" | "services" | "work" | "experience" | "toolkit" | "writing"`. Convert `cqw` sizes to `clamp()` rem values. The hero photo uses `next/image` with `priority`, alt "Muhammad Fahad Murtaza", and the cream card plus `mix-blend-mode: multiply`. Service cards link to `/services/<slug>`, the "Not sure?" card to `/contact`, and post rows to `/blog/<slug>`.
- [ ] **Step 2:** `WorkShowcase` (client): selector cards are `<button aria-pressed>`; the panel switches on `mouseenter`, `focus` and `click`; SHAX is the default. All 5 panels are rendered, and inactive ones get `aria-hidden` + `inert` + visibility hidden.
- [ ] **Step 3:** Mobile (<760px): hero stacks (photo first, capped at 420px tall), stats 2×2, services 1 column, selector cards scroll horizontally inside their own row, experience rows stack, toolkit 2 columns.
- [ ] **Step 4:** Verify in the browser pane at 1280 and 360: matches the mockup. Tap/click each project and the panel changes. Tab to a project card and press Enter, and the panel changes. With JS disabled (`javascript_tool`: remove the `js` class), all sections are still visible.
- [ ] **Step 5:** Commit `feat: build home page`.

### Task 5: Services pages

**Files:** Create `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/services/services.module.css`

**Interfaces:** Consumes `SERVICES`, `getService`, `PROJECTS`, `getAllPosts`, `SectionHead`, and `ContactBlock`. `generateStaticParams` returns the 5 slugs, and an unknown slug calls `notFound()`.

- [ ] **Step 1:** Index: H1 "Services", an intro, then 5 large rows (number, title, cardText, chips, arrow) and the ContactBlock.
- [ ] **Step 2:** Detail: breadcrumb (Home / Services / title), H1 = title, intro, then numbered sections "What you get", "How it works" (numbered steps), "Who it's for", related project cards (linking to `/#work`), related posts (`tags ∩ postTags`, hidden if empty), FAQ as `<details>`, ContactBlock, and "Other services" links.
- [ ] **Step 3:** Verify `/services` and all 5 detail pages render at 1280 and 360. `/services/nope` returns 404.
- [ ] **Step 4:** Commit `feat: add services pages`.

### Task 6: Blog pages

**Files:** Create `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/blog.module.css`

**Interfaces:** Consumes `getAllPosts`, `getPost`, `PostList`, and `SERVICES` (to link the related service whose `postTags` overlap). MDX is rendered by `compileMDX`/`MDXRemote` from `next-mdx-remote/rsc` with `rehype-pretty-code` (theme `github-dark-dimmed`, `keepBackground: false`).

- [ ] **Step 1:** Index: H1 "Writing", an intro, and `PostList` showing all posts with tag, date, minutes and description.
- [ ] **Step 2:** Post: meta line (date · tag · minutes · "By Muhammad Fahad Murtaza"), H1, description as a lead paragraph, a prose body (max-width 68ch; styled `h2`/`h3`/`code`/`pre`/`table`/`blockquote`), an author box with the photo, a related service link, and newer/older links. An unknown slug calls `notFound()`.
- [ ] **Step 3:** Verify all 3 posts render with highlighted code at 1280 and 360, and wide `pre` blocks scroll inside themselves, not the page.
- [ ] **Step 4:** Commit `feat: add blog pages`.

### Task 7: Contact page and 404

**Files:** Create `app/contact/page.tsx`, `app/contact/contact.module.css`, `components/CopyEmail.tsx`, `app/not-found.tsx`

- [ ] **Step 1:** Contact: H1 "Let's talk", a big `mailto:` button, `CopyEmail` (client; `navigator.clipboard.writeText`, then shows "Copied" for 2s and announces it via `aria-live`), LinkedIn and GitHub links (`rel="me noopener"`), "Islamabad, PK · UTC+5 · open to remote", and a "What to include" list (what you're building, what's broken, timeline, links).
- [ ] **Step 2:** 404: H1 "Nothing here", with links home and to `/blog`, in the site style.
- [ ] **Step 3:** Verify both pages at 1280 and 360, and that Copy works in the browser pane.
- [ ] **Step 4:** Commit `feat: add contact and 404 pages`.

### Task 8: SEO layer and final checks

**Files:** Create `lib/seo.ts`, `components/JsonLd.tsx`, `tests/seo.test.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, `lib/og.tsx`, `app/opengraph-image.tsx`, `app/services/[slug]/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, `scripts/check-seo.mjs`. Modify every `page.tsx` to export `metadata`/`generateMetadata` and render `<JsonLd>`.

**Interfaces:**
- Produces `lib/seo.ts`: `abs(path: string): string` (`SITE.url` + path, `'/'` → `SITE.url`); `pageMeta({ title, description, path, type?: 'website'|'article', publishedTime? }): Metadata` (canonical, OG, Twitter `summary_large_image`); `personLd()`, `websiteLd()`, `profilePageLd()`, `serviceLd(s: Service)`, `blogPostingLd(p: Post)`, `breadcrumbLd(items: { name: string; path: string }[])`.
- Produces `<JsonLd data={object | object[]} />`: a `<script type="application/ld+json">` with `<` escaped.

- [ ] **Step 1: Failing tests** `tests/seo.test.ts`: `abs('/')` = `'https://www.fahadmurtaza.me'`; `abs('/blog/x')` = `'https://www.fahadmurtaza.me/blog/x'`; `personLd().sameAs` contains the GitHub and LinkedIn URLs; `personLd().jobTitle` = `'AI Security Engineer'`; `breadcrumbLd([{name:'Home',path:'/'},{name:'Blog',path:'/blog'}]).itemListElement[1].item` = `abs('/blog')`; `blogPostingLd(post).datePublished` equals the post date; and the JSON from `<JsonLd>` contains no raw `</script`.
- [ ] **Step 2:** `npm test`. Expected: FAIL. Implement it. Expected: PASS.
- [ ] **Step 3:** Wire metadata and JSON-LD into every page. Home gets the title "Muhammad Fahad Murtaza · AI Security Engineer & Full Stack Developer" (absolute) plus Person, WebSite and ProfilePage. Service pages get Service + Breadcrumb, and posts get BlogPosting + Breadcrumb. `sitemap.ts` lists `/`, `/services`, the 5 services, `/blog`, the posts (`lastModified` = post date) and `/contact`. `robots.ts` allows all and points to the sitemap. `llms.txt` is plain text: name, roles, summary, then services and posts with absolute URLs.
- [ ] **Step 4:** OG images (1200×630, Night shift style): home shows the name, roles and photo; services and posts show title, kicker and the "fahad." logo. Fonts are fetched at build from the Google Fonts CSS API, falling back to system fonts on failure.
- [ ] **Step 5:** `scripts/check-seo.mjs`: against `BASE` (default `http://localhost:3000`), read `/sitemap.xml`. For each URL (with the origin swapped to BASE), assert status 200, exactly one `<h1`, a unique non-empty `<title>`, a meta description of 50–160 chars, `<link rel="canonical">` equal to the sitemap URL, `og:image` present, and every `ld+json` block parses. Also assert `/robots.txt`, `/llms.txt` and the redirects from `/work` and `/blog/new-milestone-in-my-career-2` (308/301 to the right target). Print `OK n pages` or each failure, and exit 1 on any failure.
- [ ] **Step 6:** `npm test && npm run build && npm start` (background), then `npm run check:seo`. Expected: `OK 12 pages`. In the browser pane at 360px, on every route, `document.documentElement.scrollWidth <= innerWidth` is true. Screenshot home, one service, one post and contact for the user.
- [ ] **Step 7:** Commit `feat: add SEO metadata, structured data, sitemap and OG images`.
