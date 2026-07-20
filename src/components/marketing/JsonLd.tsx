/**
 * Renders a JSON-LD <script> for structured data. Server component — the JSON is
 * serialized at render time. `<` is escaped to prevent breaking out of the
 * script tag (XSS-safe for the static data we pass in).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
