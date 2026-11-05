import { OG_SIZE, ogImage } from '@/lib/og'

export const alt = 'Muhammad Fahad Murtaza, AI Security Engineer and Full Stack Developer'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return ogImage({ kicker: 'AI Security Engineer · Open to remote', title: 'Muhammad Fahad Murtaza', withPhoto: true })
}
