'use client'

import { useMemo, useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { DOCGEN_SPECS } from './docgen-specs'

/**
 * Generic, config-driven document generator. Reads its spec from DOCGEN_SPECS by
 * slug, renders a form, and live-merges the values into a ready-to-copy text
 * document. Copy + download only — nothing leaves the browser.
 */
export function DocGeneratorTool({ slug }: { slug: string }) {
  const spec = DOCGEN_SPECS[slug]
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => (spec ? spec.render(values) : ''), [spec, values])

  if (!spec) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the text is selectable in the panel */
    }
  }

  const download = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <div className="rounded-3xl border border-stone-200/70 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
        <div className="space-y-4">
          {spec.fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="text-sm font-semibold text-gray-800">
                {field.label}
              </label>
              {field.kind === 'textarea' ? (
                <textarea
                  id={field.key}
                  rows={3}
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[15px] text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              ) : (
                <input
                  id={field.key}
                  type={field.kind === 'number' ? 'number' : field.kind === 'date' ? 'date' : 'text'}
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[15px] text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-stone-400">
            {spec.outputTitle}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-stone-50"
            >
              <Download className="h-3.5 w-3.5" />
              .txt
            </button>
          </div>
        </div>
        <pre className="mt-3 flex-1 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-stone-200/70 bg-stone-50/80 p-5 font-mono text-[13px] leading-relaxed text-gray-800">
          {output}
        </pre>
        {spec.note && <p className="mt-3 text-xs leading-relaxed text-stone-400">{spec.note}</p>}
      </div>
    </div>
  )
}
