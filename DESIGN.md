---
name: Lume Studio
description: Modern websites, built right.
colors:
  ice-surface: "#EEF2F6"
  surface-paper: "#ffffff"
  midnight-navy: "#0E1A2B"
  workshop-navy: "#162236"
  steel-grey: "#5C6B7E"
  ember-coral: "#FF5E47"
  hairline: "#0E1A2B1A"
  hairline-dark: "#EEF2F61A"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  editorial:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
    fontStyle: "italic"
  label:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
  mono:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-navy}"
    textColor: "{colors.ice-surface}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.midnight-navy}"
    textColor: "{colors.ice-surface}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  badge-default:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.steel-grey}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  badge-accent:
    backgroundColor: "{colors.ember-coral}"
    textColor: "{colors.ember-coral}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  card-default:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-featured:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input-default:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  input-focus:
    backgroundColor: "{colors.surface-paper}"
    textColor: "{colors.midnight-navy}"
---

# Design System: Lume Studio

## 1. Overview

**Creative North Star: "The Sunlit Workshop"**

Lume Studio's interface is a workshop with the windows open. Ice-blue surfaces stand in for natural daylight on a clean bench; midnight navy is the honest structural frame; ember coral is the one warm tool placed on the surface that draws the eye. The system is meant to feel like work happening in good light — visible, unhurried, accurately measured. Nothing is hidden behind decoration, but nothing is naked either.

The voice is *warm, plainspoken, crafted* (per PRODUCT.md). That translates visually to: generous whitespace that feels confident, not empty; rounded geometry that softens the navy/coral pairing without making it cute; one accent used sparingly enough that its appearance feels intentional every time. The system rejects four families explicitly: Wix/Squarespace template visuals (icon row, identical cards, stock-photo hero), crypto/AI startup gradient-and-glow, big-agency austere coldness, and generic SaaS landing pastiche (Stripe/Linear feature grids, gradient number heroes, dark-mode logo walls). When in doubt, the system errs toward quieter — restraint signals skill.

**Key Characteristics:**
- Two-color palette: navy structure + coral signal, separated by ice/paper neutrals.
- Pill buttons, soft-radius cards, full-radius badges — all geometry rounded.
- Flat by default; the only shadow in the system is a soft ember glow under the featured pricing card.
- Display sans (Space Grotesk) paired with editorial serif italic (Instrument Serif) for the rare emotional accent.
- Mono (JetBrains Mono) appears only as a craft signal — code-adjacent UI, the 404 page, micro-labels.
- Theme-aware: same palette, inverted polarity; navy becomes the daylight in dark mode.

## 2. Colors: The Aperture Palette

A two-temperature palette: cool ice and navy carry 90% of every surface; warm ember coral carries the remaining sliver. Borrowed-light feel — most of the room is in shadow so the highlight reads.

### Primary
- **Midnight Navy** (`#0E1A2B`): the structural color. Body text on light surfaces, primary button fill, logo mark, dark-mode background. The honest beam of the workshop frame. Never softened with opacity below 0.55; navy reads thin and weak when faded.

### Secondary
- **Ember Coral** (`#FF5E47`): the only accent. Reserved for moments that must be seen: primary CTAs (only when the secondary navy button isn't already carrying the call), the featured pricing card's border + glow, focus rings, form required-asterisks, link underline on hover, the icon mark on service cards, and selection highlight. **Maximum coverage rule: ≤10% of any single screen at rest.** If a layout needs more coral, the layout is wrong, not the rule.

### Neutral
- **Ice Surface** (`#EEF2F6`): the page background in light mode. Cool, slightly desaturated white-blue. Stand-in for natural workshop light. Never `#fff` — that reads sterile and breaks the temperature.
- **Surface Paper** (`#ffffff`): card and input fill in light mode. The lightest object in the system, used only to lift content one step above Ice Surface.
- **Workshop Navy** (`#162236`): card/input fill in dark mode. One step lighter than the dark-mode background; same role as Surface Paper.
- **Steel Grey** (`#5C6B7E`): muted body text, captions, supporting metadata. Cool, navy-leaning grey; never a warm grey.
- **Hairline** (`rgba(14, 26, 43, 0.1)` light / `rgba(238, 242, 246, 0.1)` dark): 1px borders on cards, inputs, the sticky nav. The system's only divider; never used at >1px thickness.

### Named Rules
**The One Ember Rule.** Ember Coral covers ≤10% of any rendered screen. Its rarity is the entire point — every appearance carries weight. If a screen needs two coral elements competing for attention, downgrade one to navy.

**The No-Pure-White Rule.** `#ffffff` appears as a value in code only on the Surface Paper token. Backgrounds, hero panels, and full-bleed sections use Ice Surface (`#EEF2F6`) so the page reads as cool daylight, not a printer's blank sheet.

**The Tinted-Hairline Rule.** Borders are navy-with-alpha (light mode) or ice-with-alpha (dark mode), never neutral grey. Even the dividers are part of the palette.

## 3. Typography

**Display Font:** Space Grotesk (with `system-ui, -apple-system, sans-serif` fallbacks)
**Editorial Font:** Instrument Serif (with `Georgia, serif` fallback)
**Mono Font:** JetBrains Mono (with `Fira Code, monospace` fallback)

**Character:** Space Grotesk is the working voice — geometric enough to feel modern, humanist enough to feel approachable, with subtle character in its `a`, `g`, and `Q` that keeps it from reading as generic-sans. Instrument Serif appears italicized for one purpose only: emotional or reflective sentences (the about-page quote, occasional pull-quotes in MDX). JetBrains Mono is the craft signal — it shows up where the code-adjacent reality of the work peeks through.

### Hierarchy
- **Display** (Space Grotesk, 600, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05, letter-spacing -0.02em): hero headlines on the homepage and section openers. One per page maximum.
- **Headline** (Space Grotesk, 600, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height 1.15, letter-spacing -0.015em): section titles ("Selected Work", "Pricing", page H1s on internal routes).
- **Title** (Space Grotesk, 600, 1rem, line-height 1.3): card titles (service cards, package names, FAQ questions).
- **Body** (Space Grotesk, 400, 1rem, line-height 1.6): paragraph copy. Cap line length at 65–75ch. Never below 1rem (16px) — primary buyers skew 40+.
- **Editorial** (Instrument Serif, 400 italic, 1.125rem, line-height 1.5): reserved emotional or reflective accent. Currently used only for the about-page closing quote. Should not appear more than once per page.
- **Label** (Space Grotesk, 500, 0.75rem, line-height 1.4, letter-spacing 0.06em, **uppercase**): form labels, badge text, price-note kickers above pricing cards, section eyebrows.
- **Mono** (JetBrains Mono, 400, 0.875rem, line-height 1.5): the 404 numeral, code blocks in MDX, the rare "system" annotation in interactive demos. Never used for body copy.

### Named Rules
**The One-Serif-Per-Page Rule.** Instrument Serif italic carries emotional weight precisely because it is rare. Two italic serif lines in the same view dilute both. Use it for the moment that needs to land; everything else stays in Space Grotesk.

**The Uppercase-Only-For-Labels Rule.** Uppercase + 0.06em tracking belongs to labels, badges, and price-note kickers. Headlines are never uppercased. The system rejects all-caps headlines on principle — they read as big-agency austere (anti-reference #3).

## 4. Elevation

The system is flat by default. Surfaces are layered through color shift — Ice Surface → Surface Paper steps up one level; Surface Paper + 1px Hairline border defines a card without lift. The system uses **one** shadow, and only one: the soft ember-tinted glow under the featured pricing card. That single shadow is doing strategic work — it is the visual signal that this is the recommended package — and its scarcity is what gives it meaning.

Hover and motion convey "active" without adding shadows. Buttons get `active:scale-[.98]`. Service cards get `hover:-translate-y-0.5` with a border-color shift from Hairline to coral-40%. These tactile micro-responses replace the soft-UI shadow stack you'd see on generic SaaS landing pages.

### Shadow Vocabulary
- **Ember Emphasis Glow** (`box-shadow: 0 10px 30px -10px rgba(255, 94, 71, 0.18)` — approximated from Tailwind `shadow-lg shadow-[var(--color-accent)]/10`): the only shadow in the system. Appears exclusively under the featured pricing card. Never apply elsewhere.

### Named Rules
**The Flat-By-Default Rule.** New surfaces are flat. If a component reads as needing elevation, the answer is almost always (a) increase whitespace, (b) shift surface color (Ice → Paper), or (c) add a hairline border — in that order. A shadow is the last resort, not the first.

**The One-Shadow Rule.** The ember-tinted glow under the featured pricing card is the system's only shadow. If you find yourself adding a second shadow anywhere, stop. Either remove the first one (and pick a different signal) or solve the design without shadow.

## 5. Components

### Buttons
- **Shape:** Pill (`border-radius: 9999px`). Fully rounded on every size. Pill geometry pairs intentionally with the flat, restrained surface — softness in geometry compensates for restraint in color and shadow.
- **Sizes:** Small (h-8, px-3, 14px text), Medium (h-10, px-5, 14px text — default), Large (h-12, px-7, 16px text).
- **Primary:** Midnight Navy fill, Ice Surface text. Hover: `opacity: 0.9`. Active: `transform: scale(0.98)`. Focus-visible: 2px Ember Coral ring with 2px Ice Surface offset.
- **Secondary:** Transparent fill, navy text, 1px Hairline border. Hover: Surface Paper background fill (no border change).
- **Ghost:** Transparent fill, navy text, no border. Hover: Surface Paper background. Use only in dense UI where a Secondary would feel too heavy (nav, table rows).
- **Disabled state:** `opacity: 0.5; pointer-events: none`.

### Badges
- **Shape:** Pill (`border-radius: 9999px`), small horizontal padding (10px), 4px vertical.
- **Typography:** 12px Space Grotesk 500, uppercase, 0.06em tracking.
- **Default variant:** Surface Paper background, Steel Grey text, 1px Hairline border. Used for category labels, metadata.
- **Accent variant:** Ember Coral at 10% alpha background, Ember Coral text, Ember Coral at 30% alpha border. Used sparingly to mark "featured", "new", or status flags. Subject to The One Ember Rule.

### Cards
- **Corner Style:** 12px radius (`rounded-xl`) on all cards.
- **Background:** Surface Paper in light mode, Workshop Navy in dark mode. Never Ice Surface (which is reserved for the page background).
- **Border:** 1px Hairline border by default. **Exception:** the featured pricing card uses a 2px Ember Coral border + Ember Emphasis Glow shadow.
- **Internal padding:** 24px on small cards (service cards), 32px on large cards (pricing, package).
- **Hover behavior (link cards only):** `transform: translateY(-2px)`, border color transitions from Hairline to `Ember Coral / 40%`. No shadow appears on hover — translate + border-color is the entire affordance.
- **Nesting:** Cards may not be nested inside cards. Ever.

### Inputs / Fields
- **Style:** Surface Paper background, 1px Hairline border, 6–8px radius (`rounded-md`), 8px vertical / 12px horizontal padding, 40px height (matches Medium button).
- **Typography:** 14px Space Grotesk 400, Midnight Navy text, Steel Grey placeholder.
- **Label position:** Above the field, 12px uppercase tracked label in Steel Grey. Required-field asterisk is Ember Coral.
- **Focus:** Border color shifts to Ember Coral, 1px Ember Coral ring. No outline-box, no shadow halo.
- **Error:** Error text below the field in `text-red-500` (Tailwind default red — currently the only non-palette color in the system, kept because error states need to read instantly).

### Navigation
- **Style:** Sticky top, full-width, 64px tall, 1px Hairline bottom border, `backdrop-blur` over Ice Surface at 80% alpha. Container max-width inside.
- **Logo:** Lume mark on the left.
- **Links:** Space Grotesk 400 14px in Steel Grey by default, shift to Midnight Navy on hover with a 200ms `color` transition. 28px gap between items.
- **Theme toggle:** Always present on the right, both mobile and desktop.
- **Mobile:** Nav links collapse; only the theme toggle remains visible. (No hamburger menu currently — keep it that way unless adding 3+ new top-level routes.)

### Pricing Card (signature component)
The featured pricing card is the single most visually emphatic surface in the system. It is the only place where multiple emphasis tools stack: 2px Ember Coral border + Ember Emphasis Glow shadow + an Ember Coral price-note kicker label ("MOST POPULAR" / "RECOMMENDED" — set per package). The non-featured pricing cards sit beside it with default 1px Hairline borders and no glow, creating a deliberate hierarchy: one recommended path, two alternatives. The primary CTA inside the featured card is a Primary button; the alternatives use Secondary buttons.

### Service Card (signature component)
Compact card with icon top-left (Ember Coral, 20px Lucide icon), arrow top-right (Steel Grey, 16px), title and one-paragraph summary below. The hover state is the system's defining tactile moment: 2px upward translate + border shift from Hairline → Ember Coral/40% + arrow icon shifts from Steel Grey → Midnight Navy. All three changes are intentional; none of them are decorative.

## 6. Do's and Don'ts

### Do:
- **Do** use Midnight Navy (`#0E1A2B`) as the structural color for body text, primary buttons, and the logo. It is the system's beam.
- **Do** reserve Ember Coral (`#FF5E47`) for ≤10% of any screen — focus rings, CTAs that aren't carried by navy, the featured pricing card's border + glow, the service card icon. Its rarity is its meaning.
- **Do** use Ice Surface (`#EEF2F6`) for the page background. The cool tint is what separates Lume from a default-CSS site.
- **Do** keep cards flat with a 1px Hairline border. The one exception — the featured pricing card — earns its emphasis because nothing else has it.
- **Do** use pill-shaped buttons (`border-radius: 9999px`) at every size. The softness is intentional warmth against the otherwise restrained palette.
- **Do** size body text at 1rem (16px) or larger. Primary buyers skew 40+; small body type costs conversions, not just a11y points.
- **Do** use Instrument Serif italic for *one* emotional accent per page, maximum.
- **Do** keep nav, footer, forms, and content copy at WCAG 2.1 AA contrast. Best-effort applies to interactive demos only, never to text.
- **Do** honor `prefers-reduced-motion` on every animation — the build-hero, the service-card lift, the theme-toggle view-transition. Animations skip to final state, they do not just slow down.

### Don't:
- **Don't** use `#ffffff` as a background color. Surface Paper (`#ffffff`) is for cards and inputs only; backgrounds are Ice Surface. The system has a temperature; pure white breaks it.
- **Don't** stack the Wix/Squarespace/GoDaddy template visual: stock-photo hero, three-icon services row, identical feature cards, "Welcome to Our Company" headline. This is anti-reference #1 and the visual baseline our buyers are escaping.
- **Don't** introduce crypto/AI startup energy: dark gradient hero, neon accents, glassmorphism, mesh backgrounds, "launching soon" energy. Wrong audience signal (anti-reference #2).
- **Don't** lean big-agency austere: tiny type, all-caps headlines, gallery-wall portfolio, no prices visible. Buyers feel they can't afford to ask and bounce (anti-reference #3).
- **Don't** copy the generic SaaS landing pastiche: gradient-number hero, feature-grid with soft shadows, "trusted by" logo wall, dark-mode showcase as the headline pattern. Anti-reference #4 — the trap a developer-built agency site falls into hardest.
- **Don't** add a second shadow anywhere in the system. The Ember Emphasis Glow under the featured pricing card is the only shadow that exists.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe on cards, callouts, or alerts. Side-stripe borders are banned by the impeccable shared design laws and are never the right answer here.
- **Don't** apply `background-clip: text` with a gradient (gradient text). Single solid colors only. Emphasis through weight or size.
- **Don't** nest cards inside cards. If content needs grouping inside a card, use spacing and a hairline divider, not a sub-card.
- **Don't** uppercase headlines. Uppercase belongs to labels, badges, and price-note kickers — the 12px tracked tier. All-caps display type reads austere and unfriendly.
- **Don't** use em dashes (`—` or `--`) in UI copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** introduce a new font family without removing one. Three text families (Space Grotesk, Instrument Serif, JetBrains Mono) is the cap.
- **Don't** expand the palette. If a screen feels like it needs a new color, the answer is whitespace, hierarchy, or one of the existing tokens — not green, not yellow, not a second accent.
