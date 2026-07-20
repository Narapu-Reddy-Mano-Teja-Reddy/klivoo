# Landing Redesign — everything below the hero

Branch: `redesign/landing-below-hero` (3 commits, not pushed)
Scope: the marketing homepage (`/`) below the hero. No app, API, auth, or backend code touched.

---

## 1. The headline result

Every section under the hero was rebuilt around one warm, editorial design system. The hero is
**pixel-identical** to `main` — verified by rendering both builds and diffing the bitmaps, not by
inspection (see §6).

Two real bugs were found and fixed during verification. One of them — every editorial headline
staying invisible for motion-enabled visitors — would have shipped as a broken page. Details in §7,
because they're the most important thing in this document.

---

## 2. Files changed

| File | What |
|---|---|
| `tailwind.config.ts` | **+60 lines, purely additive.** Warm palette, editorial type scale, warm elevation, 2 keyframes. No existing token altered. |
| `src/app/globals.css` | **+146 lines, purely additive.** Texture/detail utilities, reveal variants, reduced-motion rules scoped to the new classes. |
| `src/app/page.tsx` | Every section below the hero. Hero region byte-identical. |
| `src/components/landing/Reveal.tsx` | `variant` prop (`rise`/`mask`/`wipeX`). Default path unchanged. |
| `src/components/landing/Faq.tsx` | Opt-in `variant="editorial"`. Default unchanged. |
| `src/components/landing/Parallax.tsx` | **New.** Scroll-linked parallax via CSS vars. |
| `src/components/landing/Magnetic.tsx` | **New.** Magnetic hover via CSS vars. |
| `src/components/landing/SectionLabel.tsx` | **New.** The eyebrow treatment. |
| `src/components/marketing/VerifiedReviews.tsx` | Redesigned (homepage-only component). |
| `src/components/marketing/DataSecurity.tsx` | Opt-in `variant="editorial"`. Default unchanged. |
| `src/components/marketing/SiteFooter.tsx` | Refined in place — see §5. |

**No new dependencies.** `package.json` untouched.

---

## 3. The design system

**Colour.** Warm throughout; orange stays the only saturated thing on screen.

| Token | Value | Role |
|---|---|---|
| `bone` | `#FFF8F2` | The canvas the hero already sat on |
| `cream` | `#FAEFE2` | Warmer paper — the Verified Reviews band |
| `espresso` | `#17100B` | Dark section base — a warm near-black, never slate |
| `espresso-soft` / `-line` / `-text` / `-muted` | | Elevated surface, hairline, body, secondary on dark |
| `terracotta-300..600` | `#EFA184`→`#AE4626` | The supporting warm tone between orange and the neutrals |

Sections alternate light → dark → light down the page. The three dark beats are deliberate
punctuation: the problem, the process, the close.

**Type.** An editorial scale — `display-sm` (40px) → `display` (52px) → `display-lg` (68px) →
`display-xl` (96px) — with tracking that tightens optically as size grows (−0.022em → −0.038em) and
a `max-w-measure` (34rem ≈ 62 characters) for body copy.

> **Fonts were deliberately not swapped.** See §4 — this is the one place I diverged from the brief.

**Elevation.** `lift-1`…`lift-4` are warm-tinted (`rgba(67,36,16,…)`) and layered — a tight contact
shadow plus a wide ambient one, so panels read as lit rather than cut out. `ember`/`ember-lg` carry
the brand glow. No neutral-gray drop shadows anywhere.

**Texture.** Film grain (`.grain`, soft-light, isolated), warm dot fields, hairline rules that fade
at both ends (`.rule-warm`/`.rule-dark`), restrained radial blooms. Sections are separated by
hairlines, never boxes.

**Detail.** Eyebrows are an ember dot + a rule growing out of it + tracked micro-caps — not the
rounded pill every SaaS page uses. Custom ring-inset tick bullets. Warm focus rings
(`.focus-ember` / `.focus-ember-dark`).

---

## 4. Decisions and assumptions

**① Fonts kept as-is — a deliberate divergence from Step 1.**
The brief asked for a Fontshare display face self-hosted via `next/font/local`. I didn't do it,
because it is mutually exclusive with hard constraint #1:

- The hero's `<h1>` binds to `font-display`; its body copy inherits `font-sans`.
- Changing either token re-renders the hero in a different typeface — a direct violation of "leave
  it byte-identical", which is stated twice and listed under **Hard constraints**.
- Adding a *fourth* face used only below the hero would split the page into two typographic voices.
  That's worse than the status quo, not better.

The brief's premise ("generic system/Inter-only type") also doesn't quite hold: headings already use
Plus Jakarta Sans with Instrument Serif as an editorial accent — a real pairing, not a default. So
the typography investment went into **scale, tracking, leading and measure** instead, which is where
most of the editorial feel actually comes from.

*If you want the font swap, it's a small change (`layout.tsx` + two Tailwind lines) — but it will
alter the hero. That's your call to make, not mine.*

**② Motion extends the in-house system rather than adding Framer Motion.**
The brief said to prefer one library consistently and add Framer Motion if absent. The stated goal is
*consistency* — and the hero already uses custom IntersectionObserver/CSS primitives I'm forbidden to
touch. Adding Framer Motion would therefore **create** the mixing the brief warns against (custom
hero + FM below), and cost ~45kb against a "no performance regressions" requirement. Extending the
existing primitives serves the actual intent. New motion is all CSS-var driven, so it stays on the
compositor.

**③ Launch-offer emoji → Lucide `Rocket` icon.**
"Emoji as icons" is an explicit anti-slop rule; "preserve all copy" is a hard constraint. The 🚀
functioned as an *icon* beside text, not as a word. The icon replaces it and **every word is
untouched** ("Launch Offer", "Launch pricing is limited time. Lock in your rate today."). Emoji count
on the homepage: 2 → 0.

**④ Shared components got opt-in variants instead of in-place restyles.**
`Faq`, `DataSecurity`, `GlowCard` and `Marquee` are reused by `/pricing`, `/faq`, `/security`,
`/features` and the SEO landing pages. Since the brief says redesign *only* the homepage, those take
`variant="editorial"` and their defaults are untouched, so no other page moves.

**⑤ The footer is the exception — refined in place.**
`SiteFooter` is shared by every marketing page via `PageShell`. A footer that looked different on `/`
than on `/pricing` would read as a bug, not art direction. It's refined in one design across both its
light and dark tones; structure and every link are unchanged (23 links, verified).

**⑥ Centering is opt-in.**
`SectionHead` is left-aligned by default. Only pricing and the FAQ are centered — the two places
where content genuinely radiates from the middle.

---

## 5. What changed, section by section

| Section | Before | Now |
|---|---|---|
| **Product facts** | 4 centered cards in a boxed band | Editorial rail — figures at 56px, left-aligned, hairlines that fade at both ends. No box. |
| **Tool chaos → Clienter way** | A plain 2-column table | The page's first **dark** beat. The scattered stack slides overhead as two tilted, dimmed marquees — "ten tabs" made literal — then resolves: the old way is five cards each individually rotated and indented (fixed offsets, never random, so SSR matches), against a lit, perfectly-aligned ember panel. The disarray *is* the argument. |
| **Feature showcase** | 3 identical zig-zag rows + 3 identical icon cards | Asymmetric 5/7 split; each row has its own visual logic — a window with a stat card hung off its corner; the invoice as a **physical document** (tilted, a second sheet behind, perforated header); a board that runs past its column edge. Revenue/Team/Meetings became a numbered editorial index (04–06) with staggered vertical offsets. |
| **Verified Reviews** | Centered head + flat icon list | A cream **paper artefact** band. The review page is the hero object — layered, a sheet peeking behind, badge leading the parallax. The four points became a printed index (01–04), hairline-separated, running full width. |
| **Three steps** | 3 columns + a static line | **Dark.** A connective spine that draws itself left-to-right on scroll (top-to-bottom on mobile), with lit number nodes sitting on it. |
| **Pricing** | Conic-border spinner on Pro | Warm cards; Pro raised with an ember glow and one slow sheen. **Fixed:** the badge row is now always rendered so all three price baselines align — Free previously sat 35px high. Strikethrough is a hairline rotated −8°, not a slash. |
| **Founder** | Centered, everything stacked | Asymmetric: quote runs wide at 38px with an oversized background quote mark; attribution hangs in a narrow rail off a hairline. |
| **FAQ** | Boxed card, gray dividers | Hairline index, 20px questions, warm wash that fades at both ends (no box), 500ms expand. Fully functional. |
| **Final CTA** | Flat orange gradient panel | Espresso, grain, and an ember rising from the base behind the type. Magnetic buttons. |
| **Security strip / footer** | Plain white panels | Warm vault panel with a lit bloom; footer restructured with tracked micro-cap column heads and hairline rules. |

---

## 6. Verification

Everything below was measured, not eyeballed. Driven with Playwright against the **production build**.

**Hero — pixel-identical.** The strongest check available:
- Hero region (root wrapper + ambient layers + `SiteHeader` + the entire hero `<section>`, 105 lines)
  diffs to **zero** against `main` at the source level.
- Both builds rendered with animations frozen at a fixed point, hero bitmaps compared:
  **0 differing pixels of 1,837,440, max channel delta 0.**
- Control: two captures of the same build also diff to 0 — so the comparison is genuinely
  deterministic and the zero means something.
- `tailwind.config.ts` and `globals.css` diffs contain **no removed or modified lines** — additive only.
- `Reveal`'s default path emits the identical `reveal` class string, so the hero's wrappers are unchanged.

**Build & performance.** `tsc --noEmit` clean; `next build` clean across all 31 routes.
First Load JS: **111 kB on both `main` and this branch** — no regression. No new dependencies.
Below-the-fold images remain lazy (confirmed: founder photo has `loading="lazy"`, `naturalWidth 0`
until scrolled to, then decodes at 1243×1243).

**Responsive.** No horizontal overflow at 1440px or 390px. Decorative floating cards hide below `lg`.

**Accessibility.** `prefers-reduced-motion`: **0 of 70 reveals hidden** at both widths — all motion
resolves to its final resting state, nothing depends on animation to be readable. Semantic markup
(`<ol>` for steps, `<blockquote>`, `<ul>`), `aria-hidden` on every decorative layer, warm focus-visible
rings on all interactive elements.

**Copy / prices / links.** Machine-compared against `main`:
- Every price and plan limit matches: ₹0, ₹499→₹199, ₹1,999→₹799, all client/project/team limits.
- **Every `href` identical in count and target.**
- Only intentional copy-adjacent change: the 🚀 → `Rocket` icon (§4③).

**Other marketing pages.** `/pricing`, `/faq`, `/security`, `/features`, `/about`,
`/client-management-software` all return 200 at both widths, with 23 footer links and 0 hidden
reveals.

---

## 7. Two bugs found and fixed (read this bit)

**① Every editorial headline was invisible with motion enabled.** *This would have shipped broken.*

`.reveal-mask` hid content with `clip-path: inset(0 0 105% 0)`. But a clip-path on an observed
element collapses its IntersectionObserver intersection rect to zero — so the observer that adds
`.is-visible` **never fires**. The reveal hid itself too well to ever be revealed. Every section
headline and the three-step spine sat at `opacity: 0` permanently for anyone *without*
`prefers-reduced-motion` — i.e. almost everyone.

The reduced-motion pass hid it, because that path forces `clip-path: none`; the design screenshots
looked perfect. It only surfaced because I counted fired reveals with motion **on** (61/70). Mechanism
confirmed directly: with a headline parked at `top: 431` in a 900px viewport, `is-visible` stayed
false; stripping *only* the clip-path made the still-connected observer fire immediately.

Fix: clip an inner wrapper, leave the observed element geometric. `rise` is untouched — IO ignores
opacity and transform. Now **70/70 fire**, with every section height unchanged.

**② A grain blend was silently recompositing the whole page.**

`.grain::after` blends with `soft-light`, but its host sections only set `position: relative`, which
doesn't create a stacking context. The blend resolved against the nearest one — the document root —
and Chromium recomposited the entire page. The hero, despite not one changed line, shifted by 593
pixels (max channel delta 3). Invisible to the eye, but a real violation of "renders exactly as
before", and it's exactly what the pixel diff exists to catch.

`isolation: isolate` pins each grain wash to its own backdrop — what it always meant. Hero went to 0.

---

## 8. Noted, not fixed (out of scope)

`/security` and `/features` overflow horizontally by 8px at 390px (398 vs 390), caused by their own
decorative `animate-blob` / `-inset-6` layers. **Verified pre-existing** — `main` overflows by the
identical amount. Those pages are outside this brief's scope, so I left them alone. Worth a small
follow-up.

---

## 9. Hero: confirmation

The hero was not touched. Its markup, styles, animations, spacing, and the components and data it
uses (`HeroGrid`, `HeroScroll`, `HeroPreview`, `SpotlightButton`, `TiltCard`) are unchanged. The one
shared component it consumes (`Reveal`) was extended additively and emits an identical class string
on its default path. Shared tokens changed additively only.

Confirmed the way it should be confirmed: **0 differing pixels out of 1,837,440, against a control
that proves the measurement is deterministic.**
