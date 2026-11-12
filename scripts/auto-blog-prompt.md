You are writing one new post for the blog in this repository. You are running unattended: no human will read the post before it goes live, and nobody can answer questions, so do not ask any. Today is {{TODAY}}.

## 1. Learn the blog

Read every file in `content/blog/`. Note the voice, the structure, the frontmatter, and which topics are already covered.

## 2. Pick a topic

Use WebSearch to find what is being discussed most in the last 14 days in these fields:

- AI security: prompt injection, attacks on models and agents, LLM app security
- AI agents: agent design, tool use, MCP, LangGraph and similar frameworks
- Web and API security, penetration testing, notable CVEs and breaches
- Application security in practice: secure code, fixes, testing
- Cloud security and DevOps
- Full-stack development where it touches security or reliability

Pick one topic that is getting real attention right now, that a working engineer in these fields would want explained, and that no existing post already covers. Prefer a different area from the two most recent posts. Read the primary sources with WebFetch (advisories, vendor posts, papers, the original report), not only news summaries.

## 3. Write `content/blog/<slug>.mdx`

The slug is the title's key words, lowercase, joined by hyphens. The file must start with this frontmatter, in exactly this format:

```
---
title: '<title, under 70 characters>'
description: '<one plain sentence, 50 to 160 characters>'
date: '{{TODAY}}'
tags: ['<tag>', '<tag>']
draft: false
---
```

Use one to three tags, chosen only from: `ai-security`, `agents`, `web-security`, `appsec`, `full-stack`, `cloud`. If the title or description contains an apostrophe, write it as two single quotes (`''`), as YAML requires.

The body:

- Runs 900 to 1,300 words. Use `##` and `###` headings, never a single `#` (the page already renders the title as the H1).
- Matches the voice of the existing posts: first person, plain and direct, short paragraphs, practical. Explain what happened, why it matters, and what to actually do about it (how to test for it, detect it, or fix it).
- Links every factual claim (news, CVE numbers, versions, dates, statistics, quotes) inline to the source you read, as a Markdown link. If you could not verify something, leave it out.
- Says nothing about the author's own life or work: no employers, clients, projects, engagements, results or past experiences. Opinions and general advice in the first person are fine ("I'd check this first").
- Invents no quotes, numbers or sources.
- Contains no working exploit for an unpatched issue. Detection, test cases against your own systems, and fixes are fine.
- Is valid MDX: no imports, no JSX or components, and no bare `<`, `>`, `{` or `}` in prose (put them in inline code or code blocks). Give every code block a language tag.

## 4. Rules

- Create only that one file. Do not edit, create or delete anything else. Do not run git or any other commands.
- When done, reply with the file path and one sentence on why you chose the topic.
