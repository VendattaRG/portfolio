import Link from 'next/link'
import { SITE } from '@/lib/site'
import s from './ContactBlock.module.css'

export default function ContactBlock({ title = 'Got something that needs breaking, or building?' }: { title?: string }) {
  return (
    <section className={`wrap ${s.outer}`} aria-labelledby="contact-cta">
      <div className={`${s.box} reveal`}>
        <div>
          <span className={s.k}>Open to remote roles &amp; projects</span>
          <h2 id="contact-cta" className={s.h}>
            {title}
          </h2>
        </div>
        <div className={s.r}>
          <p>
            Tell me what you&apos;re working on. I reply within a day, from {SITE.city} ({SITE.tz}).
          </p>
          <div className={s.actions}>
            <Link href="/contact" className={`btn ${s.b}`}>
              Let&apos;s talk <span className="arrow">→</span>
            </Link>
            <a href={`mailto:${SITE.email}`} className={s.m}>
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
