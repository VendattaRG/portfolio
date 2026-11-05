import type { Metadata } from 'next'
import { AWARDS, EDUCATION, EXPERIENCE } from './data'
import type { Post } from './posts'
import type { Service } from './services'
import { SITE } from './site'

export const abs = (path: string) => (path === '/' ? SITE.url : `${SITE.url}${path}`)

const PERSON_ID = abs('/#person')

type MetaInput = {
  title: string
  description: string
  path: string
  /** use the title as-is, without the "| Muhammad Fahad Murtaza" suffix */
  absoluteTitle?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
  /** path of this page's own share image; defaults to the site-wide one */
  image?: string
}

export function pageMeta(input: MetaInput): Metadata {
  const { title, description, path, absoluteTitle, type = 'website', publishedTime, tags, image = '/opengraph-image' } = input
  const url = abs(path)
  // Page-level openGraph replaces the parent's (and wins over opengraph-image files), so name the image explicitly.
  const images = [{ url: abs(image), width: 1200, height: 630, alt: title }]
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_US',
      type,
      images,
      ...(type === 'article' && { publishedTime, authors: [SITE.url], tags }),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export function personLd() {
  const now = EXPERIENCE.find((e) => e.current)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    alternateName: SITE.short,
    url: SITE.url,
    image: abs('/images/fahad.jpg'),
    email: `mailto:${SITE.email}`,
    jobTitle: 'AI Security Engineer',
    description: SITE.description,
    worksFor: now && { '@type': 'Organization', name: now.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Air University', address: 'Islamabad, Pakistan' },
    hasCredential: { '@type': 'EducationalOccupationalCredential', name: EDUCATION.degree, credentialCategory: 'degree' },
    award: AWARDS.map((a) => `${a.title} (${a.year})`),
    address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: 'PK' },
    knowsAbout: [
      'Penetration testing',
      'Offensive security',
      'Web application security',
      'AI agents',
      'LangGraph',
      'LangChain',
      'Full-stack development',
      'Next.js',
      'Django',
      'AWS',
      'GCP',
      'Kubernetes',
    ],
    sameAs: [SITE.github, SITE.linkedin],
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  }
}

export function profilePageLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': abs('/#profile'),
    url: SITE.url,
    name: `${SITE.name} · AI Security Engineer & Full Stack Developer`,
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': abs('/#website') },
  }
}

export function serviceLd(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.metaTitle,
    serviceType: s.title,
    description: s.metaDescription,
    url: abs(`/services/${s.slug}`),
    provider: { '@id': PERSON_ID, '@type': 'Person', name: SITE.name, url: SITE.url },
    areaServed: 'Worldwide',
  }
}

export function blogPostingLd(p: Post) {
  const url = abs(`/blog/${p.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    url,
    mainEntityOfPage: url,
    image: abs(`/blog/${p.slug}/opengraph-image`),
    keywords: p.tags.join(', '),
    inLanguage: 'en',
    author: { '@type': 'Person', '@id': PERSON_ID, name: SITE.name, url: SITE.url },
    publisher: { '@id': PERSON_ID },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

// Escape "<" so a value can never close the surrounding <script> tag.
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
