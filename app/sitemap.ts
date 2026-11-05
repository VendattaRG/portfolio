import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { abs } from '@/lib/seo'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latest = posts[0]?.date
  return [
    { url: abs('/'), lastModified: latest, changeFrequency: 'monthly', priority: 1 },
    { url: abs('/services'), changeFrequency: 'monthly', priority: 0.9 },
    ...SERVICES.map((s) => ({ url: abs(`/services/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: abs('/blog'), lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map((p) => ({ url: abs(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: 'yearly' as const, priority: 0.7 })),
    { url: abs('/contact'), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
