import Link from 'next/link'
import { NAV, SITE } from '@/lib/site'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={`wrap ${s.foot}`}>
      <div className={s.brand}>
        <Link href="/" className={s.big} aria-label={`${SITE.short}, home`}>
          fahad<span>.</span>
        </Link>
        <p>Security researcher, AI engineer and full-stack developer, based in Islamabad.</p>
      </div>
      <div>
        <h2 className={s.h}>Pages</h2>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={s.h}>Elsewhere</h2>
        <ul>
          <li>
            <a href={SITE.github} rel="me noopener" target="_blank">
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={SITE.linkedin} rel="me noopener" target="_blank">
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`}>Email ↗</a>
          </li>
        </ul>
      </div>
      <div className={s.bot}>
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Built by hand in Islamabad</span>
      </div>
    </footer>
  )
}
