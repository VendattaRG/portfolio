import JsonLd from '@/components/JsonLd'
import BlogBrowser from '@/components/BlogBrowser'
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
      <div className="wrap">
        {/* only the listing fields go to the browser, not the post bodies */}
        <BlogBrowser posts={posts.map(({ slug, title, description, date, tags, minutes }) => ({ slug, title, description, date, tags, minutes }))} />
      </div>
    </>
  )
}
