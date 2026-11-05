'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// One observer for the whole page: anything with `.reveal` fades in once it scrolls into view.
// Content is visible without JS; globals.css only hides it under `html.js`.
export default function Reveal() {
  const path = usePathname()

  useEffect(() => {
    ;(window as Window & { __reveal?: boolean }).__reveal = true // tells the head script the app started
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))

    // content rendered later (e.g. posts coming back after a blog filter is cleared) must be watched too
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        for (const n of m.addedNodes) {
          if (!(n instanceof Element)) continue
          if (n.matches('.reveal:not(.in)')) io.observe(n)
          n.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
        }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [path])

  return null
}
