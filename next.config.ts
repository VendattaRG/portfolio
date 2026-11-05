import type { NextConfig } from 'next'

const config: NextConfig = {
  // The old template's URLs, so any existing links and bookmarks land somewhere useful.
  async redirects() {
    return [
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/work/:slug', destination: '/#work', permanent: true },
      { source: '/blog/new-milestone-in-my-career-:n', destination: '/blog', permanent: true },
    ]
  },
}

export default config
