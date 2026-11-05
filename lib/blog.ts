// Browser-safe blog helpers (no fs), shared by server pages and the client-side search.

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  tags: string[]
  minutes: number
}

const TAG_LABEL: Record<string, string> = {
  'ai-security': 'AI security',
  agents: 'Agents',
  'web-security': 'Web security',
  appsec: 'AppSec',
  career: 'Career',
  'full-stack': 'Full stack',
  cloud: 'Cloud',
}

export const tagLabel = (t: string) => TAG_LABEL[t] ?? t

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Every word of the query must appear in the title, description or a topic. */
export function filterPosts<T extends PostMeta>(posts: T[], query: string, topic: string | null): T[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const known = topic !== null && posts.some((p) => p.tags.includes(topic))
  return posts.filter((p) => {
    if (known && !p.tags.includes(topic)) return false
    const hay = [p.title, p.description, ...p.tags, ...p.tags.map(tagLabel)].join(' ').toLowerCase()
    return words.every((w) => hay.includes(w))
  })
}

export function topicCounts(posts: PostMeta[]) {
  const counts = new Map<string, number>()
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts]
    .map(([tag, count]) => ({ tag, label: tagLabel(tag), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}
