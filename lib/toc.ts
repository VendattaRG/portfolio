import GithubSlugger from 'github-slugger'

export type TocItem = { id: string; text: string }

/**
 * The post's `##` headings, with the same ids rehype-slug gives them when the MDX renders.
 * Headings inside fenced code blocks are skipped.
 */
export function getToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inCode = false
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inCode = !inCode
    if (inCode) continue
    const m = line.match(/^##\s+(.+?)\s*#*\s*$/)
    if (!m) continue
    // drop inline markdown so the text (and its slug) matches the rendered heading
    const text = m[1]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[`*_]/g, '')
      .trim()
    items.push({ id: slugger.slug(text), text })
  }
  return items
}
