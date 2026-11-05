import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import CopyButton from '@/components/CopyButton'
import JsonLd from '@/components/JsonLd'
import { tagLabel } from '@/lib/blog'
import { formatDate, getAllPosts, getPost } from '@/lib/posts'
import { abs, blogPostingLd, breadcrumbLd, pageMeta } from '@/lib/seo'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'
import { getToc } from '@/lib/toc'
import s from '../blog.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
    image: `/blog/${post.slug}/opengraph-image`,
  })
}

const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false }]],
  },
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const posts = getAllPosts()
  const i = posts.findIndex((p) => p.slug === slug)
  if (i === -1) notFound()

  const post = posts[i]
  const newer = posts[i - 1]
  const older = posts[i + 1]
  const service = SERVICES.find((sv) => sv.postTags.some((t) => post.tags.includes(t)))
  const toc = getToc(post.body)
  const url = abs(`/blog/${post.slug}`)
  const share = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
  ]

  const shareAndService = (
    <>
      {service && (
        <Link href={`/services/${service.slug}`} className={s.svc}>
          <span className={s.rh}>Related service</span>
          <span className={s.svcT}>
            {service.title} <span className="arrow">→</span>
          </span>
        </Link>
      )}
      <div>
        <p className={s.rh}>Share this post</p>
        <p className={s.share}>
          {share.map((sh) => (
            <a key={sh.label} href={sh.href} target="_blank" rel="noopener">
              {sh.label} ↗
            </a>
          ))}
          <CopyButton text={url} label="Copy link" className={s.copy} />
        </p>
      </div>
    </>
  )

  return (
    <article>
      <JsonLd
        data={[
          blogPostingLd(post),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <header className={`wrap ${s.head} ${s.postHead}`}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <p className={s.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.minutes} min read</span>
          <span>{tagLabel(post.tags[0] ?? 'notes')}</span>
        </p>
        <h1 className={s.ph}>{post.title}</h1>
        <p className="lead">{post.description}</p>
      </header>

      <div className={`wrap ${s.layout}`}>
        <aside className={s.rail} aria-label="About this post">
          <div>
            <p className={s.rh}>Written by</p>
            <div className={s.who}>
              <div className={s.avatar}>
                <Image src="/images/fahad.jpg" alt="" width={52} height={52} />
              </div>
              <div>
                <Link href="/" className={s.name}>
                  {SITE.name}
                </Link>
                <p className={s.role}>Security Researcher · AI Engineer</p>
              </div>
            </div>
            <p className={s.links}>
              <a href={SITE.github} rel="me noopener" target="_blank">
                GitHub ↗
              </a>
              <a href={SITE.linkedin} rel="me noopener" target="_blank">
                LinkedIn ↗
              </a>
            </p>
          </div>

          <dl className={s.facts}>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{post.minutes} min</dd>
            </div>
          </dl>

          {toc.length > 0 && (
            <>
              <nav className={s.toc} aria-label="On this page">
                <p className={s.rh}>On this page</p>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <details className={s.tocMobile}>
                <summary>On this page</summary>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            </>
          )}

          <div>
            <p className={s.rh}>Topics</p>
            <p className={s.tags}>
              {post.tags.map((t) => (
                <Link key={t} href={`/blog?topic=${t}`} className="chip">
                  {tagLabel(t)}
                </Link>
              ))}
            </p>
          </div>

          <div className={s.desktopOnly}>{shareAndService}</div>
        </aside>

        <div className={s.main}>
          <div className={s.prose}>
            <MDXRemote source={post.body} options={options} />
          </div>

          <div className={s.mobileOnly}>{shareAndService}</div>

          <nav className={s.pn} aria-label="More posts">
            {newer ? (
              <Link href={`/blog/${newer.slug}`} rel="prev">
                <small>← Newer</small>
                {newer.title}
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link href={`/blog/${older.slug}`} rel="next" className={s.older}>
                <small>Older →</small>
                {older.title}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  )
}
