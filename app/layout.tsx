import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from 'next/font/google'
// Global styles first, so component CSS Modules can override the shared classes.
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/site'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-display', axes: ['opsz'], display: 'swap' })
const body = Figtree({ subsets: ['latin'], variable: '--f-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--f-mono', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · AI Security Engineer & Full Stack Developer`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = { themeColor: '#0d0e12', colorScheme: 'dark' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script adds the `js` class before paint, so React sees a different class list.
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
