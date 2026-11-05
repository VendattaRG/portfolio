'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '@/lib/site'
import s from './Nav.module.css'

function isActive(path: string, href: string) {
  return href === '/' ? path === '/' : path === href || path.startsWith(href + '/')
}

export default function Nav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={s.header}>
      <div className={`wrap ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label={`${SITE.short}, home`}>
          fahad<span>.</span>
        </Link>
        <nav aria-label="Main" className={s.links}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(path, n.href) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className={`btn btn-ac ${s.cta}`}>
          Let&apos;s talk
        </Link>
        <button
          type="button"
          className={s.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <i aria-hidden="true" data-open={open} />
        </button>
      </div>

      <div id="mobile-menu" className={s.panel} data-open={open} hidden={!open}>
        <nav aria-label="Mobile" className="wrap">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} aria-current={isActive(path, n.href) ? 'page' : undefined}>
              <span className="mono">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
          <a className={s.mail} href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </nav>
      </div>
    </header>
  )
}
