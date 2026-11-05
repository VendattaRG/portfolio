'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/lib/data'
import s from './WorkShowcase.module.css'

// All panels stay in the HTML (good for search); only the active one is visible and focusable.
export default function WorkShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(projects[0].key)

  // links like /#project-dentasmart (from the service pages) open that project
  useEffect(() => {
    const key = window.location.hash.replace('#project-', '')
    if (projects.some((p) => p.key === key)) setActive(key as Project['key'])
  }, [projects])

  return (
    <div className={s.wrap}>
      <div className={s.stage}>
        {projects.map((p) => {
          const on = p.key === active
          return (
            <article
              key={p.key}
              id={`project-${p.key}`}
              className={s.feat}
              data-on={on}
              aria-hidden={!on}
              inert={!on}
            >
              <div className={s.l}>
                <span className={s.badge}>{p.badge}</span>
                <h3 className={s.name}>{p.name}</h3>
                <p className={s.sub}>{p.sub}</p>
                <ul className={s.bullets}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="chips">
                  {p.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className={s.r} role="figure" aria-label={`${p.name}, ${p.panelTag} ${p.panelTag === 'flow' ? 'diagram' : 'log'}`}>
                <div className={s.rh}>
                  <span>{p.panelTitle}</span>
                  <span>{p.panelTag}</span>
                </div>
                <ol className={s.lines}>
                  {p.lines.map((l, i) => (
                    <li key={i} data-tone={l.tone}>
                      <span className={s.k}>{l.k}</span>
                      <span>{l.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          )
        })}
      </div>

      <div className={s.pick} role="group" aria-label="Choose a project">
        {projects.map((p) => {
          const on = p.key === active
          const show = () => setActive(p.key)
          return (
            <button
              key={p.key}
              type="button"
              className={s.card}
              aria-pressed={on}
              aria-controls={`project-${p.key}`}
              onMouseEnter={show}
              onFocus={show}
              onClick={show}
            >
              <small>
                {p.cardLabel}
                <i aria-hidden="true">● viewing</i>
              </small>
              <span className={s.cn}>{p.name}</span>
              <span className={s.ct}>{p.cardText}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
