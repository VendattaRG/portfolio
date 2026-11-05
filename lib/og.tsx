import fs from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE } from './site'

export const OG_SIZE = { width: 1200, height: 630 }

const C = { bg: '#0d0e12', ink: '#f2f1ea', mut: '#9a9ba3', line: '#2e2f38', ac: '#ff5c47' }

const read = (file: string) => fs.readFile(path.join(/* turbopackIgnore: true */ process.cwd(), file))

// Fonts ship in the repo (SIL OFL) so the build never depends on the network:
// on Vercel the Google Fonts download failed, the font list came out empty and rendering crashed.
async function fonts() {
  const [display, mono] = await Promise.all([
    read('assets/og/bricolage-grotesque-700.ttf'),
    read('assets/og/jetbrains-mono-500.ttf'),
  ])
  return [
    { name: 'Bricolage Grotesque', data: display, weight: 700 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ]
}

async function photo() {
  return `data:image/jpeg;base64,${(await read('public/images/fahad.jpg')).toString('base64')}`
}

type Card = { kicker: string; title: string; withPhoto?: boolean }

export async function ogImage({ kicker, title, withPhoto }: Card) {
  const footer = `${SITE.roles.join(' · ')}`
  const img = withPhoto ? await photo() : null
  const display = 'Bricolage Grotesque'
  const mono = 'JetBrains Mono'
  const big = title.length > 60 ? 62 : title.length > 34 ? 76 : 96

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: C.bg, color: C.ink, fontFamily: display }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '56px 64px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>
            fahad<span style={{ color: C.ac }}>.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{ display: 'flex', fontFamily: mono, fontSize: 22, color: C.ac, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 22 }}
            >
              {kicker}
            </div>
            <div style={{ display: 'flex', fontSize: big, fontWeight: 700, lineHeight: 1, letterSpacing: -big * 0.045, maxWidth: withPhoto ? 640 : 1000 }}>
              {title}
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 20, color: C.mut, borderTop: `1px solid ${C.line}`, paddingTop: 22 }}
          >
            <span>{footer}</span>
            {!withPhoto && <span>fahadmurtaza.me</span>}
          </div>
        </div>
        {img && (
          <div style={{ display: 'flex', width: 400, padding: '56px 56px 0 0', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', width: 344, height: 520, background: '#f7f7f7', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
              <img src={img} width={344} height={520} style={{ objectFit: 'cover', objectPosition: '50% 20%' }} alt="" />
            </div>
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  )
}
