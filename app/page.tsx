import Image from 'next/image'
import Link from 'next/link'
import ContactBlock from '@/components/ContactBlock'
import PostList from '@/components/PostList'
import SectionHead from '@/components/SectionHead'
import WorkShowcase from '@/components/WorkShowcase'
import { AWARDS, COMPANIES, EDUCATION, EXPERIENCE, PROJECTS, SKILLS, STATS } from '@/lib/data'
import { getAllPosts } from '@/lib/posts'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'
import s from './page.module.css'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)
  const now = EXPERIENCE[0]

  return (
    <>
      {/* HERO */}
      <section className={`wrap ${s.hero}`} aria-labelledby="hero-name">
        <div className={s.heroText}>
          <ul className={s.roles} aria-label="Roles">
            {SITE.roles.map((r, i) => (
              <li key={r}>
                {i === 0 && <i aria-hidden="true" />}
                {r}
              </li>
            ))}
          </ul>
          <h1 id="hero-name" className={s.name}>
            <span>Muhammad</span> Fahad Murtaza
          </h1>
          <p className={s.tag}>
            An attacker&apos;s mindset with a builder&apos;s hands. I work across <em>offensive security</em>, AI and
            full-stack engineering.
          </p>
          <div className={s.btns}>
            <Link href="/contact" className="btn btn-paper">
              Hire me <span className="arrow">→</span>
            </Link>
            <Link href="/#work" className="btn btn-ghost">
              See my work
            </Link>
          </div>
        </div>
        <div className={s.pic}>
          <div className={s.card}>
            <Image
              src="/images/fahad.jpg"
              alt="Portrait of Muhammad Fahad Murtaza"
              fill
              priority
              sizes="(max-width: 760px) 92vw, 40vw"
            />
          </div>
          <div className={s.now}>
            <small>
              <i aria-hidden="true" />
              Currently
            </small>
            <b>{now.role}</b>
            <span>
              {now.company} · {now.location.replace(', SA', '')} (remote)
            </span>
          </div>
        </div>
      </section>

      <div className={s.strip}>
        <div className={`wrap ${s.stripIn}`}>
          <span>Previously shipped at</span>
          <ul>
            {COMPANIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className={`wrap ${s.sec}`} aria-labelledby="about-h">
        <div className={s.about}>
          <span className="kicker reveal">
            <b>01</b>About
          </span>
          <div className={s.aboutTxt}>
            <h2 id="about-h" className={`${s.aboutLead} reveal`}>
              Six years of shipping production software, <em>now pointed at offense.</em>
            </h2>
            <p className="reveal">
              I started as a frontend developer in Lahore and spent five years building full-stack products: payments,
              healthcare data, real-time systems and the cloud underneath them. Along the way I finished a BS in Cyber
              Security and moved to the other side of the table.
            </p>
            <p className="reveal">
              Today I build autonomous agents that plan and run penetration tests on their own. I still write the APIs,
              the frontends and the infrastructure around them, which is why the agents actually ship.
            </p>
            <dl className={`${s.stats} reveal`}>
              {STATS.map((st) => (
                <div key={st.label}>
                  <dt>
                    {st.value}
                    {st.sup && <sup>{st.sup}</sup>}
                  </dt>
                  <dd>{st.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`wrap ${s.sec}`} aria-labelledby="services-h">
        <SectionHead id="services-h" n="02" label="Services" title="What I can do for you." muted="Each one has its own page." />
        <ul className={s.svc}>
          {SERVICES.map((sv, i) => (
            <li key={sv.slug} className="reveal">
              <Link href={`/services/${sv.slug}`} className={s.svcCard}>
                <span className={s.svcN}>
                  0{i + 1}
                  <i aria-hidden="true">↗</i>
                </span>
                <h3>{sv.title}</h3>
                <p>{sv.cardText}</p>
                <span className="chips">
                  {sv.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
          <li className="reveal">
            <Link href="/contact" className={`${s.svcCard} ${s.svcAll}`}>
              <h3>Not sure which one you need?</h3>
              <p>Tell me the problem. I&apos;ll tell you honestly whether I&apos;m the right person for it.</p>
              <span className={s.lk}>
                Start a conversation <span className="arrow">→</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* WORK */}
      <section id="work" className={`wrap ${s.sec}`} aria-labelledby="work-h">
        <SectionHead
          id="work-h"
          n="03"
          label="Selected work"
          title="Things I've built."
          muted="Some break software, some run businesses."
        />
        <div className="reveal">
          <WorkShowcase projects={PROJECTS} />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`wrap ${s.sec}`} aria-labelledby="exp-h">
        <SectionHead id="exp-h" n="04" label="Experience" title="Where I've worked." muted="Five teams, two promotions." />
        <ol className={s.exp}>
          {EXPERIENCE.map((e) => (
            <li key={e.from} className="reveal">
              <span className={s.d} data-now={e.current}>
                {e.from} — {e.to}
              </span>
              <div>
                <h3>{e.role}</h3>
                <span className={s.co}>
                  {e.company}
                  {e.note && <i> · {e.note}</i>}
                </span>
              </div>
              <p>{e.summary}</p>
              <span className={s.loc}>{e.location}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className={`wrap ${s.sec}`} aria-labelledby="kit-h">
        <SectionHead id="kit-h" n="05" label="Toolkit" title="What I work with." />
        <div className={`${s.kit} reveal`}>
          {SKILLS.map((g) => (
            <div key={g.group}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={s.edu}>
          <div className="reveal">
            <small>Education</small>
            <h3>{EDUCATION.degree}</h3>
            <p>
              {EDUCATION.school} · {EDUCATION.years}
            </p>
          </div>
          {AWARDS.map((a) => (
            <div key={a.title} className={`${s.win} reveal`}>
              <small>Award · {a.year}</small>
              <h3>{a.title}</h3>
              <p>{a.org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" className={`wrap ${s.sec}`} aria-labelledby="writing-h">
        <SectionHead
          id="writing-h"
          n="06"
          label="Writing"
          title="Notes from the field."
          muted="What I learn breaking and building."
        />
        <PostList posts={posts} />
        <p className={s.all}>
          <Link href="/blog">
            All posts <span className="arrow">→</span>
          </Link>
        </p>
      </section>

      <ContactBlock />
    </>
  )
}
