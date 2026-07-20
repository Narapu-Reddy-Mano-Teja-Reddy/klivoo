import { Resend } from 'resend'

/**
 * Transactional email (Resend).
 *
 * Reliability model:
 * - If RESEND_API_KEY is not configured we console.warn and return early, so a
 *   missing key never crashes `next build` or blocks the calling request.
 * - The Resend SDK does NOT throw on API-level failures (unverified sending
 *   domain, invalid recipient, rate limit). It returns them in the `{ error }`
 *   field of the response. We inspect that field in `dispatch()` and throw, so
 *   failures are surfaced and logged instead of vanishing silently.
 * - Callers still wrap sends in try/catch so a delivery failure never blocks the
 *   underlying action (waitlist signup, approval, member creation).
 *
 * IMPORTANT — to actually deliver to real inboxes, the FROM domain must be
 * verified in the Resend dashboard (Domains → Add domain → add the DNS records).
 * Set EMAIL_FROM to an address on that verified domain. Until a domain is
 * verified, Resend only lets you send to your own account email.
 */

/**
 * Single From identity for all CLIV∞ mail. Override with EMAIL_FROM
 * (e.g. "CLIV∞ <noreply@clivoo.co.in>"). The domain part must be verified
 * in Resend or every send fails with a 403.
 */
const FROM = process.env.EMAIL_FROM || 'CLIV∞ <noreply@clivoo.co.in>'

/** Where login / app links point — the actual app, always the production origin. */
const APP_URL = 'https://app.clivoo.co.in'

/** Brand palette for inline email styles (email clients ignore <style>/classes). */
const COLOR = {
  primary: '#ea580c', // orange-600
  primaryLight: '#f97316', // orange-500
  amber: '#f59e0b', // amber-500
  lightBg: '#fff7ed', // orange-50
  canvas: '#f5f5f4', // warm neutral page background
  textDark: '#1c1917', // ink
  textMuted: '#78716c', // ink-muted
  border: '#e7e5e4', // line
} as const

/** Lazily construct a Resend client, or null when no key is configured. */
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  // Construct lazily (not at module load): Resend throws if the key is missing,
  // which would crash `next build` when this module is imported.
  return new Resend(process.env.RESEND_API_KEY)
}

/** Minimal HTML escaping for values interpolated into email markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Single send path for every email. Centralizes the missing-key no-op, the
 * From identity, success logging, and — critically — error surfacing: Resend
 * returns API failures in `error` rather than throwing, so we throw here to make
 * them visible to callers' try/catch and the server logs.
 */
async function dispatch(opts: { to: string; subject: string; html: string; text: string }): Promise<void> {
  const resend = getResend()
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping "${opts.subject}" to ${opts.to}`)
    return
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  })

  if (error) {
    // e.g. "The clivoo.co.in domain is not verified" (403), invalid recipient
    // (422), or rate limit (429). Surface it — the SDK won't throw on its own.
    throw new Error(
      `Resend rejected "${opts.subject}" → ${opts.to}: ${error.message || error.name || 'unknown error'}`
    )
  }

  console.log(`[email] Sent "${opts.subject}" → ${opts.to} (id: ${data?.id ?? 'unknown'})`)
}

/** Wrap body markup in the shared header bar + footer chrome (matches site UI). */
function shell(bodyHtml: string, opts: { waitlistFooter?: boolean } = {}): string {
  const { waitlistFooter = false } = opts
  return `
  <div style="margin:0;padding:24px 12px;background:${COLOR.canvas};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${COLOR.border};border-radius:18px;overflow:hidden;box-shadow:0 10px 40px -8px rgba(28,25,23,0.12);">
      <!-- gradient accent edge -->
      <div style="height:4px;background:${COLOR.primary};background-image:linear-gradient(90deg,${COLOR.primaryLight},${COLOR.amber},${COLOR.primary});"></div>
      <!-- brand header (logo + wordmark, matching the site nav) -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        <tr><td style="padding:20px 28px;border-bottom:1px solid ${COLOR.border};">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:10px;">
              <img src="${APP_URL}/logo.png" width="30" height="30" alt="CLIV∞" style="display:block;border-radius:7px;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="font-size:20px;font-weight:800;letter-spacing:-0.5px;color:${COLOR.textDark};">CLIV∞</span>
            </td>
          </tr></table>
        </td></tr>
      </table>
      <!-- body -->
      <div style="padding:32px 28px;color:${COLOR.textDark};font-size:15px;line-height:1.65;">
        ${bodyHtml}
      </div>
      <!-- footer -->
      <div style="padding:20px 28px;border-top:1px solid ${COLOR.border};text-align:center;color:${COLOR.textMuted};font-size:12px;line-height:1.6;">
        <p style="margin:0;">© 2026 CLIV∞ — run your freelance business without the chaos.</p>
        ${waitlistFooter ? `<p style="margin:6px 0 0;">You're receiving this because you joined the CLIV∞ waitlist.</p>` : ''}
      </div>
    </div>
  </div>`
}

/** Pill-shaped gradient call-to-action button (matches the site's rounded CTAs). */
function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${COLOR.primary};background-image:linear-gradient(135deg,${COLOR.primaryLight},${COLOR.primary});color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:9999px;box-shadow:0 6px 16px -4px rgba(234,88,12,0.45);">${label}</a>`
}

/**
 * Confirm a fresh waitlist signup. Best-effort: the API returns success even if
 * this throws or is skipped.
 */
export async function sendWaitlistConfirmation(email: string, name?: string): Promise<void> {
  const greeting = name?.trim() ? escapeHtml(name.trim()) : 'there'

  const body = `
    <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:${COLOR.textDark};">You're on the list 🎉</p>
    <p style="margin:0 0 16px;">Hi ${greeting},</p>
    <p style="margin:0 0 20px;">Thanks for joining the CLIV∞ waitlist — we've saved your spot.</p>

    <div style="background:${COLOR.lightBg};border-left:4px solid ${COLOR.primary};border-radius:10px;padding:16px 18px;margin:0 0 22px;">
      <p style="margin:0;font-weight:600;color:${COLOR.textDark};">
        You're an early member — the first 100 users get 1 month of the Pro plan free.
      </p>
    </div>

    <p style="margin:0 0 22px;">
      We'll review your request and email your login details as soon as you're approved.
      This usually takes 24–48 hours.
    </p>

    <p style="margin:0 0 10px;font-weight:700;color:${COLOR.textDark};">What you'll get with CLIV∞</p>
    <ul style="margin:0;padding-left:20px;color:${COLOR.textDark};">
      <li style="margin-bottom:6px;">Clients, projects, and invoices in one organized place</li>
      <li style="margin-bottom:6px;">Team management and project budget tracking</li>
      <li style="margin-bottom:0;">Built specifically for Indian freelancers and agencies</li>
    </ul>
  `

  const text = `You're on the CLIV∞ waitlist!

Hi ${name?.trim() || 'there'},

Thanks for joining the CLIV∞ waitlist — we've saved your spot. As an early member, the first 100 users get 1 month of the Pro plan free.

We'll review your request and email your login details as soon as you're approved (usually 24–48 hours).

What you'll get with CLIV∞:
- Clients, projects, and invoices in one organized place
- Team management and project budget tracking
- Built specifically for Indian freelancers and agencies

© 2026 CLIV∞`

  await dispatch({
    to: email,
    subject: "You're on the CLIV∞ waitlist 🎉",
    html: shell(body, { waitlistFooter: true }),
    text,
  })
}

/**
 * Notify an approved applicant for whom we just created a brand-new account,
 * including their first-login credentials.
 */
export async function sendWaitlistApproval(
  email: string,
  password: string,
  plan: string
): Promise<void> {
  const planLabel = escapeHtml(plan.toUpperCase())
  const loginUrl = `${APP_URL}/login`

  const body = `
    <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:${COLOR.textDark};">You're approved ✅</p>
    <p style="margin:0 0 20px;">Great news — your CLIV∞ waitlist request has been approved and your account is ready.</p>

    <div style="background:#f0fdf4;border:1px solid #16a34a;border-radius:12px;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0;font-weight:700;color:#166534;font-size:15px;">
        Your account has been created on the ${planLabel} plan — free for 30 days.
      </p>
    </div>

    <p style="margin:0 0 12px;font-weight:700;color:${COLOR.textDark};">Your login details</p>
    <div style="border:1px solid ${COLOR.border};border-radius:12px;padding:18px 20px;margin:0 0 20px;background:#fafaf9;">
      <p style="margin:0 0 12px;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Login page</span><br />
        <a href="${loginUrl}" style="color:${COLOR.primary};font-weight:600;">${loginUrl}</a>
      </p>
      <p style="margin:0 0 12px;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Email</span><br />
        <strong>${escapeHtml(email)}</strong>
      </p>
      <p style="margin:0;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Temporary password</span><br />
        <code style="display:inline-block;margin-top:4px;background:#ffffff;border:1px solid ${COLOR.border};border-radius:6px;padding:7px 11px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;color:${COLOR.textDark};">${escapeHtml(password)}</code>
      </p>
    </div>

    <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:10px;padding:14px 16px;margin:0 0 26px;">
      <p style="margin:0;color:#92400e;font-size:14px;">
        Save this password now — it won't be shown again. You can change it in Settings after logging in.
      </p>
    </div>

    <div style="text-align:center;margin:0 0 4px;">
      ${ctaButton(loginUrl, 'Log in to CLIV∞ →')}
    </div>
  `

  const text = `You're approved! Your CLIV∞ account is ready.

Your account has been created on the ${plan.toUpperCase()} plan — free for 30 days.

Your login details:
- Login page: ${loginUrl}
- Email: ${email}
- Temporary password: ${password}

Save this password now — it won't be shown again. You can change it in Settings after logging in.

Log in: ${loginUrl}

© 2026 CLIV∞`

  await dispatch({
    to: email,
    subject: "You're approved! Your CLIV∞ account is ready ✅",
    html: shell(body, { waitlistFooter: true }),
    text,
  })
}

/**
 * Notify an approved applicant who already had a CLIV∞ account — no
 * credentials, just a confirmation that their plan was upgraded.
 */
export async function sendWaitlistApprovalExisting(email: string, plan: string): Promise<void> {
  const planLabel = escapeHtml(plan.toUpperCase())
  const loginUrl = `${APP_URL}/login`

  const body = `
    <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:${COLOR.textDark};">Your plan is upgraded ✅</p>
    <p style="margin:0 0 24px;">
      Good news — your CLIV∞ account has been upgraded to the
      <strong>${planLabel}</strong> plan, free for the next 30 days.
    </p>
    <div style="text-align:center;">
      ${ctaButton(loginUrl, 'Log in to CLIV∞ →')}
    </div>
  `

  const text = `Your CLIV∞ plan has been upgraded.

Your account has been upgraded to the ${plan.toUpperCase()} plan — free for the next 30 days.

Log in: ${loginUrl}

© 2026 CLIV∞`

  await dispatch({
    to: email,
    subject: 'Your CLIV∞ plan has been upgraded ✅',
    html: shell(body),
    text,
  })
}

/**
 * Send a newly-created team member their login credentials.
 *
 * Best-effort: if RESEND_API_KEY is not configured we no-op (the owner still
 * receives the password once in the API response as a fallback). Callers wrap
 * this in try/catch so a delivery failure never blocks member creation.
 */
export async function sendTeamMemberCredentials({
  toEmail,
  toName,
  password,
  orgName,
  loginUrl,
}: {
  toEmail: string
  toName: string
  password: string
  orgName: string
  loginUrl: string
}): Promise<void> {
  const safeOrg = escapeHtml(orgName)
  const safeName = escapeHtml(toName)

  const body = `
    <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:${COLOR.textDark};">Welcome to ${safeOrg} 👋</p>
    <p style="margin:0 0 20px;">Hi ${safeName}, <strong>${safeOrg}</strong> has added you to their workspace on CLIV∞.</p>

    <p style="margin:0 0 12px;font-weight:700;color:${COLOR.textDark};">Your login details</p>
    <div style="border:1px solid ${COLOR.border};border-radius:12px;padding:18px 20px;margin:0 0 20px;background:#fafaf9;">
      <p style="margin:0 0 12px;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Login page</span><br />
        <a href="${loginUrl}" style="color:${COLOR.primary};font-weight:600;">${loginUrl}</a>
      </p>
      <p style="margin:0 0 12px;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Email</span><br />
        <strong>${escapeHtml(toEmail)}</strong>
      </p>
      <p style="margin:0;">
        <span style="color:${COLOR.textMuted};font-size:13px;">Temporary password</span><br />
        <code style="display:inline-block;margin-top:4px;background:#ffffff;border:1px solid ${COLOR.border};border-radius:6px;padding:7px 11px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;color:${COLOR.textDark};">${escapeHtml(password)}</code>
      </p>
    </div>

    <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:10px;padding:14px 16px;margin:0 0 26px;">
      <p style="margin:0;color:#92400e;font-size:14px;">
        Save this password — it won't be shown again. You can change it in Settings after logging in.
      </p>
    </div>

    <div style="text-align:center;margin:0 0 4px;">
      ${ctaButton(loginUrl, 'Log in to CLIV∞ →')}
    </div>
  `

  const text = `Welcome to ${orgName} on CLIV∞

Hi ${toName}, ${orgName} has added you to their workspace on CLIV∞.

Your login details:
- Login page: ${loginUrl}
- Email: ${toEmail}
- Temporary password: ${password}

Save this password — it won't be shown again. You can change it in Settings after logging in.

© 2026 CLIV∞`

  await dispatch({
    to: toEmail,
    subject: `You've been added to ${orgName} on CLIV∞`,
    html: shell(body),
    text,
  })
}
