'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'

export type PostSummary = {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  tags: string[]
  minutes: number
}

/**
 * Client-side search + category filter over the blog. The full list is rendered
 * on the server (so it's indexable); this filters it in place. On mount it reads
 * an initial ?q= from the URL, which is the target of the sitelinks SearchAction.
 */
export function BlogList({
  posts,
  categories,
}: {
  posts: PostSummary[]
  categories: { name: string; slug: string }[]
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string>('all')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) setQuery(q)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      const inCategory = active === 'all' || p.categorySlug === active
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return inCategory && inQuery
    })
  }, [posts, query, active])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive('all')}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active === 'all' ? 'bg-gray-900 text-white' : 'border border-stone-200 bg-white text-gray-600 hover:text-blue-600'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === c.slug ? 'bg-gray-900 text-white' : 'border border-stone-200 bg-white text-gray-600 hover:text-blue-600'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-stone-200/70 bg-white/60 p-5 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft-lg"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-500">{p.category}</span>
            <span className="mt-2 flex items-start justify-between gap-2">
              <span className="font-display text-base font-bold leading-snug text-gray-900">{p.title}</span>
              <ArrowUpRight className="h-4 w-4 flex-none text-gray-300 transition-colors group-hover:text-blue-500" />
            </span>
            <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{p.description}</span>
            <span className="mt-3 text-xs text-stone-400">{p.minutes} min read</span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No articles match your search yet.</p>
      )}
    </div>
  )
}
