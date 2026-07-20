# Clienter — Marketing & Landing Site

The public marketing site for [Clienter](https://clienter.co.in) — landing page,
feature/pricing/legal pages, SEO infrastructure, and the contact + waitlist forms.

This is **separate** from the application (`app.clienter.co.in`), which lives in
its own repo. Deploy this to the apex domain `clienter.co.in`.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Resend for transactional email
- Supabase (shared with the app) for the waitlist table

## Pages

`/` landing · `/features` · `/how-it-works` · `/pricing` · `/demo` · `/faq` ·
`/about` · `/contact` · `/privacy` · `/terms` · `/refund` · `/security`

SEO infra: `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`
(edge runtime — see gotcha below). Single source of truth for brand/SEO copy:
`src/lib/site.ts`.

## API routes

- `POST /api/waitlist` — landing page signup. Inserts into the shared Supabase
  `waitlist` table (service-role). The **app's admin panel reads this table** to
  onboard people, so it must point at the same Supabase project.

The contact form (`/contact`) does NOT go through an API route — it submits
client-side straight to Web3Forms (see `ContactForm.tsx`). The delivery inbox
is whatever email is registered against that access key on web3forms.com, not
anything in this repo or its env vars.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in the values
npm run dev
```

## Environment

See `.env.local.example`. Must use the **same Supabase project** as the app so
waitlist signups land where the admin panel reads them.

## Gotcha — OG image

`src/app/opengraph-image.tsx` MUST keep `export const runtime = 'edge'`, or
`next build` fails on Windows (`Invalid URL` from `@vercel/og` static prerender).
Every `<div>` with more than one child needs an explicit `display: flex`.

## Deploy

Deploy to Vercel, set the env vars above, and point `clienter.co.in` at it.
The app is hosted separately at `app.clienter.co.in`.
