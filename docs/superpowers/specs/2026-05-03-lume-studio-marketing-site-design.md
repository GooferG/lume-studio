# Lume Studio — Marketing Site Design

**Date:** 2026-05-03
**Owner:** Luiz Meneghim
**Status:** Design approved, ready for implementation plan

## Overview

Lume Studio is a solo Next.js web-services brand. The marketing site exists for two outcomes:

1. **Lead generation** — convert small-business owners (no website or outdated site) into discovery calls or quote-form submissions.
2. **Portfolio piece** — the codebase itself doubles as a showcase project, demonstrating Next.js, Tailwind, and modern frontend chops to recruiters and prospective clients.

The site must read as "engineer with taste" — clean, fast, modern, opinionated. It is not a template-style conversion funnel, and it is not a quiet boutique brochure. It is in the Vercel / Linear / Resend lineage.

## Audience and positioning

**Primary audience:** small businesses (local services, clinics, contractors, niche e-commerce, etc.) that either have no website or have an outdated one (legacy WordPress, Wix, ten-year-old static HTML).

**What they care about:** does it work, does it look modern, can I see the price, will I own it, will it be fast.

**Voice:** first-person ("I"), even though the brand is "Lume Studio." The studio name is a wordmark; the human appears on `/about` and `/contact`. Plain English, no dev jargon on the homepage. Technical specifics live on service pages and case studies for buyers who want them.

**Positioning line (working draft):** "Modern websites for small businesses. Built right, shipped fast."

## Architecture

- **Framework:** Next.js 16 (App Router), TypeScript, React 19+
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Content:** MDX files for case studies and service deep-dive pages; typed TS data files for packages, services list, FAQ
- **Forms:** Next.js Server Actions → Resend for transactional email (contact + quote)
- **Booking:** Cal.com inline embed on `/contact`
- **Theme:** `next-themes` for dark/light state, follows OS preference, persists to localStorage
- **Animation:** `motion` (formerly Framer Motion) for fade-in-on-scroll and hover lift; `@paper-design/shaders-react` (or similar) for the hero liquid-metal background
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics (default) — Plausible can swap in later if privacy positioning matters
- **Fonts:** `Instrument Sans` (UI/body) and `Instrument Serif` (editorial accents) via `next/font/google`; `JetBrains Mono` for code/proof points

**Why these choices:** the stack is the same one Lume offers clients. The site is meant to demonstrate it. Every dependency has a justification beyond fashion.

## Routing

```
/                          homepage (summary of everything)
/services                  index of all four services
/services/web-build        deep dive — custom Next.js builds
/services/migrations       deep dive — old site → modern stack
/services/hosting          deep dive — hosting + DNS + domains
/services/optimizations    deep dive — speed + SEO fixes
/work                      case study index
/work/[slug]               individual case study (e.g. /work/universally-us)
/pricing                   packages + quote form
/about                     personal bio + contact options
/contact                   form + Cal.com booking embed
```

**Phase-2 routes (not in v1, designed to drop in):**
- `/blog` and `/blog/[slug]` — when a CMS layer is added
- `/labs` or `/tools` — interactive demo features (free site audits, generators, etc.)

**Why hybrid:** every dedicated route earns its keep through SEO (e.g., `/services/migrations` ranks for "small business website migration"), shareability (a case study URL is one link, not "scroll halfway down the homepage"), or direct linkability from ads/emails. Single-page would mash all keywords into one URL and rank weaker.

**Navigation:** top nav links to Services, Work, Pricing, About, Contact, plus the theme toggle. Footer repeats main routes plus social, privacy, and a small "built by Lume Studio" wordmark.

## Homepage section order

The `/` page is a *summary* with seven sections, ordered to warm a small-biz visitor before showing price:

1. **Hero** — headline, sub-headline, two CTAs ("See pricing" and "Book a call"), liquid-metal background.
2. **Services preview** — four cards (Web Build, Migrations, Hosting, Optimization), each links to the corresponding `/services/*` page.
3. **Selected work** — two to three case-study cards from `/content/work/*.mdx`, each links to the case study page.
4. **Packages** — three pricing cards (Starter, Business, Custom) with prices visible plus a Custom CTA → `/pricing`.
5. **Process** — four-step Discover → Design → Build → Ship overview.
6. **FAQ** — accordion of seven small-biz objections (see "FAQ content" below).
7. **Final CTA** — closing strip with Book Call + Quote Form buttons.

About lives on `/about` and is *not* on the homepage. The homepage's job is "can you build my site?" — a personal bio dilutes that.

## Visual system

### Color tokens

Both palettes share the same accent set; only neutrals flip.

| Token | Dark | Light |
|---|---|---|
| `bg` | `#0a0a0a` | `#fafafa` |
| `surface` | `#0f0f12` | `#ffffff` |
| `border` | `rgba(255,255,255,.08)` | `rgba(0,0,0,.08)` |
| `text` | `#ffffff` | `#0a0a0a` |
| `text-muted` | `rgba(255,255,255,.6)` | `#555` |
| `primary` (button bg) | `#ffffff` | `#0a0a0a` |
| `primary-fg` (button text) | `#0a0a0a` | `#ffffff` |
| `accent` | `#7c5cff` | `#7c5cff` |
| `accent-2` | `#3a8eff` | `#3a8eff` |

The mirror-image neutrals (`#0a0a0a` ↔ `#ffffff`) keep the visual identity consistent across themes. Accent appears at roughly 5% of pixel area — section labels, the "popular" pricing card border, the radial gradient blob.

### Typography

- **Display / headlines:** `Instrument Sans`, weight 600, tracking `-0.02em`, line-height 1.05–1.15
- **Body:** `Instrument Sans`, weight 400, line-height 1.5
- **Editorial accents:** `Instrument Serif` (italic), weight 400 — used in case study intros, pull-quotes, and the occasional flourish in long-form content. Sparingly.
- **Code / proof points:** `JetBrains Mono`, weight 400 — Lighthouse scores, code snippets, version numbers

### Motion

**In:**
- Liquid-metal animated background, hero only (see below)
- Fade-and-rise-in on section enter (`motion`, ~400ms, ease-out)
- Hover lift on cards (`translate-y-[-2px]`, soft shadow)
- Smooth theme transition (200ms cross-fade on `bg` and `text`)

**Out:**
- Parallax scrolling
- Auto-playing carousels
- Heavy 3D / WebGL outside the hero (saved for `/labs`)
- Anything that costs Lighthouse perf budget

### Liquid-metal hero background

A WebGL animated background, hero section only. Implementation candidate: `@paper-design/shaders-react` `LiquidMetal` preset, or a small custom GLSL shader if the library doesn't fit.

**Constraints:**
- Two color presets — dark variant (deeper violets/blues) and light variant (paler violets, near-white shimmer)
- Respects `prefers-reduced-motion: reduce` → falls back to a static gradient image (no animation)
- Pauses when the document is hidden (`document.visibilityState !== 'visible'`)
- Disabled or downgraded on small viewports / low-end devices (heuristic: `navigator.hardwareConcurrency < 4` or width < 640px → static gradient fallback)
- Renders behind hero content; hero text/CTAs sit on top with adequate contrast

**Acceptance:** the hero scores ≥ 95 on mobile Lighthouse with the shader running. If it can't, drop the shader on mobile entirely.

### Theme system

- `next-themes` provider wrapping the app
- Default: respects `prefers-color-scheme`
- Manual toggle in the top-right of the nav (sun/moon icon)
- Persists to localStorage under `theme` key
- `<html>` gets `data-theme="dark"` or `data-theme="light"`; Tailwind v4 dark variants key off this
- No flash of incorrect theme on first load (script in `<head>` reads localStorage before hydration)

## Content model

### MDX content

Files live under `content/`:

- `content/services/*.mdx` — one file per service (`web-build.mdx`, `migrations.mdx`, `hosting.mdx`, `optimizations.mdx`). Frontmatter: `title`, `slug`, `summary`, `icon`, `order`. Body: Markdown with embedded React components (`<PackageCard />`, `<BookCallButton />`, `<Screenshot />`).
- `content/work/*.mdx` — one file per case study (`universally-us.mdx`, etc.). Frontmatter: `title`, `slug`, `client`, `summary`, `cover`, `stack`, `year`, `outcomeMetric` (optional). Body: project narrative, screenshots, results.

### Typed data

Files live under `data/`:

- `data/packages.ts` — array of three pricing tiers (typed). Imported by homepage and `/pricing`.
- `data/services.ts` — array of four service summary objects for the homepage preview cards. Each links to its `/services/[slug]` page.
- `data/process.ts` — array of four steps (Discover, Design, Build, Ship) with title + one-line description.
- `data/faq.ts` — array of `{question, answer}` for the FAQ accordion. Answers can be MDX strings if needed.
- `data/nav.ts` — main nav and footer link arrays.

### Pricing tiers (initial draft)

| Tier | Price | What's included |
|---|---|---|
| **Starter** | $750 | Up to 5 pages, mobile-responsive, basic on-page SEO, 1 round of revisions, Vercel deploy, free SSL via host, contact form |
| **Business** | $2,000 | Up to 10 pages, MDX/CMS-ready content, advanced SEO (sitemap, structured data, OG images), Lighthouse-tuned (≥ 95), 2 rounds of revisions, contact form + analytics, basic blog setup if desired |
| **Custom** | $4,500+ | Full custom design, unlimited pages, headless CMS integration (Sanity / Payload), third-party integrations (Stripe, booking, etc.), unlimited revisions during build phase, post-launch support window |

These tiers are *content*, editable in `data/packages.ts`. The numbers will be tuned after the first few sales.

### FAQ content (initial seven)

1. How long does a build take? (Starter: 1–2 weeks, Business: 2–3 weeks, Custom: scoped per project)
2. Do I own the site afterward? (Yes — full code ownership, repo handed over)
3. What about hosting and domains? (I set up Vercel + connect your domain; you keep the accounts)
4. What if I need changes after launch? (Hourly rate or a small monthly retainer — outlined post-launch)
5. Can you migrate my old site? (Yes — see Migrations service page)
6. How do payments work? (50% deposit, 50% on launch; Stripe invoice)
7. What's *not* included? (Logo design, custom photography, ongoing content writing — but I can refer)

### Quote form fields

Submitted via Server Action → Resend → email to Lume's inbox.

- `name` (required, text)
- `email` (required, email)
- `businessName` (optional, text)
- `currentSiteUrl` (optional, URL — for migration leads)
- `projectType` (required, select: Build / Migrate / Optimize / Hosting / Other)
- `budgetRange` (required, select: <$1k / $1–3k / $3–5k / $5k+ / Not sure)
- `timeline` (required, select: ASAP / 1 month / 1–3 months / Flexible)
- `message` (required, textarea)
- Honeypot field (hidden, anti-bot)
- Server-side rate limit on the action

Success state: form replaces with a confirmation message; email lands in inbox within seconds. Failure: inline error with a fallback "email me directly at …" link.

### Contact form fields (lighter, on `/contact`)

- `name`, `email`, `message`
- Same Server Action pattern, separate template

## Project structure

```
app/
  layout.tsx                  root, fonts, theme provider
  page.tsx                    homepage
  services/
    page.tsx                  services index
    [slug]/page.tsx           individual service (reads MDX)
  work/
    page.tsx                  work index
    [slug]/page.tsx           individual case study (reads MDX)
  pricing/page.tsx
  about/page.tsx
  contact/page.tsx
  api/                        only if needed (Server Actions are preferred)
components/
  layout/                     Nav, Footer, ThemeToggle, Container
  hero/                       Hero, LiquidMetalBackground
  sections/                   ServicesPreview, SelectedWork, Packages, Process, FAQ, FinalCTA
  cards/                      ServiceCard, WorkCard, PackageCard
  forms/                      QuoteForm, ContactForm, FormField, FormStatus
  ui/                         Button, Badge, Accordion (or @radix-ui/react-accordion wrapper)
  mdx/                        MDX-renderable components: Screenshot, Callout, Steps
content/
  services/*.mdx
  work/*.mdx
data/
  packages.ts
  services.ts
  process.ts
  faq.ts
  nav.ts
lib/
  email.ts                    Resend client wrapper
  actions/                    Server Actions: submitQuote, submitContact
  validation.ts               zod schemas for form payloads
  mdx.ts                      MDX loading helpers
public/
  fonts/                      (if self-hosted)
  og/                         OG image assets
  images/work/                case study screenshots
```

**Component-boundary rule:** each `sections/*` component is a single-purpose, prop-driven block. The homepage is a thin composition that wires data into sections. Sections do not fetch their own data.

## Forms and integrations

- **Server Actions** are the default for all form submissions. No separate API routes unless an external service must reach in.
- **Resend** delivers transactional email. Lume's owner email is the single recipient for v1. Later, integrate Resend Audiences for a newsletter list.
- **Cal.com** is embedded inline on `/contact` (and as a CTA from any "Book a call" button). Free tier is sufficient.
- **Vercel Analytics** ships from day one. Add Vercel Speed Insights too — it's two lines and validates the perf claim.
- **Honeypot + rate-limit** for both forms. V1 uses a simple in-memory map keyed by IP (sufficient for the expected traffic and the cold-start frequency of a marketing site). If traffic ever justifies it, swap for `@upstash/ratelimit` or `@vercel/edge-config` without changing the action signature.

## Validation, error handling, and edge cases

- All form payloads validated with `zod` schemas on the server before email send.
- Network failure on the Server Action surfaces as an inline error with a fallback `mailto:` link. The form does not blank user input on error.
- The liquid-metal shader has a try/catch around WebGL context creation; if WebGL is unavailable, render the static-gradient fallback.
- `prefers-reduced-motion` is checked at hero render; the fallback is taken without ever loading the shader bundle.
- Theme toggle hides until after hydration to avoid SSR/CSR mismatch warnings; the unstyled flash is prevented by the inline `<head>` script setting `data-theme` before render.
- 404 page is a real designed page, not the default — same nav/footer, "couldn't find that, here's where to go" with links.

## Testing strategy

V1 is small and lead-driven; testing is targeted, not exhaustive.

- **Unit tests (Vitest):** zod validation schemas, MDX content loading helpers, any non-trivial pure functions in `lib/`.
- **Server Action tests (Vitest with mocked Resend):** verify schema rejection, verify happy-path payload-to-email, verify rate-limit behavior.
- **Visual regression:** none in v1. Add Playwright + a small smoke suite (homepage renders, theme toggle works, quote form submits) only if the site grows past five routes of unique logic.
- **Manual checklist before each deploy:** Lighthouse run on `/` (mobile + desktop), theme toggle round-trip, form submission round-trip, MDX content renders.

**Acceptance criteria for "v1 done":**
- All seven homepage sections render in both themes
- All routes in the routing table render with real or placeholder content
- Quote form delivers to Lume's inbox via Resend
- Cal.com booking embed loads on `/contact`
- Mobile Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO on `/`, `/services`, `/pricing`
- Theme persists across reload and respects OS preference on first visit
- No console errors in production build

## Phase-2 and phase-3 hooks

These are *not in v1* but the design accommodates them without rework.

**Phase 2 — CMS-backed blog:**
- Add `/blog` and `/blog/[slug]` routes
- Pick Sanity or Payload; write a `lib/cms.ts` adapter that mirrors the MDX-loading helper interface
- Existing `content/work/*.mdx` can stay MDX or migrate to the CMS — interface compatibility means the rest of the app doesn't care

**Phase 3 — Interactive showcase / `/labs`:**
- New top-level route, segmented from the marketing pages
- Candidates (one or two to start): live site speed audit, OG image generator, theme playground, "before/after" performance comparison tool
- Each lab is a single self-contained client component; no cross-lab dependencies

## Out of scope for v1

- Blog / CMS (phase 2)
- Interactive demos (phase 3)
- E-commerce / Stripe checkout
- Newsletter signup
- Multi-language support
- User accounts or any kind of dashboard
- A/B testing infra
- Customer testimonials section (added once there are real ones)
- "Trusted by" logo strip (added once there are 3+ logos)

## Open items

These are things to resolve before or during implementation; they don't block the spec but the user owns the answers.

- **Domain name** — check `lume.studio`, `lumestudio.com`, `lumestudio.dev`, `lume.co`, `lumestudio.co` for availability and pick one
- **Logo / wordmark** — decide if "Lume Studio" is set in Instrument Sans as a wordmark, or whether a small custom mark is added. v1 can ship with type-only wordmark and add a mark later
- **Resend account + API key** — sign up, configure sending domain, store key in Vercel env
- **Cal.com account** — set up profile, set 15-min discovery call event type, copy embed link
- **Vercel project + domain wiring** — connect repo, point chosen domain, set env vars
- **Owner inbox email** — the address that receives form submissions
- **Real case study content for `universally-us.mdx`** — write the narrative, gather screenshots, optionally an outcome metric
- **One additional case study from the personal portfolio** — pick the strongest, write it up
- **Final pricing tier copy** — the bullet lists in `data/packages.ts` will benefit from one editing pass once the visual sits in front of you
