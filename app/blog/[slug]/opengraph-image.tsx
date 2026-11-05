import { OG_SIZE, ogImage } from '@/lib/og'
import { getAllPosts, getPost } from '@/lib/posts'

export const alt = 'A blog post by Muhammad Fahad Murtaza'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  return ogImage({ kicker: 'Blog', title: post?.title ?? 'Blog' })
}
