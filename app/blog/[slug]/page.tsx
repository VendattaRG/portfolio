import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import JsonLd from '@/components/JsonLd'
import { tagLabel } from '@/components/PostList'
import { formatDate, getAllPosts, getPost } from '@/lib/posts'
import { blogPostingLd, breadcrumbLd, pageMeta } from '@/lib/seo'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'
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
  mdxOptions: { rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false }]] },
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
          <span>{post.tags.map(tagLabel).join(' · ')}</span>
          <span>{post.minutes} min read</span>
        </p>
        <h1 className={s.ph}>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <p className={s.by}>
          By <Link href="/">{SITE.name}</Link>
        </p>
      </header>

      <div className={`wrap ${s.bodyWrap}`}>
        <div className={s.prose}>
          <MDXRemote source={post.body} options={options} />
        </div>

        <aside className={s.author} aria-label="About the author">
          <div className={s.avatar}>
            <Image src="/images/fahad.jpg" alt="" width={88} height={88} />
          </div>
          <div>
            <p className={s.an}>Written by {SITE.name}</p>
            <p className={s.ab}>
              Security researcher, AI engineer and full-stack developer in {SITE.city}. I build autonomous pentest agents
              and the software around them.
            </p>
            <p className={s.al}>
              <Link href="/">About me</Link>
              <a href={SITE.linkedin} rel="me noopener" target="_blank">
                LinkedIn ↗
              </a>
              <a href={SITE.github} rel="me noopener" target="_blank">
                GitHub ↗
              </a>
            </p>
          </div>
        </aside>

        {service && (
          <Link href={`/services/${service.slug}`} className={s.svc}>
            <span className="kicker">Related service</span>
            <span className={s.svcT}>
              {service.title} <span className="arrow">→</span>
            </span>
          </Link>
        )}

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
    </article>
  )
}
