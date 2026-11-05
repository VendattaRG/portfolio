import Link from 'next/link'
import { formatDate, type Post } from '@/lib/posts'
import s from './PostList.module.css'

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

export default function PostList({ posts, withDescription = false }: { posts: Post[]; withDescription?: boolean }) {
  return (
    <ul className={s.list}>
      {posts.map((p) => (
        <li key={p.slug} className="reveal">
          <Link href={`/blog/${p.slug}`} className={s.row}>
            <span className={s.meta}>
              <b>{tagLabel(p.tags[0] ?? 'notes')}</b>
              <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min
            </span>
            <span className={s.main}>
              <h3 className={s.t}>{p.title}</h3>
              {withDescription && <span className={s.d}>{p.description}</span>}
            </span>
            <span className={s.ar} aria-hidden="true">
              ↗
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
