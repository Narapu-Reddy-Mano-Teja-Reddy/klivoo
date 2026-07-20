/**
 * Readable long-form text container for legal/policy pages. Applies consistent
 * typography to headings, paragraphs, lists, and links without needing the
 * Tailwind typography plugin.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        mx-auto max-w-3xl px-4 sm:px-6 lg:px-8
        [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-gray-900
        [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900
        [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-gray-600
        [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-gray-600
        [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-gray-600
        [&_li]:leading-relaxed
        [&_a]:font-medium [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-700
        [&_strong]:font-semibold [&_strong]:text-gray-900
        [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-800
        [&_.table-wrap]:mt-6 [&_.table-wrap]:overflow-x-auto [&_.table-wrap]:rounded-xl [&_.table-wrap]:border [&_.table-wrap]:border-gray-200
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm
        [&_thead]:bg-gray-50
        [&_th]:border-b [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:align-top
        [&_td]:border-b [&_td]:border-gray-100 [&_td]:px-4 [&_td]:py-3 [&_td]:text-gray-600 [&_td]:align-top
        [&_tbody_tr:last-child_td]:border-b-0
      "
    >
      {children}
    </div>
  )
}
