'use client'

import { useEffect } from 'react'
import './globals.css'

// Only catches errors thrown by the root layout itself (fonts, JsonLd, etc.) —
// everything else is caught by error.tsx. Next.js requires this to render its
// own <html>/<body> since it replaces the root layout entirely when active.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#FAFAF8] px-4 text-center text-gray-900 antialiased">
          <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Something went wrong
          </p>
          <p className="max-w-sm text-sm text-stone-500">
            That&apos;s on us. Please try reloading the page.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-95"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
