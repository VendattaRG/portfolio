import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ContactBlock from '@/components/ContactBlock'
import JsonLd from '@/components/JsonLd'
import PostList from '@/components/PostList'
import { PROJECTS } from '@/lib/data'
import { getAllPosts } from '@/lib/posts'
import { breadcrumbLd, pageMeta, serviceLd } from '@/lib/seo'
import { SERVICES, getService } from '@/lib/services'
import s from '../services.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((sv) => ({ slug: sv.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sv = getService((await params).slug)
  if (!sv) return {}
  return pageMeta({
    title: sv.metaTitle,
    description: sv.metaDescription,
    path: `/services/${sv.slug}`,
    image: `/services/${sv.slug}/opengraph-image`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const sv = getService(slug)
  if (!sv) notFound()

  const n = SERVICES.indexOf(sv) + 1
  const projects = PROJECTS.filter((p) => sv.projects.includes(p.key))
  const posts = getAllPosts().filter((p) => p.tags.some((t) => sv.postTags.includes(t)))
  const others = SERVICES.filter((o) => o.slug !== sv.slug)

  return (
    <>
      <JsonLd
        data={[
          serviceLd(sv),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: sv.title, path: `/services/${sv.slug}` },
          ]),
        ]}
      />
      <header className={`wrap ${s.head}`}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li aria-current="page">{sv.title}</li>
          </ol>
        </nav>
        <span className="kicker">
          <b>0{n}</b>Service
        </span>
        <h1 className="title">{sv.title}</h1>
        <p className="lead">{sv.intro}</p>
        <div className={s.ctas}>
          <Link href="/contact" className="btn btn-ac">
            Talk about your project <span className="arrow">→</span>
          </Link>
          <Link href="/services" className="btn btn-ghost">
            All services
          </Link>
        </div>
      </header>

      <section className={`wrap ${s.block}`} aria-labelledby="get">
        <h2 id="get" className={s.bh}>
          What you get
        </h2>
        <ul className={s.get}>
          {sv.deliverables.map((d) => (
            <li key={d} className="reveal">
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className={`wrap ${s.block}`} aria-labelledby="how">
        <h2 id="how" className={s.bh}>
          How it works
        </h2>
        <ol className={s.steps}>
          {sv.steps.map((st, i) => (
            <li key={st.title} className="reveal">
              <span className={s.sn}>0{i + 1}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`wrap ${s.block}`} aria-labelledby="who">
        <h2 id="who" className={s.bh}>
          Who it&apos;s for
        </h2>
        <ul className={s.who}>
          {sv.audience.map((a) => (
            <li key={a} className="reveal">
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className={`wrap ${s.block}`} aria-labelledby="proof">
        <h2 id="proof" className={s.bh}>
          Related work
        </h2>
        <ul className={s.proj}>
          {projects.map((p) => (
            <li key={p.key} className="reveal">
              <Link href="/#work" className={s.pc}>
                <small>{p.badge}</small>
                <h3>{p.name}</h3>
                <p>{p.sub}</p>
                <span className="chips">
                  {p.chips.slice(0, 4).map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {posts.length > 0 && (
        <section className={`wrap ${s.block}`} aria-labelledby="reading">
          <h2 id="reading" className={s.bh}>
            Further reading
          </h2>
          <div>
            <PostList posts={posts} />
          </div>
        </section>
      )}

      <section className={`wrap ${s.block}`} aria-labelledby="faq">
        <h2 id="faq" className={s.bh}>
          Questions
        </h2>
        <div className={s.faq}>
          {sv.faq.map((f) => (
            <details key={f.q} className="reveal">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* lower-case the first letter, except for "AI ..." */}
      <ContactBlock title={`Need ${sv.title.replace(/^(?!AI)./, (c) => c.toLowerCase())}? Let's talk.`} />

      <nav className={`wrap ${s.others}`} aria-label="Other services">
        <span className="kicker">Other services</span>
        <ul>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`}>
                {o.title} <span className="arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
