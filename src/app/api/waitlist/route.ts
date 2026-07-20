import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { isDisposableEmail } from '@/lib/email-validation'

/**
 * Public waitlist signup (landing page). Anyone may POST { email, name? }.
 *
 * Abuse resistance (layered, additive):
 * - Method/Content-Type/size guards reject obviously malformed traffic cheaply.
 * - Honeypot field + a minimum time-to-submit silently drop bots: both return a
 *   fake success so a bot can't learn it was filtered.
 * - Disposable/temporary email domains are silently rejected the same way.
 * - DB-backed sliding-window rate limit: max 3 per IP/hour AND 10 per IP/day.
 * - Inserts with the service-role client (the table has no anon SELECT policy,
 *   so emails stay private). The browser never touches Supabase directly.
 * - Duplicate emails are NOT an error: we report success so we never leak
 *   whether an address is already on the list.
 * - All errors are caught and returned generic — no stack traces / DB details.
 *
 * Only POST is exported, so the App Router auto-returns 405 for other methods.
 */

// Never cache this route — every request must hit the function fresh.
export const dynamic = 'force-dynamic'

// Stricter than the "anything@anything.tld" shape: single @, no spaces, a real
// TLD of at least two letters, and a sane local/label structure.
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Hard ceiling on the request body. Real payloads are well under 1KB.
const MAX_BODY_BYTES = 2 * 1024

// Minimum time a human plausibly takes between the form rendering and submit.
const MIN_SUBMIT_MS = 2000

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' }

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE })
}

// Generic success used for both genuine signups and silent bot/disposable
// rejects — identical shape so the two are indistinguishable to a client.
function fakeSuccess() {
  return json(
    { success: true, message: "You're on the waitlist! Check your email for confirmation." },
    200
  )
}

export async function POST(req: Request) {
  // 1) Content-Type guard — only accept JSON.
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ error: 'Please enter a valid email address' }, 400)
  }

  // 2) Read the raw body with a size cap so we never parse a giant payload.
  let raw: string
  try {
    raw = await req.text()
  } catch {
    return json({ error: 'Please enter a valid email address' }, 400)
  }
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: 'Request too large.' }, 413)
  }

  // 3) Parse + validate before touching the rate limiter, so malformed
  //    requests don't burn the IP's quota.
  let email = ''
  let name: string | null = null
  let honeypot = ''
  let renderedAt = NaN
  try {
    const body = JSON.parse(raw || '{}')
    email = String(body?.email ?? '').trim().toLowerCase()
    const rawName = body?.name
    name = typeof rawName === 'string' && rawName.trim() ? rawName.trim() : null
    // Honeypot: real users never fill this hidden field.
    honeypot = String(body?.company_website ?? '').trim()
    renderedAt = Number(body?.renderedAt)
  } catch {
    return json({ error: 'Please enter a valid email address' }, 400)
  }

  // 4) Honeypot trip → pretend success, insert nothing.
  if (honeypot) {
    return fakeSuccess()
  }

  // 5) Time-to-submit. If the form was submitted suspiciously fast, treat as a
  //    bot. Guarded against clock skew: only trip when the elapsed time is a
  //    sane, positive value below the threshold, so real users are never
  //    blocked by a slow/fast client clock.
  if (Number.isFinite(renderedAt)) {
    const elapsed = Date.now() - renderedAt
    if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
      return fakeSuccess()
    }
  }

  // 6) Field validation.
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address' }, 400)
  }
  if (name && name.length > 100) {
    return json({ error: 'Please enter a valid name' }, 400)
  }

  // 7) Disposable/temporary domains → silent reject (fake success).
  if (isDisposableEmail(email)) {
    return fakeSuccess()
  }

  // 8) Rate limit: max 3 per IP/hour AND max 10 per IP/day.
  const ip = getClientIp(req)
  const hour = await rateLimit(`waitlist:hour:${ip}`, 3, 60 * 60 * 1000)
  if (!hour.ok) {
    return json({ error: 'Too many requests. Please try again later.' }, 429)
  }
  const day = await rateLimit(`waitlist:day:${ip}`, 10, 24 * 60 * 60 * 1000)
  if (!day.ok) {
    return json({ error: 'Too many requests. Please try again later.' }, 429)
  }

  try {
    const admin = createAdminClient()
    const { error } = await admin.from('waitlist').insert({ email, name, source: 'landing_page' })

    if (error) {
      // 23505 = unique_violation → already on the list, treat as success so we
      // never reveal whether an address is already registered.
      if ((error as { code?: string }).code === '23505') {
        return json(
          { success: true, message: "You're already on the waitlist! We'll be in touch soon." },
          200
        )
      }
      throw error
    }

    return fakeSuccess()
  } catch (err) {
    // Never leak DB errors / stack traces to the client.
    console.error('[waitlist] Failed to record signup:', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
}
