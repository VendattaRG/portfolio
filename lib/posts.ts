import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { PostMeta } from './blog'

export { formatDate } from './blog'

export type Post = PostMeta & { draft: boolean; body: string }

const DIR = 'content/blog'

function read(dir: string, file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
  for (const field of ['title', 'description', 'date'] as const) {
    if (!data[field]) throw new Error(`${file}: missing ${field}`)
  }
  // gray-matter turns unquoted dates into Date objects; normalise both forms.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${file}: date must be YYYY-MM-DD, got "${date}"`)
  // the shape is right; make sure it's a real day (no month 13, no Feb 30)
  const real = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(real.getTime()) || real.toISOString().slice(0, 10) !== date)
    throw new Error(`${file}: date "${date}" is not a real calendar day`)
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: String(data.title),
    description: String(data.description),
    date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    minutes: Math.max(1, Math.round(words / 220)),
    body: content,
  }
}

export function getAllPosts(dir = DIR): Post[] {
  // Pages are static, so the bundler doesn't need to trace these reads.
  const abs = path.join(/* turbopackIgnore: true */ process.cwd(), dir)
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => read(abs, f))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string, dir = DIR): Post | undefined {
  return getAllPosts(dir).find((p) => p.slug === slug)
}
