import Link from 'next/link'
import ContactBlock from '@/components/ContactBlock'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { SERVICES } from '@/lib/services'
import s from './services.module.css'

export const metadata = pageMeta({
  title: 'Services',
  description:
    'Security, AI and full-stack services: AI pentest automation, web app penetration testing, AI agent development, full-stack and cloud work.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <header className={`wrap ${s.head}`}>
        <span className="kicker">
          <b>—</b>Services
        </span>
        <h1 className="title">Security, AI and full&#8209;stack services.</h1>
        <p className="lead">
          Five things I do well, for startups, security teams and product companies. Each one starts with a short call
          about what you need, and ends with something your team can run without me.
        </p>
      </header>

      <ol className={`wrap ${s.rows}`}>
        {SERVICES.map((sv, i) => (
          <li key={sv.slug} className="reveal">
            <Link href={`/services/${sv.slug}`} className={s.row}>
              <span className={s.n}>0{i + 1}</span>
              <h2 className={s.rt}>{sv.title}</h2>
              <span className={s.rd}>
                {sv.cardText}
                <span className="chips">
                  {sv.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </span>
              </span>
              <span className={s.ar} aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <ContactBlock title="Not sure which one you need? Ask me." />
    </>
  )
}
