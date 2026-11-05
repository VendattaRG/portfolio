# Portfolio redesign: design

Owner: Muhammad Fahad Murtaza · Date: 2026-11-05 · Branch: `redesign`

## Intent

A personal site that is Fahad's introduction and his promotion. A visitor (a recruiter, a hiring manager, or a client who needs something built or tested) should leave knowing who he is, where he has worked, what he has built, what services he offers, and what he writes about. The site has to rank on Google for his name and for his services, and it must look hand-made rather than AI-generated.

Source of truth for facts: `C:\Users\PC\Downloads\Muhammad-Fahad-Murtaza-CV.pdf`. Content structure reference: hassannazir.dev (one page per service, a long-form blog, an AI-readable index). Use it for structure only. Do not copy its look.

## Goals

- Rank for "Muhammad Fahad Murtaza" / "Fahad Murtaza", then for each service ("AI pentest automation", "web application penetration testing", and so on).
- Pages: Home, Services (index plus one page per service), Blog (index plus posts), Contact.
- Lighthouse 95+ on SEO, accessibility and performance. Every page is statically generated.

## Non-goals

- No contact form, no backend, no database, no CMS, no analytics, no newsletter, no search.
- No separate About or Projects pages. Home covers both.
- No light/dark toggle. The site is dark only.

## Anti-goals (failures even if it "works")

- Looks like a template or AI output: gradient blobs, glassmorphism, emoji bullets, generic icon grids, Inter everywhere, centered "Hi, I'm 👋" hero.
- Reuses anything from the old Once UI / Magic Portfolio code or design.
- Invented facts. Every claim must trace to the CV. Nothing confidential about SHAX internals at Nua Security.

## Decided by Fahad

- **Look: "Night shift".** Approved mockup: `docs/superpowers/specs/2026-11-05-home-mockup.html`. Match it closely on desktop.
  - Colors: bg `#0D0E12`, raised `#13141A`, lines `#23242B` / `#2E2F38`, text `#F2F1EA`, muted `#9A9BA3`, dim `#6E6F78`, **accent coral `#FF5C47`** (no lime anywhere). Dark ink `#0D0E12` on coral.
  - Fonts: Bricolage Grotesque (display), Figtree (body), JetBrains Mono (labels and meta).
- **Hero copy:** roles chip row "Security Researcher · AI Engineer · Full Stack Developer". H1 "Muhammad Fahad Murtaza". Line: "An attacker's mindset with a builder's hands. I work across *offensive security*, AI and full-stack engineering." ("offensive security" in coral.)
- **Photo:** his B&W studio portrait, shown in a cream card with `mix-blend-mode: multiply` so the white background turns cream. The watermark is already painted out in `.superpowers/brainstorm/1945-1793877693/content/fahad.jpg`; copy it to `public/images/fahad.jpg`.
- **Home sections, in order:** nav · hero (with "Currently: AI Engineer, Pentest Automation, Nua Security" card) · "Previously shipped at" strip · 01 About (copy and 4 stats) · 02 Services (5 cards plus a "Not sure?" card) · 03 Selected work · 04 Experience (5 roles) · 05 Toolkit plus education and 2 awards · 06 Writing (latest 3 posts) · coral contact block · footer.
- **Selected work is interactive:** a big featured panel plus 5 selector cards (SHAX, Argus, SCRH, DentaSmart, JukeBox). Hover or click swaps the panel. SHAX is the default. All five panels are in the HTML (for SEO), and only the active one is visible.
- **Domain:** `https://www.fahadmurtaza.me` (canonical host is `www`).
- **Contact:** no form. A plain `mailto:fahadmurtaza021@gmail.com` link, plus LinkedIn, GitHub, location and timezone.
- **Blog:** remove the old Format String Bug post (4 duplicate copies). Write 3 fresh starter posts from his real work. He edits them before launch.

## Content

- **Services (5), one page each, at `/services/<slug>`:** `ai-pentest-automation`, `web-application-penetration-testing`, `ai-agent-development`, `full-stack-development`, `cloud-devops`. Each page has: H1, a 2–3 sentence intro, "What you get" (4–6 deliverables), "How it works" (3–4 steps), "Who it's for", related project(s), related posts, a short FAQ (3–4 Qs), and a CTA to Contact. No pricing.
- **Blog posts (3), written as Fahad, first person, plain and specific, 900–1400 words each:**
  1. How an autonomous pentest agent decides what to attack next (evidence-bound reasoning loops, explained in general terms with LangGraph-style pseudocode, no Nua internals).
  2. Broken object-level authorization: how to find it and fix it (practical, with request examples and a fix in Django and Express).
  3. From full-stack developer to offensive security engineer (his path, from the CV timeline).
  Frontmatter: title, description, date, tags, and draft flag (false).
- **Contact page:** headline, email button (mailto) with copy-to-clipboard, LinkedIn `linkedin.com/in/muhammad-fahad-murtaza`, GitHub `github.com/VendattaRG`, "Islamabad, PK · UTC+5 · open to remote", and a short "what to include in your message" list.

## SEO (must have)

- Next.js Metadata API on every page: unique title (`%s | Muhammad Fahad Murtaza`), description, canonical (`metadataBase` = the domain), Open Graph and Twitter tags.
- Generated OG images (`next/og`) per page type, in the Night shift style with the photo on home.
- JSON-LD: `Person` and `WebSite` on home, `ProfilePage` for home; `Service` on service pages; `BlogPosting` on posts; `BreadcrumbList` on inner pages.
- `sitemap.xml`, `robots.txt`, `/llms.txt` (plain-text summary of who he is, services and posts with URLs).
- One H1 per page, semantic sections, descriptive slugs, alt text, internal links (services ↔ posts ↔ projects).

## Constraints

- Mobile first. Every section must work at 360px. Mobile nav is a menu button with a full-screen panel.
- Motion is subtle (reveal on scroll, hover states) and is turned off under `prefers-reduced-motion`.
- Text contrast meets WCAG AA. Coral on dark measures 6.3:1. *(Builder's call)* dim `#6E6F78` fails AA for small text (3.9:1), so it is used only for borders and large text. Small dim text uses `#8A8B94` (5.7:1).
- *(Builder's call)* 301 redirects from the old site's URLs (`/work`, `/work/:slug`, `/blog/new-milestone-in-my-career-:n`) to `/#work` and `/blog`.
- Deploys on Vercel as it is today.

## Left to the builder

- Stack: fresh Next.js (latest stable, App Router, TypeScript) replacing the old template in place on the `redesign` branch. Plain CSS (global tokens plus CSS Modules), no UI kit. Fonts via `next/font/google`. MDX posts in `content/blog/*.mdx` rendered at build time with code highlighting. Service content lives in a typed data file.
- Delete all old template code and assets (Once UI, `src/`, old `public/images`, old posts, and the template's CC BY-SA `LICENSE`). Git history keeps them.
- Exact mobile layouts, the 404 page, favicon (a coral dot "f."), and the wording of service pages and the about copy, within the facts in the CV.
