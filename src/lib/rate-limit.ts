/**
 * Sliding-window rate limiter backed by Supabase (table `rate_limit_log`).
 *
 * The previous implementation used a process-local Map, which resets on every
 * serverless cold start and is not shared across Vercel instances — so it could
 * never enforce a real per-IP quota. This version keeps the state in the
 * database, giving every instance a shared, durable view.
 *
 * On each call we prune rows for the key older than the window, count what
 * remains, and (if under the limit) insert a fresh row. This is not a
 * high-precision distributed quota, but it is correct for a SaaS at this scale
 * (hundreds of users) and self-cleans old rows on every call.
 *
 * Fails OPEN: if the database is unreachable, requests are allowed rather than
 * blocked — this is defense-in-depth, not an availability-critical gate.
 */

import { createAdminClient } from '@/lib/supabase-admin'

export interface RateLimitResult {
  /** Whether this request is allowed. */
  ok: boolean
  /** Requests remaining in the current window. */
  remaining: number
  /** Epoch ms at which the current window resets. */
  resetAt: number
}

/**
 * Record a hit for `key` and report whether it is within `limit` per `windowMs`.
 * Backed by the database, so this is async.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now()
  const resetAt = now + windowMs
  const cutoff = new Date(now - windowMs).toISOString()

  try {
    const admin = createAdminClient()

    // Drop entries that have aged out of the window for this key.
    await admin.from('rate_limit_log').delete().eq('key', key).lt('created_at', cutoff)

    // Count the hits still inside the window.
    const { count, error: countError } = await admin
      .from('rate_limit_log')
      .select('id', { count: 'exact', head: true })
      .eq('key', key)

    if (countError) throw countError

    const used = count ?? 0
    if (used >= limit) {
      return { ok: false, remaining: 0, resetAt }
    }

    // Under the limit: record this hit.
    const { error: insertError } = await admin.from('rate_limit_log').insert({ key })
    if (insertError) throw insertError

    return { ok: true, remaining: limit - used - 1, resetAt }
  } catch (err) {
    // Fail open — never block legitimate traffic because the store is down.
    console.warn('[rate-limit] store unavailable; allowing request', err)
    return { ok: true, remaining: limit - 1, resetAt }
  }
}

/**
 * Best-effort client IP from request headers: first entry of `x-forwarded-for`,
 * then `x-real-ip`, falling back to "unknown".
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}
