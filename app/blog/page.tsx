import PostList from '@/components/PostList'
import { getAllPosts } from '@/lib/posts'
import s from './blog.module.css'

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <>
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
      <section className="wrap" aria-label="All posts">
        <PostList posts={posts} withDescription />
      </section>
    </>
  )
}
