import JsonLd from '@/components/JsonLd'
import PostList from '@/components/PostList'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { getAllPosts } from '@/lib/posts'
import s from './blog.module.css'

export const metadata = pageMeta({
  title: 'Blog',
  description:
    'Long-form posts by Muhammad Fahad Murtaza on offensive security, autonomous AI agents, web application security and building software.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
      <header className={`wrap ${s.head}`}>
        <span className="kicker">
          <b>—</b>Writing
        </span>
        <h1 className="title">Notes from breaking and building software.</h1>
        <p className="lead">
          Long-form posts on offensive security, autonomous AI agents and the engineering around them. Practical, with
          code, and written for people who build things.
        </p>
      </header>
      <section className="wrap" aria-labelledby="all-posts">
        <h2 id="all-posts" className="sr-only">
          All posts
        </h2>
        <PostList posts={posts} withDescription />
      </section>
    </>
  )
}
