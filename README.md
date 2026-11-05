# fahadmurtaza.me

Personal site of Muhammad Fahad Murtaza: security researcher, AI engineer and full-stack developer.

Next.js (App Router), statically generated. No backend.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (lib/)
npm run build && npm start
npm run check:seo  # checks every page in the sitemap against a running server
```

## Where things live

- `lib/site.ts`: name, domain, email and social links
- `lib/data.ts`: experience, projects, skills, education and awards (from the CV)
- `lib/services.ts`: the five service pages
- `content/blog/*.mdx`: blog posts (frontmatter: `title`, `description`, `date` as YYYY-MM-DD, `tags`, `draft`)
- `public/images/fahad.jpg`: portrait

Add a post by dropping a new `.mdx` file in `content/blog/`. It shows up on the blog, the sitemap and `/llms.txt` on the next build.
