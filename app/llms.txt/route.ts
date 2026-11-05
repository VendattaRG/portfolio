import { EXPERIENCE, PROJECTS } from '@/lib/data'
import { getAllPosts } from '@/lib/posts'
import { abs } from '@/lib/seo'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

// A plain-text summary of the site for AI assistants and crawlers (llmstxt.org).
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.roles.join(' · ')}. Based in ${SITE.city}, ${SITE.country} (${SITE.tz}). Contact: ${SITE.email}`,
    '',
    '## Pages',
    `- [Home](${abs('/')}): who I am, experience, projects, skills, education and awards`,
    `- [Services](${abs('/services')}): what I offer`,
    `- [Blog](${abs('/blog')}): long-form posts`,
    `- [Contact](${abs('/contact')}): how to reach me`,
    '',
    '## Services',
    ...SERVICES.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.metaDescription}`),
    '',
    '## Posts',
    ...getAllPosts().map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}) (${p.date}): ${p.description}`),
    '',
    '## Experience',
    ...EXPERIENCE.map((e) => `- ${e.role}, ${e.company} (${e.from} – ${e.to}), ${e.location}: ${e.summary}`),
    '',
    '## Projects',
    ...PROJECTS.map((p) => `- ${p.name}: ${p.sub} ${p.bullets[0]}.`),
    '',
    '## Elsewhere',
    `- GitHub: ${SITE.github}`,
    `- LinkedIn: ${SITE.linkedin}`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
