# Lume Studio Interactivity Upgrade

## Project context

Lume Studio is a small digital agency. The current site at lume-studio-sandy.vercel.app is clean but static. The goal is to add five interactive features that double as proof-of-work, so the site itself sells the agency's capabilities.

## Stack constraints

- Next.js 15 (App Router)
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion for animation orchestration
- No new state management libraries. `useState`, `useReducer`, and Context are sufficient
- Match the existing dark glassmorphism aesthetic
- Reuse existing color tokens, spacing scale, and design primitives wherever possible

## Cross-cutting requirements (apply to every phase)

1. Respect `prefers-reduced-motion`. Animations skip to the final state when the user prefers reduced motion.
2. All interactive elements keyboard accessible. Tab order logical, focus visible, Enter/Space activates.
3. Zero unnecessary CLS. Reserve space for animated content.
4. Mobile tested. Touch targets at least 44x44px. Sliders work with touch events.
5. Bundle impact tracked. Report KB delta after each phase via `next build`.
6. SSR-safe. Animations should not flash incorrect content on hydration.
7. Lighthouse performance score should not drop more than 3 points compared to baseline.

## Process rules

1. Read this entire plan before writing any code.
2. Summarize back what you understand. List any ambiguities or assumptions.
3. Tackle one phase at a time. Commit after each phase with a descriptive message.
4. After each phase, run `next build` and report the bundle size diff.
5. Stop and check in with the user between phases. Do not chain phases automatically.
6. If something in the plan conflicts with what you find in the codebase, flag it before deviating.

---

## Phase 1: Hero "build in real time" animation

### What it does

On homepage load, the hero section assembles itself. Skeleton wireframe appears, snaps into final layout, typography fills in, and the whole thing color-grades from greyscale to brand colors. Total duration around 1.5 seconds.

### Files

- `app/page.tsx` (consume the component)
- `components/hero/BuildHero.tsx` (new)
- `components/hero/SkeletonBlocks.tsx` (new, placeholder shapes)
- `lib/hooks/useReducedMotion.ts` (verify exists or create)
- `lib/hooks/useFirstVisit.ts` (new, sessionStorage flag)

### Animation stages

| Stage | Timing         | What animates                                                         |
| ----- | -------------- | --------------------------------------------------------------------- |
| 1     | 0 to 300ms     | Grey skeleton blocks fade in with subtle pulse                        |
| 2     | 300 to 700ms   | Blocks resize and reposition to final layout                          |
| 3     | 700 to 1100ms  | Text content fades in with 50ms stagger between elements              |
| 4     | 1100 to 1500ms | CSS `filter: saturate(0)` animates to `saturate(1)` on hero container |

### Implementation notes

- Use Framer Motion `variants` with `staggerChildren` on the parent for orchestration.
- Skeleton blocks should match final dimensions so stage 2 only animates position, not size (or animates size with `layout` for smoothness).
- `useFirstVisit` hook backed by `sessionStorage`. If the flag is set, render final state immediately.
- `useReducedMotion`. If true, render final state immediately.
- Client component or initialize state from `useEffect` to avoid SSR flicker.

### Acceptance criteria

- Animation plays once per session, then sits at final state on subsequent navigations.
- With reduced motion, hero appears in final state with no animation.
- No layout shift during or after animation.
- Animation does not block first contentful paint.

---

## Phase 2: Theme toggle with View Transitions

### What it does

Theme toggle triggers a multi-layered transition: circular reveal expanding from the click coordinates, icon morph between sun and moon, particle burst entering dark mode, color flash entering light mode.

### Files

- `components/theme/ThemeToggle.tsx` (rebuild or new)
- `lib/theme/useTheme.ts` (verify or create)
- `app/globals.css` (View Transitions CSS)
- `components/theme/StarBurst.tsx` (new, SVG particles)

### Technical approach

1. Use the View Transitions API: `document.startViewTransition(() => setTheme(next))`.
2. Before triggering, capture click coordinates from the event and set CSS custom properties on `:root`: `--vt-x` and `--vt-y`.
3. CSS animates `clip-path: circle()` from the click point outward on `::view-transition-new(root)`.
4. Icon swap uses two SVGs absolutely stacked with cross-fade plus rotation.
5. Star particles: 10 SVG circles at randomized positions, fade in then out over 800ms when entering dark mode.
6. Light mode flash: a brief warm overlay (low-opacity yellow) that fades out over 400ms.

### Fallback

- If `document.startViewTransition` is undefined, fall back to instant theme swap with a CSS opacity fade.

### Acceptance criteria

- Theme toggles correctly in supporting browsers.
- Effect originates from the actual click coordinates, not the button center.
- No flash of unstyled content on initial page load.
- Total animation under 700ms.
- Reduced motion: instant swap with no animation.

---

## Phase 3: FAQ refinement

### What it does

Replace the basic accordion with a refined version: smooth height animation, dimming of inactive items, icon morph, staggered content reveal.

### Files

- `components/faq/FAQ.tsx` (refactor or new)
- `components/faq/FAQItem.tsx` (new)

### Implementation notes

- Animate open/close using `grid-template-rows: 0fr` collapsed to `1fr` expanded on a wrapper inside the item. This avoids `height: auto` jank.
- When one item is open, the others animate to 60% opacity.
- Plus icon rotates 45deg to become X when item opens.
- Answer content fades in with a per-element stagger (50ms between paragraphs or list items).
- Keyboard support: Tab through items, Enter/Space toggles, Arrow keys move between items.
- Confirm with user: allow multiple items open at once, or single-open mode? Default to single-open.

### Acceptance criteria

- Smooth open/close animation, no jank, no layout shift below the FAQ.
- Fully keyboard accessible.
- Screen reader announces expanded/collapsed state via `aria-expanded`.
- Works on mobile with comfortable tap targets.

---

## Phase 4: Work section, live preview tiles and before/after variants

### What it does

Each project card renders one of two variants based on its data. `live-preview` shows an interactive iframe of the live site. `before-after` shows a drag-to-reveal slider comparing old and new versions. Project data drives which variant renders.

### Files

- `lib/data/projects.ts` (extend with `displayType` field)
- `components/work/ProjectCard.tsx` (router component)
- `components/work/LivePreviewTile.tsx` (new)
- `components/work/BeforeAfterTile.tsx` (new)

### Data model addition

```ts
type Project = {
  // existing fields
  displayType: 'live-preview' | 'before-after';
  liveUrl?: string; // required for live-preview
  beforeImage?: string; // required for before-after
  afterImage?: string; // required for before-after
  posterImage: string; // fallback / initial state for live-preview
};
```

### Live preview tile

- Poster image shown by default (optimized AVIF or WebP).
- On hover OR when IntersectionObserver fires at 50% visibility, mount an iframe with `loading="lazy"` pointing at `liveUrl`.
- Cap one active iframe at a time. When a new card activates, the previous one unmounts back to its poster.
- Iframe needs a descriptive `title` attribute.

### Before/after tile

- Two images stacked. Top image clipped via `clip-path: inset(0 var(--reveal) 0 0)`.
- Drag handle controls `--reveal` from 0% to 100%.
- Mouse and touch event support (`pointerdown`, `pointermove`, `pointerup`).
- Keyboard accessible: handle focusable, arrow keys move reveal in 5% increments.
- Initial state: 50% revealed.

### Projects to configure initially

- Universally Us: `displayType: 'before-after'`, screenshots of old WordPress vs new Next.js build.
- Lead Generator AI: `displayType: 'live-preview'`.
- Luiz Meneghim portfolio: `displayType: 'live-preview'`.

### Acceptance criteria

- Both variants work on mobile.
- Iframe loading does not block initial page render.
- Slider handle responsive to both touch and mouse.
- Before/after images preload to avoid pop-in.

---

## Phase 5: Pricing calculator

### IMPORTANT: pricing values to be confirmed

The values in this section are a proposed model. Confirm with Luiz before final implementation. The component should read from a config file so values are easy to adjust later without code changes.

### What it does

Interactive calculator: pick site type, toggle features, choose page count, see live estimate. Snaps to an existing tier if close, or routes to custom quote if it exceeds the top tier.

### Files

- `lib/pricing/config.ts` (the model, easily editable)
- `components/pricing/Calculator.tsx` (new)
- `components/pricing/FeatureToggle.tsx` (new)
- `app/pricing/page.tsx` (integrate)

### Proposed pricing model

Base by site type:

- Brochure / info site: $500
- Business with forms or booking: $1,200
- E-commerce: $2,500
- Custom application: $3,500

Pages (5 included in base, each additional): $75

Feature add-ons:

- CMS / self-edit: $300
- Blog system: $200
- Online booking: $300
- Online payments: $500
- Multi-language: $400
- Newsletter integration: $150
- SEO package: $250
- Custom animations: $400
- Analytics dashboard: $200

Tier snap thresholds:

- Within ~15% of $750: show as Starter tier price
- Within ~15% of $2,000: show as Standard tier price
- Above $3,800: route to Custom, starting at $4,500

### UX requirements

- Estimate updates in real time as user toggles options.
- Subtle animation on price change (count-up to new number, around 300ms).
- Clear "this is a starting estimate" disclaimer.
- CTA changes contextually: tier-matched shows "Get Started," custom shows "Request Quote."
- All controls keyboard accessible.

### Acceptance criteria

- Pricing logic matches confirmed model exactly.
- All values derived from the config file (no hardcoded prices in the component).
- Mobile layout works at 375px width.
- Estimate visible at all times (sticky on mobile if needed).

---

## Recommended phase order

1. **Phase 2** (theme toggle): smallest scope, lets you verify the workflow before bigger features.
2. **Phase 3** (FAQ): low risk, immediate polish win.
3. **Phase 1** (hero): biggest visual impact. Do it once you have confidence in the workflow.
4. **Phase 4** (work tiles): needs project asset prep (screenshots for before/after), so this can happen in parallel with content gathering.
5. **Phase 5** (pricing): blocked on pricing model confirmation.

---

## Initial step

Do not write code yet. Confirm understanding of this plan, list any ambiguities, and propose where to start.
