import Link from 'next/link'
import { formatDate, tagLabel, type PostMeta } from '@/lib/blog'
import s from './PostList.module.css'

/** `stacked` puts the date line above the title, for narrow columns */
type Props = { posts: PostMeta[]; withDescription?: boolean; withTags?: boolean; stacked?: boolean }

export default function PostList({ posts, withDescription = false, withTags = false, stacked = false }: Props) {
  return (
    <ul className={s.list}>
      {posts.map((p) => (
        <li key={p.slug} className="reveal">
          <Link href={`/blog/${p.slug}`} className={stacked ? `${s.row} ${s.stacked}` : s.row}>
            <span className={s.meta}>
              <b>{tagLabel(p.tags[0] ?? 'notes')}</b>
              <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min
            </span>
            <span className={s.main}>
              <h3 className={s.t}>{p.title}</h3>
              {withDescription && <span className={s.d}>{p.description}</span>}
              {withTags && (
                <span className="chips">
                  {p.tags.map((t) => (
                    <span key={t} className="chip">
                      {tagLabel(t)}
                    </span>
                  ))}
                </span>
              )}
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
