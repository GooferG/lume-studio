# Product

## Register

brand

## Users

**Primary buyer:** local small-business owners — trades, restaurants, salons, service providers — currently based in the Phoenix market, expanding to remote engagements via a personalized lead-generation workflow.

**Context of arrival:** prospects land on this site *after* receiving a personalized audit or hook from Lume's external lead-gen tool. They already have evidence that their current web presence is weak or missing. They are not browsing — they are deciding whether to trust the person who just diagnosed their site.

**Job to be done:** find a web partner who (1) clearly understands their business is not a tech business, (2) will deliver something visibly better than their current site, and (3) is trustworthy enough to hand money to without a 45-minute sales call.

**What they are not:** they are not designers, developers, or marketers. They will not recognize Stripe/Linear visual cues as "premium." They will recognize warmth, clarity, plain language, and obvious craftsmanship. Many are 40+; some have low vision or limited mobile dexterity.

## Product Purpose

Lume Studio is a one-person digital agency. This site exists to convert hook-tool prospects into quote requests by making the craft self-evident. The site itself is the portfolio — every interactive feature (live previews, before/afters, pricing calculator, build animations) is a deliberate capability demo, not decoration.

**Primary conversion:** quote/contact form submission. Promise: "Get a quote in 24 hours."
**Secondary conversion:** Cal.com discovery call, offered after form submit and in nav for ready-to-talk visitors.
**Anti-conversion:** the pricing calculator is engagement, not the funnel — it builds confidence in transparency, but the form is where leads land.

Success = qualified quote requests from small-business owners who arrived via a personalized audit and felt the site confirmed their decision to reach out.

## Brand Personality

**Three words: warm, plainspoken, crafted.**

- **Warm** opens the door. A salon owner or plumber should feel this site was made for someone like them, not for another developer. No corporate distance, no austere studio energy.
- **Plainspoken** earns trust. No jargon, no buzzwords, no "leverage" / "synergize" / "solutions." Sentences a sixth-grader could read. Prices stated as numbers.
- **Crafted** is the differentiator vs. Wix and Squarespace. The site demonstrates skill that a template can't fake — through interaction quality, typography, motion restraint, and proof-of-work, not through claiming it in copy.

**Voice:** confident but not loud. The site speaks like a skilled tradesperson who happens to have impeccable taste — not like an agency selling itself, and not like a tech founder.

**Emotional goal:** the visitor finishes a scroll thinking *"this person clearly knows what they're doing, and I think I could actually talk to them."*

## Anti-references

What this site must NOT look or feel like:

1. **Wix / Squarespace / GoDaddy template aesthetic.** Stock-photo hero, three-icon services row, identical feature cards, generic "Welcome to Our Company" copy. This is the visual baseline the buyer is trying to escape — looking like it disqualifies us instantly.
2. **Crypto / AI startup energy.** Dark gradient hero, neon accents, glassmorphism, mesh backgrounds, "launching soon" countdown vibes. Wrong audience signal; reads as untrustworthy to small-biz buyers.
3. **Big-agency austere (Pentagram, Manual, Made Thought).** Cold, intimidating, tiny type, all-caps everything, gallery-wall portfolio, no prices visible. Buyers feel they can't afford to ask and bounce.
4. **Generic SaaS landing (Stripe / Linear / Vercel pastiche).** Big gradient number hero, feature grid with subtle shadows, "trusted by" logo wall, dark mode showcase. This is the trap a developer-built agency site falls into hardest. The visual cues that scream "premium" to other developers mean nothing to a restaurant owner — and the pastiche reads as a tech person LARPing as an agency.

## Design Principles

1. **Practice what you preach.** Every claim about craft must be visible in the surrounding interface. If we say "fast," the page must be fast. If we say "modern," the typography and spacing must show it. The site is the proof; copy never has to defend itself.
2. **Show, don't tell.** Live previews of real client sites beat any "we build modern websites" sentence. Before/after comparisons beat any "we improve conversions" claim. The pricing calculator beats any "transparent pricing" headline. Demos > adjectives.
3. **Plain over clever.** Headlines describe what's actually being offered in language the buyer already uses. Resist the urge to be witty if witty reads as gimmicky to a non-technical reader. "Modern websites, built right" beats "We craft digital experiences."
4. **Restraint signals skill.** A confident designer doesn't have to prove it on every section. Generous whitespace, limited palette use, one motion idea per page. Loud sites look insecure; quiet sites look expensive.
5. **Earn the interaction.** Every interactive feature (build animation, live preview, calculator, before/after) must justify its complexity by demonstrating capability the buyer would otherwise have to take on faith. No animation for animation's sake.

## Accessibility & Inclusion

**Commitment: WCAG 2.1 AA on all content surfaces; best-effort on interactive proof-of-work demos.**

Hard floor (must meet AA):
- All copy, headings, forms, navigation, footer
- Color contrast 4.5:1 minimum on body text, 3:1 on large text and UI components
- Keyboard navigation for every actionable element with visible focus rings
- Form field labels, error messages, and validation announcements
- Screen-reader-accessible names on icon-only controls
- `prefers-reduced-motion` honored everywhere (see `lib/hooks/useReducedMotion.ts`); animations skip to final state

Best-effort (interactive demos):
- Live-preview iframes embed third-party sites whose a11y we don't control; we ensure the *container* is accessible (labeled, escapable, keyboard-friendly) even when the embedded content isn't.
- Before/after sliders must work via keyboard arrow keys, not pointer-only.
- The pricing calculator must be usable via keyboard and screen reader, with announced value changes.

**Audience-specific considerations:** primary buyers skew 40+. Body type stays at or above 16px. Color is never the sole signal (always pair with text/icon). Tap targets ≥44px on mobile. Avoid thin font weights on small sizes.
