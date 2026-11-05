'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// One observer for the whole page: anything with `.reveal` fades in once it scrolls into view.
// Content is visible without JS; globals.css only hides it under `html.js`.
export default function Reveal() {
  const path = usePathname()

  useEffect(() => {
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
    return () => io.disconnect()
  }, [path])

  return null
}
