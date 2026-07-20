'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RotateCcw } from 'lucide-react'

export default function Error({
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#FAFAF8] px-4 text-center font-sans text-gray-900 antialiased">
      <p className="font-display text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Something went wrong
      </p>
      <p className="max-w-sm text-sm text-stone-500">
        That&apos;s on us. Try again, or head back home — nothing on your end was lost.
      </p>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-soft transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}
