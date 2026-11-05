import fs from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { SITE } from './site'

export const OG_SIZE = { width: 1200, height: 630 }

const C = { bg: '#0d0e12', ink: '#f2f1ea', mut: '#9a9ba3', line: '#2e2f38', ac: '#ff5c47' }

// Fetch a Google font as TTF for the given text only (satori can't read woff2).
// Falls back to the built-in font if the network is unavailable at build time.
async function font(family: string, weight: 500 | 700, text: string) {
  try {
    const q = `family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${q}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return { name: family, data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' as const }
  } catch {
    return null
  }
}

async function photo() {
  const buf = await fs.readFile(path.join(/* turbopackIgnore: true */ process.cwd(), 'public/images/fahad.jpg'))
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

type Card = { kicker: string; title: string; withPhoto?: boolean }

export async function ogImage({ kicker, title, withPhoto }: Card) {
  const footer = `${SITE.roles.join(' · ')}`
  const text = `fahad.${kicker}${title}${footer}fahadmurtaza.me`
  const fonts = (await Promise.all([font('Bricolage Grotesque', 700, text), font('JetBrains Mono', 500, text)])).filter(
    (f): f is NonNullable<typeof f> => f !== null,
  )
  const img = withPhoto ? await photo() : null
  const display = fonts.some((f) => f.name === 'Bricolage Grotesque') ? 'Bricolage Grotesque' : undefined
  const mono = fonts.some((f) => f.name === 'JetBrains Mono') ? 'JetBrains Mono' : undefined
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
    { ...OG_SIZE, fonts },
  )
}
