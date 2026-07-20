import { Info } from 'lucide-react'
import type { BlogBlock } from '@/lib/content/blog/_type'

/** Renders a blog post's structured block body as semantic HTML. */
export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-28 pt-6 font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
              >
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="pt-2 font-display text-xl font-bold text-gray-900">
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={i} className="text-lg leading-relaxed text-gray-700">
                {block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-relaxed text-gray-700">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-relaxed text-gray-700">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 font-display text-xs font-bold text-blue-600">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-stone-200/70">
                <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b border-stone-200/70 bg-stone-50/70">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-display text-sm font-bold text-gray-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-stone-200/60 last:border-0">
                        {row.map((cell, c) => (
                          <td key={c} className={`px-4 py-3 text-gray-600 ${c === 0 ? 'font-medium text-gray-800' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'callout':
            return (
              <div key={i} className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
                <Info className="mt-0.5 h-5 w-5 flex-none text-blue-500" />
                <p className="text-[15px] leading-relaxed text-gray-700">{block.text}</p>
              </div>
            )
          case 'quote':
            return (
              <blockquote key={i} className="border-l-4 border-orange-300 pl-5 text-lg italic leading-relaxed text-gray-600">
                {block.text}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
