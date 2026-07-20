'use client'

import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { CALCULATOR_SPECS, type CalcOutput } from './calculator-specs'

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const num1 = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 })

function formatValue(value: number, format: CalcOutput['format']): string {
  const v = Number.isFinite(value) ? value : 0
  switch (format) {
    case 'inr':
      return `₹${inr.format(Math.round(v))}`
    case 'percent':
      return `${num1.format(v)}%`
    case 'hours':
      return `${inr.format(Math.round(v))} hrs`
    default:
      return inr.format(Math.round(v))
  }
}

/**
 * Generic, config-driven calculator. Reads its spec from CALCULATOR_SPECS by
 * slug, renders labelled inputs, and recomputes outputs live as you type. Pure
 * client-side — no data leaves the browser.
 */
export function CalculatorTool({ slug }: { slug: string }) {
  const spec = CALCULATOR_SPECS[slug]
  const [values, setValues] = useState<Record<string, number>>(() =>
    spec ? Object.fromEntries(spec.fields.map((f) => [f.key, f.default])) : {},
  )

  const outputs = useMemo(() => (spec ? spec.compute(values) : {}), [spec, values])

  if (!spec) return null

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Inputs */}
      <div className="rounded-3xl border border-stone-200/70 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
        <div className="space-y-5">
          {spec.fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-gray-800">{field.label}</span>
              </label>
              <div className="relative mt-2">
                {field.kind === 'select' ? (
                  <select
                    id={field.key}
                    value={values[field.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))}
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[15px] text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  >
                    {field.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    {field.prefix && (
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {field.prefix}
                      </span>
                    )}
                    <input
                      id={field.key}
                      type="number"
                      inputMode="decimal"
                      value={Number.isFinite(values[field.key]) ? values[field.key] : ''}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      onChange={(e) => setValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))}
                      className={`w-full rounded-xl border border-stone-200 bg-white py-3 text-[15px] text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                        field.prefix ? 'pl-8 pr-4' : 'px-4'
                      } ${field.suffix ? 'pr-14' : ''}`}
                    />
                    {field.suffix && (
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        {field.suffix}
                      </span>
                    )}
                  </>
                )}
              </div>
              {field.help && <p className="mt-1.5 text-xs leading-relaxed text-stone-400">{field.help}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Outputs */}
      <div className="flex flex-col gap-4">
        {spec.outputs.map((out) => {
          const primary = out.primary
          return (
            <div
              key={out.key}
              className={`rounded-2xl border p-5 shadow-soft ${
                primary
                  ? 'border-blue-200 bg-gradient-to-br from-orange-50 to-amber-50'
                  : 'border-stone-200/70 bg-white/70 backdrop-blur-sm'
              }`}
            >
              <p className="text-sm font-medium text-gray-500">{out.label}</p>
              <p
                className={`mt-1 font-display font-extrabold tracking-tight text-gray-900 ${
                  primary ? 'text-4xl' : 'text-2xl'
                }`}
              >
                {formatValue(outputs[out.key] ?? 0, out.format)}
              </p>
              {out.help && <p className="mt-1 text-xs text-stone-400">{out.help}</p>}
            </div>
          )
        })}
        {spec.note && (
          <p className="flex items-start gap-2 px-1 text-xs leading-relaxed text-stone-400">
            <Info className="mt-0.5 h-3.5 w-3.5 flex-none" />
            <span>{spec.note}</span>
          </p>
        )}
      </div>
    </div>
  )
}
