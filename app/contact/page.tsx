import Link from 'next/link'
import CopyEmail from '@/components/CopyEmail'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'
import s from './contact.module.css'

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Muhammad Fahad Murtaza about remote roles in offensive and AI security engineering, or freelance security and software projects.',
  path: '/contact',
})

const INCLUDE = [
  "What you're building, or what's already running",
  "What's worrying you, or what's broken",
  'Your timeline, and whether this is a role or a project',
  'Links: your app, repo, job post or anything useful',
]

export default function ContactPage() {
  return (
    <section className={`wrap ${s.page}`} aria-labelledby="contact-h">
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <div className={s.main}>
        <span className="kicker">
          <b>●</b>Open to remote roles &amp; projects
        </span>
        <h1 id="contact-h" className="title">
          Let&apos;s talk.
        </h1>
        <p className="lead">
          The fastest way to reach me is email. Tell me a little about what you need, and I&apos;ll reply within a day.
        </p>

        <div className={s.mailBox}>
          <a href={`mailto:${SITE.email}`} className={s.mail}>
            {SITE.email}
          </a>
          <div className={s.mailActions}>
            <a href={`mailto:${SITE.email}?subject=Hello%20Fahad`} className="btn btn-ac">
              Write an email <span className="arrow">→</span>
            </a>
            <CopyEmail email={SITE.email} className="btn btn-ghost" />
          </div>
        </div>
      </div>

      <aside className={s.side}>
        <div className={s.card}>
          <h2 className={s.h}>Helpful to include</h2>
          <ul className={s.list}>
            {INCLUDE.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        <dl className={s.facts}>
          <div>
            <dt>Based in</dt>
            <dd>
              {SITE.city}, {SITE.country}
            </dd>
          </div>
          <div>
            <dt>Timezone</dt>
            <dd>{SITE.tz}, overlapping with Europe and the Gulf</dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className={s.links}>
              <a href={SITE.linkedin} rel="me noopener" target="_blank">
                LinkedIn ↗
              </a>
              <a href={SITE.github} rel="me noopener" target="_blank">
                GitHub ↗
              </a>
            </dd>
          </div>
          <div>
            <dt>Looking for</dt>
            <dd>
              Remote roles in offensive security and AI security engineering, and{' '}
              <Link href="/services">freelance projects</Link>.
            </dd>
          </div>
        </dl>
      </aside>
    </section>
  )
}
