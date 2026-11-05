'use client'

import { useEffect, useMemo, useState } from 'react'
import PostList from '@/components/PostList'
import { filterPosts, topicCounts, type PostMeta } from '@/lib/blog'
import s from './BlogBrowser.module.css'

// Search + topic filter. The server renders every post, so the full list is in the HTML;
// this only narrows it down in the browser. State lives in the URL (?q=&topic=) so it can be shared.
export default function BlogBrowser({ posts }: { posts: PostMeta[] }) {
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState<string | null>(null)
  const topics = useMemo(() => topicCounts(posts), [posts])
  const shown = filterPosts(posts, q, topic)

  // read a shared link once; the URL is only written when the visitor changes something
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setQ(p.get('q') ?? '')
    setTopic(p.get('topic'))
  }, [])

  function update(nextQ: string, nextTopic: string | null) {
    setQ(nextQ)
    setTopic(nextTopic)
    const p = new URLSearchParams()
    if (nextQ.trim()) p.set('q', nextQ.trim())
    if (nextTopic) p.set('topic', nextTopic)
    window.history.replaceState(null, '', p.toString() ? `?${p}` : window.location.pathname)
  }

  const active = topics.some((t) => t.tag === topic) ? topic : null
  const clear = () => update('', null)

  return (
    <div className={s.wrap}>
      <div className={s.search} role="search">
        <label htmlFor="post-search" className="sr-only">
          Search posts
        </label>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          id="post-search"
          type="search"
          value={q}
          onChange={(e) => update(e.target.value, active)}
          placeholder="Search by title, topic or keyword…"
          autoComplete="off"
        />
        {q && (
          <button type="button" className={s.x} onClick={() => update('', active)} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <div className={s.grid}>
        <aside className={s.side} aria-labelledby="topics-h">
          <h2 id="topics-h" className={s.sh}>
            Filter by topic
          </h2>
          <ul className={s.topics}>
            <li>
              <button type="button" aria-pressed={active === null} onClick={() => update(q, null)}>
                All posts <span>{posts.length}</span>
              </button>
            </li>
            {topics.map((t) => (
              <li key={t.tag}>
                <button
                  type="button"
                  aria-pressed={active === t.tag}
                  onClick={() => update(q, active === t.tag ? null : t.tag)}
                >
                  {t.label} <span>{t.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section aria-labelledby="results-h">
          <h2 id="results-h" className={s.count} aria-live="polite">
            {shown.length === posts.length
              ? `${posts.length} posts`
              : `${shown.length} of ${posts.length} posts`}
          </h2>
          {shown.length > 0 ? (
            <PostList posts={shown} withDescription withTags stacked />
          ) : (
            <div className={s.empty}>
              <p>
                Nothing matches{q.trim() && <> &ldquo;{q.trim()}&rdquo;</>}
                {active && <> in this topic</>}.
              </p>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
