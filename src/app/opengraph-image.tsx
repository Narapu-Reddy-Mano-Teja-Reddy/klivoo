import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

/**
 * Dynamically generated social share image (1200×630) applied site-wide.
 * Next.js serves this for OpenGraph + Twitter cards on every route that doesn't
 * override it.
 *
 * Runs on the edge runtime: this both matches @vercel/og's design and avoids a
 * Windows-only build bug where static prerendering throws `Invalid URL` from
 * fileURLToPath while resolving the default font. On the edge the image is
 * generated on demand instead of at build time.
 */
export const runtime = 'edge'
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #1c1917 0%, #2b1c12 55%, #7c2d12 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #fb923c, #ea580c)',
              fontSize: '40px',
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1px' }}>
            {SITE_NAME}
          </div>
        </div>

        {/* Headline — every multi-child div sets display:flex (Satori requires it) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '76px',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-2px',
              maxWidth: '960px',
            }}
          >
            <span>Run your freelance business</span>
            <span style={{ color: '#fb923c' }}>without the chaos</span>
          </div>
          <div style={{ display: 'flex', fontSize: '32px', color: '#d6d3d1', maxWidth: '880px' }}>
            Clients, projects, invoices &amp; team — one place, built for Indian freelancers and
            agencies.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '26px',
            color: '#fdba74',
            fontWeight: 600,
          }}
        >
          <span>kliv∞.in</span>
          <span style={{ color: '#57534e' }}>•</span>
          <span style={{ color: '#a8a29e' }}>Start free — no card required</span>
        </div>
      </div>
    ),
    size
  )
}
