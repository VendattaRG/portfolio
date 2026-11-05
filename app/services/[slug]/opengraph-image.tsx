import { OG_SIZE, ogImage } from '@/lib/og'
import { SERVICES, getService } from '@/lib/services'

export const alt = 'A service offered by Muhammad Fahad Murtaza'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const sv = getService((await params).slug)
  return ogImage({ kicker: 'Service', title: sv?.title ?? 'Services' })
}
