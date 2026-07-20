'use client'

import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'

/**
 * Copy / download controls for a block of template text. The text itself is
 * server-rendered next to this button (so it's indexable); this only adds the
 * copy-to-clipboard and download-as-.txt actions.
 */
export function CopyButton({ text, filename }: { text: string; filename: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the text is selectable below */
    }
  }

  const download = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Copied' : 'Copy template'}
      </button>
      <button
        type="button"
        onClick={download}
        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-stone-50"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </button>
    </div>
  )
}
