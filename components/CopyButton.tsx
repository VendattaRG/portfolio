'use client'

import { useState } from 'react'

type Props = { text: string; label: string; className?: string }

export default function CopyButton({ text, label, className }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text is on screen anyway.
    }
  }

  return (
    <button type="button" className={className} onClick={copy}>
      <span aria-live="polite">{copied ? 'Copied ✓' : label}</span>
    </button>
  )
}
