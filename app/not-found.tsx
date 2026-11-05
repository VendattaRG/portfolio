import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: 'clamp(48px, 8vw, 120px)', paddingBottom: 40 }}>
      <span className="kicker">
        <b>404</b>Not found
      </span>
      <h1 className="title" style={{ margin: '18px 0 24px' }}>
        Nothing here.
      </h1>
      <p className="lead">
        This page doesn&apos;t exist, or it moved when the site was rebuilt. Try one of these instead.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
        <Link href="/" className="btn btn-paper">
          Go home <span className="arrow">→</span>
        </Link>
        <Link href="/services" className="btn btn-ghost">
          Services
        </Link>
        <Link href="/blog" className="btn btn-ghost">
          Blog
        </Link>
      </div>
    </section>
  )
}
