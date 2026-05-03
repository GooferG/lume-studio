# Lume Studio Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Lume Studio marketing site MVP — a Next.js 16 site with seven-section homepage, four service pages, work case studies, pricing with quote form, contact with Cal.com booking, dark/light themes with liquid-metal hero, and lead-capture via Resend.

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind v4. Content split between MDX files (case studies, service deep-dives) and typed TS data files (packages, FAQ, etc.). Server Actions handle forms via Resend. `next-themes` drives dual-theme. Liquid-metal hero uses a WebGL shader with reduced-motion / mobile fallbacks. Deployed to Vercel.

**Tech Stack:**
- Next.js 16 (App Router), React 19+, TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` config)
- `next-themes`, `motion` (Framer Motion successor), `@paper-design/shaders-react`
- `@mdx-js/react`, `next-mdx-remote`, `gray-matter`, `zod`
- `resend`, `@radix-ui/react-accordion`, `lucide-react`
- Vitest + `@testing-library/react` for unit tests
- Vercel for hosting + Analytics + Speed Insights

---

## Reference: spec

All decisions come from `docs/superpowers/specs/2026-05-03-lume-studio-marketing-site-design.md`. When in doubt, reread the spec.

## Reference: testing scope

TDD applies to logic-heavy code only:
- Validation schemas (`lib/validation.ts`)
- Rate limit (`lib/ratelimit.ts`)
- Server Actions (`lib/actions/*.ts`)
- MDX loaders (`lib/mdx.ts`)

UI components are verified by `next dev` + manual visual inspection. No snapshot tests in v1 — they ossify the design while it's still settling.

---

## Task 1: Bootstrap project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `.prettierrc`, `.gitignore`, `.env.example`, `README.md`
- Create: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Init the project with create-next-app**

Run from the project root:

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint --turbopack --use-npm
```

Expected: scaffolds Next.js 16 with the App Router, Tailwind v4, TypeScript. If it asks about overwriting existing files, accept.

- [ ] **Step 2: Pin Next.js 16 and verify React version**

Open `package.json` and confirm `next` is `^16.0.0` (or whatever major is current). Confirm `react` and `react-dom` are `^19.0.0`. Run:

```bash
npm install
npm run dev
```

Expected: server starts on `http://localhost:3000`, default page renders. Stop the server (`Ctrl+C`).

- [ ] **Step 3: Configure TypeScript strict mode**

Open `tsconfig.json` and ensure `"strict": true`. Add `"noUncheckedIndexedAccess": true` and `"noFallthroughCasesInSwitch": true` to `compilerOptions`.

- [ ] **Step 4: Install dev tooling (ESLint + Prettier)**

```bash
npm install -D eslint @next/eslint-plugin-next eslint-config-next prettier eslint-config-prettier eslint-plugin-prettier
```

- [ ] **Step 5: Create ESLint config**

Create `.eslintrc.json`:

```json
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Install the Tailwind plugin:

```bash
npm install -D prettier-plugin-tailwindcss
```

- [ ] **Step 6: Add lint + format scripts**

In `package.json` `scripts`:

```json
{
  "lint": "next lint",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

- [ ] **Step 7: Create .env.example**

```bash
# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@yourdomain.com
RESEND_TO_EMAIL=you@yourdomain.com

# Cal.com (optional — embed link is public, but useful here for reference)
CAL_COM_USERNAME=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 8: Update README**

Replace `README.md` content with:

```markdown
# Lume Studio Marketing Site

Modern websites for small businesses. Built with Next.js 16, Tailwind v4, MDX.

## Setup

\`\`\`bash
cp .env.example .env.local
# fill in RESEND_API_KEY, etc.
npm install
npm run dev
\`\`\`

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- MDX content + typed TS data
- Resend (transactional email)
- Cal.com (booking embed)
- Vercel (hosting)
\`\`\`

- [ ] **Step 9: Commit**

```bash
git init
git add -A
git commit -m "chore: bootstrap Next.js 16 project"
```

---

## Task 2: Design tokens, fonts, globals

**Files:**
- Modify: `app/globals.css`
- Create: `app/fonts.ts`, `data/site.ts`

- [ ] **Step 1: Replace globals.css with design tokens**

Overwrite `app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Instrument Sans', system-ui, -apple-system, sans-serif;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-border: rgba(0, 0, 0, 0.08);
  --color-text: #0a0a0a;
  --color-text-muted: #555555;
  --color-primary: #0a0a0a;
  --color-primary-fg: #ffffff;
  --color-accent: #7c5cff;
  --color-accent-2: #3a8eff;
}

@layer base {
  :root[data-theme='dark'] {
    --color-bg: #0a0a0a;
    --color-surface: #0f0f12;
    --color-border: rgba(255, 255, 255, 0.08);
    --color-text: #ffffff;
    --color-text-muted: rgba(255, 255, 255, 0.6);
    --color-primary: #ffffff;
    --color-primary-fg: #0a0a0a;
  }

  html {
    color-scheme: light dark;
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    transition: background-color 200ms ease, color 200ms ease;
  }

  ::selection {
    background-color: var(--color-accent);
    color: white;
  }
}
```

- [ ] **Step 2: Set up fonts via next/font**

Create `app/fonts.ts`:

```ts
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
```

Update `globals.css` to use the next/font CSS variables — change the `@theme` block:

```css
--font-sans: var(--font-instrument-sans), system-ui, sans-serif;
--font-serif: var(--font-instrument-serif), Georgia, serif;
--font-mono: var(--font-jetbrains-mono), 'Fira Code', monospace;
```

- [ ] **Step 3: Create site config**

Create `data/site.ts`:

```ts
export const site = {
  name: 'Lume Studio',
  shortName: 'Lume',
  tagline: 'Modern websites, built right.',
  description:
    'Custom Next.js websites for small businesses. Real performance, real SEO, transparent pricing.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ownerName: 'Luiz Meneghim',
  ownerEmail: process.env.RESEND_TO_EMAIL ?? '',
  social: {
    github: 'https://github.com/luizmeneghim',
    linkedin: '',
    twitter: '',
  },
  calComUsername: process.env.NEXT_PUBLIC_CAL_COM_USERNAME ?? '',
} as const;

export type Site = typeof site;
```

- [ ] **Step 4: Wire fonts into root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { instrumentSans, instrumentSerif, jetbrainsMono } from './fonts';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Replace default homepage with placeholder**

Replace `app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-semibold tracking-tight">Lume Studio</h1>
    </main>
  );
}
```

- [ ] **Step 6: Verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm: white background, "Lume Studio" centered, Instrument Sans font loaded (DevTools → Computed → font-family).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(design): add color tokens, fonts, site config"
```

---

## Task 3: Theme provider and toggle

**Files:**
- Create: `app/providers.tsx`, `components/layout/ThemeToggle.tsx`, `lib/utils.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Install dependencies**

```bash
npm install next-themes lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Create cn utility**

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Create ThemeProvider wrapper**

Create `app/providers.tsx`:

```tsx
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="lume-theme"
    >
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 4: Add inline script to prevent theme flash**

Update `app/layout.tsx` to include an inline `<script>` in `<head>` that reads localStorage before hydration:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { instrumentSans, instrumentSerif, jetbrainsMono } from './fonts';
import { site } from '@/data/site';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('lume-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Build the ThemeToggle component**

Create `components/layout/ThemeToggle.tsx`:

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn('h-9 w-9', className)} aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full',
        'border border-[var(--color-border)] bg-[var(--color-surface)]',
        'text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors',
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
```

- [ ] **Step 6: Drop the toggle on the homepage to test**

Update `app/page.tsx`:

```tsx
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold tracking-tight">Lume Studio</h1>
      <ThemeToggle />
    </main>
  );
}
```

- [ ] **Step 7: Verify**

```bash
npm run dev
```

Click the toggle. Background flips between `#fafafa` and `#0a0a0a`. Refresh — theme persists. Open in another browser with system dark preference — defaults correctly. No flash on initial load.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(theme): add provider, toggle, flash prevention"
```

---

## Task 4: UI primitives (Button, Badge, Container)

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Badge.tsx`, `components/layout/Container.tsx`

- [ ] **Step 1: Build Container**

Create `components/layout/Container.tsx`:

```tsx
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Container({
  className,
  size = 'default',
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: 'default' | 'narrow' | 'wide' }) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return <div className={cn('mx-auto px-6 md:px-8', widths[size], className)} {...props} />;
}
```

- [ ] **Step 2: Build Button**

Create `components/ui/Button.tsx`:

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90 active:scale-[.98]',
  secondary:
    'bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]',
  ghost: 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = href.startsWith('http');
  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
```

- [ ] **Step 3: Build Badge**

Create `components/ui/Badge.tsx`:

```tsx
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Badge({
  className,
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider',
        variant === 'default'
          ? 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
          : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30',
        className,
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Render-test in homepage**

Temporarily update `app/page.tsx` to render all three primitives in different variants and verify they look right in both themes:

```tsx
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Container } from '@/components/layout/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  return (
    <Container className="py-24 space-y-6">
      <ThemeToggle />
      <div className="flex gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-3">
        <ButtonLink href="/" variant="primary">
          See pricing
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Book a call
        </ButtonLink>
      </div>
      <div className="flex gap-3">
        <Badge>Default badge</Badge>
        <Badge variant="accent">Accent badge</Badge>
      </div>
    </Container>
  );
}
```

Run `npm run dev`, visually verify both themes. Then revert page.tsx to the simple "Lume Studio" placeholder for now.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ui): add Button, Badge, Container primitives"
```

---

## Task 5: Nav and Footer

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/Footer.tsx`
- Create: `data/nav.ts`

- [ ] **Step 1: Create nav data**

Create `data/nav.ts`:

```ts
export const mainNav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  primary: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
  ],
  secondary: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [{ label: 'Privacy', href: '/privacy' }],
} as const;
```

- [ ] **Step 2: Build Nav**

Create `components/layout/Nav.tsx`:

```tsx
import Link from 'next/link';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { mainNav } from '@/data/nav';
import { site } from '@/data/site';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--color-bg)]/70 border-b border-[var(--color-border)]">
      <Container className="flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-semibold tracking-wide text-sm"
          aria-label={`${site.name} home`}
        >
          {site.name.toUpperCase()}
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
```

(Mobile menu is intentionally minimal in v1 — just the theme toggle. Hamburger menu can be a phase-1.5 addition; the spec doesn't require it for launch.)

- [ ] **Step 3: Build Footer**

Create `components/layout/Footer.tsx`:

```tsx
import Link from 'next/link';
import { Container } from './Container';
import { site } from '@/data/site';
import { footerNav } from '@/data/nav';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-12">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-semibold tracking-wide text-sm">{site.name.toUpperCase()}</div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)] max-w-xs">{site.tagline}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Site
          </div>
          <ul className="space-y-2 text-sm">
            {[...footerNav.primary, ...footerNav.secondary].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Legal
          </div>
          <ul className="space-y-2 text-sm">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-10 pt-6 border-t border-[var(--color-border)] flex justify-between text-xs text-[var(--color-text-muted)]">
        <span>
          © {year} {site.name}
        </span>
        <span>Built with Next.js</span>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Wire into root layout**

Update `app/layout.tsx` body:

```tsx
<body>
  <Providers>
    <Nav />
    {children}
    <Footer />
  </Providers>
</body>
```

Add the imports:

```tsx
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Confirm: nav sticks to top, links present (they 404 — that's expected for now), footer at bottom, both render correctly in both themes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(layout): add Nav and Footer with theme toggle"
```

---

## Task 6: Data files (packages, services, process, FAQ)

**Files:**
- Create: `data/packages.ts`, `data/services.ts`, `data/process.ts`, `data/faq.ts`

- [ ] **Step 1: Packages**

Create `data/packages.ts`:

```ts
export type Package = {
  slug: 'starter' | 'business' | 'custom';
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlight: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export const packages: Package[] = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '$750',
    description: 'A clean, fast site for a focused offering.',
    features: [
      'Up to 5 pages',
      'Mobile-responsive design',
      'Basic on-page SEO',
      '1 round of revisions',
      'Vercel deploy + free SSL',
      'Contact form',
    ],
    highlight: false,
    ctaLabel: 'Get started',
    ctaHref: '/contact',
  },
  {
    slug: 'business',
    name: 'Business',
    price: '$2,000',
    priceNote: 'Most popular',
    description: 'A full marketing site with content you can grow.',
    features: [
      'Up to 10 pages',
      'MDX/CMS-ready content',
      'Advanced SEO (sitemap, structured data, OG)',
      'Lighthouse-tuned (≥ 95)',
      '2 rounds of revisions',
      'Contact form + analytics',
      'Optional blog setup',
    ],
    highlight: true,
    ctaLabel: 'Get started',
    ctaHref: '/contact',
  },
  {
    slug: 'custom',
    name: 'Custom',
    price: '$4,500+',
    description: 'Bespoke build with integrations and a CMS.',
    features: [
      'Full custom design',
      'Unlimited pages',
      'Headless CMS integration',
      'Third-party integrations (Stripe, booking, etc.)',
      'Unlimited revisions during build',
      'Post-launch support window',
    ],
    highlight: false,
    ctaLabel: 'Request a quote',
    ctaHref: '/pricing#quote',
  },
];
```

- [ ] **Step 2: Services**

Create `data/services.ts`:

```ts
export type Service = {
  slug: 'web-build' | 'migrations' | 'hosting' | 'optimizations';
  title: string;
  shortTitle: string;
  summary: string;
  icon: 'sparkles' | 'arrow-right-left' | 'server' | 'zap';
};

export const services: Service[] = [
  {
    slug: 'web-build',
    title: 'Custom website builds',
    shortTitle: 'Web Build',
    summary: 'Modern Next.js sites designed and built around your business.',
    icon: 'sparkles',
  },
  {
    slug: 'migrations',
    title: 'Site migrations',
    shortTitle: 'Migrations',
    summary: 'Move your old site to a fast, modern stack — without losing SEO.',
    icon: 'arrow-right-left',
  },
  {
    slug: 'hosting',
    title: 'Hosting & domains',
    shortTitle: 'Hosting',
    summary: 'Vercel deploys, custom domains, DNS, SSL — all configured for you.',
    icon: 'server',
  },
  {
    slug: 'optimizations',
    title: 'Speed & SEO optimization',
    shortTitle: 'Optimization',
    summary: 'Make an existing site faster, more accessible, and easier to find.',
    icon: 'zap',
  },
];
```

- [ ] **Step 3: Process**

Create `data/process.ts`:

```ts
export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'A 15-minute call to understand your business, goals, and constraints.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Mockups for your approval before any code is written.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Modern Next.js, Tailwind, and a stack that will age well.',
  },
  {
    number: '04',
    title: 'Ship',
    description: 'Deployed, handed over, and yours to keep — code and all.',
  },
];
```

- [ ] **Step 4: FAQ**

Create `data/faq.ts`:

```ts
export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: 'How long does a build take?',
    answer:
      'Starter sites take 1–2 weeks, Business sites 2–3 weeks, Custom is scoped per project on the discovery call.',
  },
  {
    question: 'Do I own the site afterward?',
    answer:
      'Yes — full code ownership. The repo is handed over and you can host it anywhere. There is no lock-in.',
  },
  {
    question: 'What about hosting and domains?',
    answer:
      'I set up Vercel and connect your domain. The accounts stay in your name; you keep full control after handoff.',
  },
  {
    question: 'What if I need changes after launch?',
    answer:
      'Pick an hourly rate or a small monthly retainer for ongoing tweaks. We can also leave a CMS in place so you can edit content yourself.',
  },
  {
    question: 'Can you migrate my old site?',
    answer:
      'Yes — that is a service of its own. I move content, set up redirects, and preserve your SEO so you do not lose ranking.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Fifty percent deposit, fifty percent on launch. Invoices are sent through Stripe.',
  },
  {
    question: 'What is not included?',
    answer:
      'Logo design, custom photography, and ongoing copywriting are not included by default. I can refer trusted partners for any of those.',
  },
];
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(data): add packages, services, process, FAQ data"
```

---

## Task 7: Section primitives and cards

**Files:**
- Create: `components/sections/SectionLabel.tsx`, `components/sections/Section.tsx`
- Create: `components/cards/ServiceCard.tsx`, `components/cards/PackageCard.tsx`, `components/cards/WorkCard.tsx`

- [ ] **Step 1: SectionLabel and Section wrapper**

Create `components/sections/SectionLabel.tsx`:

```tsx
import { cn } from '@/lib/utils';

export function SectionLabel({
  number,
  children,
  className,
}: {
  number?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]',
        className,
      )}
    >
      {number ? <span className="opacity-70 mr-2">{number} ·</span> : null}
      {children}
    </div>
  );
}
```

Create `components/sections/Section.tsx`:

```tsx
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

export function Section({
  className,
  children,
  containerSize,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  containerSize?: 'narrow' | 'default' | 'wide';
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
```

- [ ] **Step 2: Service icon helper**

Append to `components/cards/ServiceCard.tsx`:

```tsx
import { ArrowRight, Sparkles, ArrowRightLeft, Server, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Service } from '@/data/services';

const icons = {
  sparkles: Sparkles,
  'arrow-right-left': ArrowRightLeft,
  server: Server,
  zap: Zap,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]',
        'p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40',
      )}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
        <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
      </div>
      <h3 className="mt-6 font-semibold text-base">{service.shortTitle}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {service.summary}
      </p>
    </Link>
  );
}
```

- [ ] **Step 3: PackageCard**

Create `components/cards/PackageCard.tsx`:

```tsx
import { Check } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Package } from '@/data/packages';

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 md:p-8 flex flex-col',
        pkg.highlight
          ? 'border-2 border-[var(--color-accent)] bg-[var(--color-surface)] shadow-lg shadow-[var(--color-accent)]/10'
          : 'border border-[var(--color-border)] bg-[var(--color-surface)]',
      )}
    >
      {pkg.priceNote ? (
        <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-accent)] mb-2">
          {pkg.priceNote}
        </div>
      ) : (
        <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-text-muted)] mb-2">
          {pkg.name}
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{pkg.description}</p>
      <ul className="mt-6 space-y-3 flex-1">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 mt-0.5 text-[var(--color-accent)] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={pkg.ctaHref}
        variant={pkg.highlight ? 'primary' : 'secondary'}
        className="mt-8 w-full"
      >
        {pkg.ctaLabel}
      </ButtonLink>
    </div>
  );
}
```

- [ ] **Step 4: WorkCard**

Create `components/cards/WorkCard.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  cover: string;
  stack: string[];
};

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn(
        'group block rounded-xl overflow-hidden border border-[var(--color-border)]',
        'bg-[var(--color-surface)] transition-all hover:-translate-y-0.5',
      )}
    >
      <div className="relative aspect-[16/10] bg-[var(--color-bg)] overflow-hidden">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.client}</div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0" />
        </div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 5: Add a placeholder cover image**

Save any landscape image to `public/images/work/universally-us-cover.jpg` (a screenshot from universallyus.com works). For now, you can use a 1280x800 placeholder via an actual file.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(components): add section primitives and card components"
```

---

## Task 8: Homepage sections (non-hero)

**Files:**
- Create: `components/sections/ServicesPreview.tsx`, `components/sections/SelectedWork.tsx`, `components/sections/Packages.tsx`, `components/sections/Process.tsx`, `components/sections/FAQ.tsx`, `components/sections/FinalCTA.tsx`

- [ ] **Step 1: Install Radix accordion**

```bash
npm install @radix-ui/react-accordion
```

- [ ] **Step 2: ServicesPreview**

Create `components/sections/ServicesPreview.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { services } from '@/data/services';

export function ServicesPreview() {
  return (
    <Section id="services">
      <SectionLabel number="02">Services</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        What I do
      </h2>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-xl">
        Four focused services that cover everything from a brand-new site to fixing the one you
        already have.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: SelectedWork**

Create `components/sections/SelectedWork.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { ButtonLink } from '@/components/ui/Button';

const featuredWork: WorkItem[] = [
  {
    slug: 'universally-us',
    title: 'Universally Us',
    client: 'Informational platform',
    summary:
      'A headless-CMS-driven content site built on Next.js, focused on accessibility and performance.',
    cover: '/images/work/universally-us-cover.jpg',
    stack: ['Next.js', 'Headless CMS', 'Tailwind'],
  },
];

export function SelectedWork() {
  return (
    <Section id="work">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <SectionLabel number="03">Selected work</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Recent builds</h2>
        </div>
        <ButtonLink href="/work" variant="ghost" size="sm">
          See all work →
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {featuredWork.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Packages**

Create `components/sections/Packages.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { PackageCard } from '@/components/cards/PackageCard';
import { packages } from '@/data/packages';

export function Packages() {
  return (
    <Section id="pricing">
      <SectionLabel number="04">Pricing</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        Transparent pricing
      </h2>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-xl">
        Pick a package or request a custom quote. No hidden fees, no surprise renewals.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Process**

Create `components/sections/Process.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { process } from '@/data/process';

export function Process() {
  return (
    <Section id="process">
      <SectionLabel number="05">Process</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        How it works
      </h2>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step) => (
          <div key={step.number}>
            <div className="text-3xl font-mono text-[var(--color-text-muted)]">{step.number}</div>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: FAQ**

Create `components/sections/FAQ.tsx`:

```tsx
'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { faq } from '@/data/faq';

export function FAQ() {
  return (
    <Section id="faq" containerSize="narrow">
      <SectionLabel number="06">FAQ</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Common questions</h2>
      <Accordion.Root type="single" collapsible className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {faq.map((item, idx) => (
          <Accordion.Item key={idx} value={`item-${idx}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-base font-medium hover:text-[var(--color-accent)] transition-colors">
                {item.question}
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm text-[var(--color-text-muted)] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pb-5 pr-8">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Section>
  );
}
```

Add accordion animation keyframes to `app/globals.css` inside `@theme`:

```css
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

And in the same file, add:

```css
@layer utilities {
  .animate-accordion-down { animation: accordion-down 200ms ease-out; }
  .animate-accordion-up { animation: accordion-up 200ms ease-out; }
}
```

- [ ] **Step 7: FinalCTA**

Create `components/sections/FinalCTA.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { ButtonLink } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <Section id="cta">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-accent)]/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <SectionLabel number="07" className="justify-center inline-block">
            Get started
          </SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Ready to build a site you&rsquo;re proud of?
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)] max-w-md mx-auto">
            Book a 15-minute call or send a quote request. No commitment.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <ButtonLink href="/contact">Book a call</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              Get a quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(sections): add homepage section components"
```

---

## Task 9: Hero (static gradient version) and homepage assembly

**Files:**
- Create: `components/hero/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build Hero with static gradient placeholder**

Create `components/hero/Hero.tsx`:

```tsx
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(58,142,255,0.15), transparent 60%)',
        }}
      />
      <Container className="py-24 md:py-36">
        <SectionLabel>{site.name} · Web services for small business</SectionLabel>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
          Modern websites,
          <br />
          <span className="text-[var(--color-text-muted)]">built right.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
          {site.description}
        </p>
        <div className="mt-10 flex gap-3 flex-wrap">
          <ButtonLink href="/pricing" size="lg">
            See pricing
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Book a call
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Assemble homepage**

Replace `app/page.tsx`:

```tsx
import { Hero } from '@/components/hero/Hero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Packages } from '@/components/sections/Packages';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <SelectedWork />
      <Packages />
      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Walk through the homepage in both themes. All seven sections should render. FAQ accordion should open/close. Theme toggle should flip everything cleanly. Note any visual issues to address.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(home): assemble homepage with hero and all sections"
```

---

## Task 10: Liquid metal shader hero background

**Files:**
- Create: `components/hero/LiquidMetalBackground.tsx`
- Modify: `components/hero/Hero.tsx`

- [ ] **Step 1: Install shader package**

```bash
npm install @paper-design/shaders-react
```

(If this package's API has changed since this plan was written, check its README for the current `<MeshGradient>` or `<LiquidMetal>` component name and props. The pattern below assumes a `LiquidMetal` component with `colors`, `speed`, and `style` props.)

- [ ] **Step 2: Build LiquidMetalBackground component**

Create `components/hero/LiquidMetalBackground.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { LiquidMetal } from '@paper-design/shaders-react';

const DARK_COLORS = ['#0a0a0a', '#1a1438', '#7c5cff', '#3a8eff'];
const LIGHT_COLORS = ['#fafafa', '#e8ddff', '#7c5cff', '#3a8eff'];

export function LiquidMetalBackground() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
        window.innerWidth < 640);
    if (!reduced && !lowEnd) setEnabled(true);

    const onVisibility = () => setIsVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(58,142,255,0.15), transparent 60%)',
        }}
      />
    );
  }

  const colors = resolvedTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <LiquidMetal
        colors={colors}
        speed={isVisible ? 0.6 : 0}
        style={{ width: '100%', height: '100%', opacity: resolvedTheme === 'dark' ? 0.6 : 0.4 }}
      />
    </div>
  );
}
```

If the `@paper-design/shaders-react` API differs, swap to whichever component the package exposes for animated metallic/liquid backgrounds. The wrapping logic (reduced-motion / low-end / visibility) stays the same.

- [ ] **Step 3: Wire into Hero**

Update `components/hero/Hero.tsx` — replace the static gradient `<div>` with `<LiquidMetalBackground />`:

```tsx
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { LiquidMetalBackground } from './LiquidMetalBackground';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <LiquidMetalBackground />
      <Container className="py-24 md:py-36">
        {/* ...rest unchanged */}
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Confirm: hero background is animated liquid metal, both themes look right, animation pauses when you switch tabs (verify with DevTools → Performance tab; CPU should drop). On a window narrower than 640px, you should see the static gradient instead.

Test with reduced motion: macOS → System Settings → Accessibility → Display → Reduce motion. Reload the page; the static gradient should be shown.

- [ ] **Step 5: Lighthouse check**

Run a Lighthouse audit (Chrome DevTools → Lighthouse → Mobile). Performance score must be ≥ 90 with the shader enabled. If it isn't, lower the shader opacity, reduce `speed`, or expand the low-end heuristic to disable on more devices.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(hero): add liquid-metal animated background with reduced-motion + mobile fallback"
```

---

## Task 11: Vitest setup and validation schemas (TDD)

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`, `lib/validation.ts`, `tests/validation.test.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Create vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
  },
});
```

Create `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add to `package.json` scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Install zod**

```bash
npm install zod
```

- [ ] **Step 4: Write the failing test for QuoteFormSchema**

Create `tests/validation.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { QuoteFormSchema, ContactFormSchema } from '@/lib/validation';

describe('QuoteFormSchema', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    businessName: 'Doe Bakery',
    currentSiteUrl: 'https://oldsite.com',
    projectType: 'build' as const,
    budgetRange: '1k-3k' as const,
    timeline: 'flexible' as const,
    message: 'I need a new site for my bakery.',
    honeypot: '',
  };

  it('accepts a valid payload', () => {
    expect(QuoteFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects when honeypot is filled', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, honeypot: 'spam' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects missing required fields', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, name: '', message: '' });
    expect(result.success).toBe(false);
  });

  it('treats currentSiteUrl as optional', () => {
    const { currentSiteUrl, ...rest } = valid;
    void currentSiteUrl;
    expect(QuoteFormSchema.safeParse(rest).success).toBe(true);
  });

  it('rejects an invalid currentSiteUrl', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, currentSiteUrl: 'not a url' });
    expect(result.success).toBe(false);
  });
});

describe('ContactFormSchema', () => {
  const valid = {
    name: 'Jane',
    email: 'jane@example.com',
    message: 'Hello.',
    honeypot: '',
  };

  it('accepts a valid payload', () => {
    expect(ContactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects empty message', () => {
    expect(ContactFormSchema.safeParse({ ...valid, message: '' }).success).toBe(false);
  });
});
```

- [ ] **Step 5: Run the test and confirm it fails**

```bash
npm test
```

Expected: failure — `lib/validation.ts` does not exist yet.

- [ ] **Step 6: Implement validation schemas**

Create `lib/validation.ts`:

```ts
import { z } from 'zod';

export const PROJECT_TYPES = ['build', 'migrate', 'optimize', 'hosting', 'other'] as const;
export const BUDGET_RANGES = ['<1k', '1k-3k', '3k-5k', '5k+', 'unsure'] as const;
export const TIMELINES = ['asap', '1mo', '1-3mo', 'flexible'] as const;

export const QuoteFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Enter a valid email').max(200),
  businessName: z.string().max(200).optional().or(z.literal('')),
  currentSiteUrl: z
    .string()
    .url('Enter a valid URL')
    .max(500)
    .optional()
    .or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  timeline: z.enum(TIMELINES),
  message: z.string().min(10, 'Tell me a bit more').max(5000),
  honeypot: z.string().max(0, 'Bot detected'),
});
export type QuoteFormInput = z.infer<typeof QuoteFormSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(5).max(5000),
  honeypot: z.string().max(0),
});
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
```

- [ ] **Step 7: Run tests and confirm they pass**

```bash
npm test
```

Expected: all `validation.test.ts` tests pass.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(forms): add zod validation schemas with tests"
```

---

## Task 12: Rate limit infrastructure (TDD)

**Files:**
- Create: `lib/ratelimit.ts`, `tests/ratelimit.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/ratelimit.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, _resetRateLimitForTests } from '@/lib/ratelimit';

describe('checkRateLimit', () => {
  beforeEach(() => _resetRateLimitForTests());

  it('allows the first request from a key', () => {
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 })).toEqual({
      allowed: true,
      remaining: 2,
    });
  });

  it('counts subsequent requests in the same window', () => {
    checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 })).toEqual({
      allowed: true,
      remaining: 0,
    });
  });

  it('blocks when limit is exceeded', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 }).allowed).toBe(false);
  });

  it('keys are independent', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('5.6.7.8', { max: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('resets after the window passes', () => {
    const now = Date.now();
    checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now });
    expect(checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now }).allowed).toBe(false);
    expect(
      checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now: now + 1500 }).allowed,
    ).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test, confirm it fails**

```bash
npm test
```

Expected: failure — `lib/ratelimit.ts` does not exist.

- [ ] **Step 3: Implement rate limit**

Create `lib/ratelimit.ts`:

```ts
type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

export type RateLimitOptions = {
  max: number;
  windowMs: number;
  now?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

export function checkRateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = opts.now ?? Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: Math.max(0, opts.max - 1) };
  }

  if (existing.count >= opts.max) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: Math.max(0, opts.max - existing.count) };
}

export function _resetRateLimitForTests() {
  buckets.clear();
}
```

- [ ] **Step 4: Run tests, confirm they pass**

```bash
npm test
```

Expected: all `ratelimit.test.ts` tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(ratelimit): add in-memory rate limit with tests"
```

---

## Task 13: Email infrastructure

**Files:**
- Create: `lib/email.ts`

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Build email module**

Create `lib/email.ts`:

```ts
import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    resendClient = new Resend(key);
  }
  return resendClient;
}

export async function sendQuoteEmail(payload: {
  name: string;
  email: string;
  businessName?: string;
  currentSiteUrl?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'hello@lume.studio';
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error('RESEND_TO_EMAIL is not set');

  const subject = `New quote request from ${payload.name}`;
  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Business:</strong> ${escapeHtml(payload.businessName ?? '—')}</p>
    <p><strong>Current site:</strong> ${escapeHtml(payload.currentSiteUrl ?? '—')}</p>
    <p><strong>Project type:</strong> ${escapeHtml(payload.projectType)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(payload.budgetRange)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline)}</p>
    <hr/>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>
  `;
  return getResend().emails.send({ from, to, subject, html, replyTo: payload.email });
}

export async function sendContactEmail(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'hello@lume.studio';
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error('RESEND_TO_EMAIL is not set');

  const subject = `New contact message from ${payload.name}`;
  const html = `
    <h2>New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <hr/>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>
  `;
  return getResend().emails.send({ from, to, subject, html, replyTo: payload.email });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(email): add Resend client wrapper for quote and contact"
```

---

## Task 14: Server Actions (TDD)

**Files:**
- Create: `lib/actions/submitQuote.ts`, `lib/actions/submitContact.ts`, `tests/actions.test.ts`

- [ ] **Step 1: Write failing tests for actions**

Create `tests/actions.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { _resetRateLimitForTests } from '@/lib/ratelimit';

vi.mock('@/lib/email', () => ({
  sendQuoteEmail: vi.fn().mockResolvedValue({ data: { id: 'fake' }, error: null }),
  sendContactEmail: vi.fn().mockResolvedValue({ data: { id: 'fake' }, error: null }),
}));

vi.mock('next/headers', () => ({
  headers: () => new Headers([['x-forwarded-for', '1.2.3.4']]),
}));

import { submitQuote } from '@/lib/actions/submitQuote';
import { submitContact } from '@/lib/actions/submitContact';
import * as email from '@/lib/email';

function quoteFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', 'Jane Doe');
  fd.append('email', 'jane@example.com');
  fd.append('businessName', 'Doe Bakery');
  fd.append('currentSiteUrl', '');
  fd.append('projectType', 'build');
  fd.append('budgetRange', '1k-3k');
  fd.append('timeline', 'flexible');
  fd.append('message', 'I need a website for my bakery.');
  fd.append('honeypot', '');
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  return fd;
}

function contactFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', 'Jane');
  fd.append('email', 'jane@example.com');
  fd.append('message', 'Hello there.');
  fd.append('honeypot', '');
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  return fd;
}

describe('submitQuote', () => {
  beforeEach(() => {
    _resetRateLimitForTests();
    vi.clearAllMocks();
  });

  it('returns success for valid data and sends email', async () => {
    const result = await submitQuote(undefined, quoteFormData());
    expect(result.status).toBe('success');
    expect(email.sendQuoteEmail).toHaveBeenCalledTimes(1);
  });

  it('returns validation error for invalid data', async () => {
    const result = await submitQuote(undefined, quoteFormData({ email: 'not-an-email' }));
    expect(result.status).toBe('error');
    expect(email.sendQuoteEmail).not.toHaveBeenCalled();
  });

  it('rejects honeypot submissions silently as success but does not email', async () => {
    const result = await submitQuote(undefined, quoteFormData({ honeypot: 'bot' }));
    expect(result.status).toBe('success');
    expect(email.sendQuoteEmail).not.toHaveBeenCalled();
  });

  it('rate-limits after 5 submissions per IP', async () => {
    for (let i = 0; i < 5; i++) await submitQuote(undefined, quoteFormData());
    const result = await submitQuote(undefined, quoteFormData());
    expect(result.status).toBe('error');
    expect(result.message).toMatch(/too many/i);
  });
});

describe('submitContact', () => {
  beforeEach(() => {
    _resetRateLimitForTests();
    vi.clearAllMocks();
  });

  it('returns success for valid data and sends email', async () => {
    const result = await submitContact(undefined, contactFormData());
    expect(result.status).toBe('success');
    expect(email.sendContactEmail).toHaveBeenCalledTimes(1);
  });

  it('returns error when message is too short', async () => {
    const result = await submitContact(undefined, contactFormData({ message: 'hi' }));
    expect(result.status).toBe('error');
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
npm test
```

Expected: failures — actions don't exist.

- [ ] **Step 3: Implement submitQuote**

Create `lib/actions/submitQuote.ts`:

```ts
'use server';

import { headers } from 'next/headers';
import { QuoteFormSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';
import { sendQuoteEmail } from '@/lib/email';

export type ActionState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

const RATE = { max: 5, windowMs: 60 * 60 * 1000 }; // 5 per hour per IP

export async function submitQuote(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    businessName: String(formData.get('businessName') ?? ''),
    currentSiteUrl: String(formData.get('currentSiteUrl') ?? ''),
    projectType: String(formData.get('projectType') ?? ''),
    budgetRange: String(formData.get('budgetRange') ?? ''),
    timeline: String(formData.get('timeline') ?? ''),
    message: String(formData.get('message') ?? ''),
    honeypot: String(formData.get('honeypot') ?? ''),
  };

  const parsed = QuoteFormSchema.safeParse(raw);

  // Honeypot tripped — silent success
  if (raw.honeypot && raw.honeypot.length > 0) {
    return { status: 'success', message: 'Thanks — I will be in touch soon.' };
  }

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const limit = checkRateLimit(`quote:${ip}`, RATE);
  if (!limit.allowed) {
    return { status: 'error', message: 'Too many requests. Please try again later.' };
  }

  try {
    const data = parsed.data;
    await sendQuoteEmail({
      name: data.name,
      email: data.email,
      businessName: data.businessName || undefined,
      currentSiteUrl: data.currentSiteUrl || undefined,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
    });
    return { status: 'success', message: 'Thanks — I will be in touch within 1 business day.' };
  } catch (err) {
    console.error('submitQuote send failed', err);
    return {
      status: 'error',
      message: 'Sending failed. Please email me directly instead.',
    };
  }
}
```

- [ ] **Step 4: Implement submitContact**

Create `lib/actions/submitContact.ts`:

```ts
'use server';

import { headers } from 'next/headers';
import { ContactFormSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';
import { sendContactEmail } from '@/lib/email';
import type { ActionState } from './submitQuote';

const RATE = { max: 5, windowMs: 60 * 60 * 1000 };

export async function submitContact(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    honeypot: String(formData.get('honeypot') ?? ''),
  };

  if (raw.honeypot && raw.honeypot.length > 0) {
    return { status: 'success', message: 'Thanks — I will be in touch soon.' };
  }

  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const limit = checkRateLimit(`contact:${ip}`, RATE);
  if (!limit.allowed) {
    return { status: 'error', message: 'Too many requests. Please try again later.' };
  }

  try {
    await sendContactEmail(parsed.data);
    return { status: 'success', message: 'Thanks — message received.' };
  } catch (err) {
    console.error('submitContact send failed', err);
    return { status: 'error', message: 'Sending failed. Please email me directly instead.' };
  }
}
```

- [ ] **Step 5: Run tests, confirm pass**

```bash
npm test
```

Expected: all action tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(actions): add submitQuote and submitContact server actions with tests"
```

---

## Task 15: Form components

**Files:**
- Create: `components/forms/FormField.tsx`, `components/forms/SubmitButton.tsx`, `components/forms/QuoteForm.tsx`, `components/forms/ContactForm.tsx`

- [ ] **Step 1: FormField wrapper**

Create `components/forms/FormField.tsx`:

```tsx
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
  required,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]"
      >
        {label}
        {required ? <span className="text-[var(--color-accent)] ml-1">*</span> : null}
      </label>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </div>
  );
}

const inputBase =
  'w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 ' +
  'text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] ' +
  'focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]';

export const inputClass = inputBase;
```

- [ ] **Step 2: SubmitButton**

Create `components/forms/SubmitButton.tsx`:

```tsx
'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/Button';

export function SubmitButton({ idleLabel = 'Submit' }: { idleLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending…' : idleLabel}
    </Button>
  );
}
```

- [ ] **Step 3: QuoteForm**

Create `components/forms/QuoteForm.tsx`:

```tsx
'use client';

import { useActionState } from 'react';
import { submitQuote, type ActionState } from '@/lib/actions/submitQuote';
import { FormField, inputClass } from './FormField';
import { SubmitButton } from './SubmitButton';
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from '@/lib/validation';
import { site } from '@/data/site';

const initial: ActionState = { status: 'idle' };

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initial);

  if (state.status === 'success') {
    return (
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6">
        <h3 className="font-semibold">Got it.</h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{state.message}</p>
      </div>
    );
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="grid gap-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" htmlFor="name" required error={fieldErrors.name?.[0]}>
          <input id="name" name="name" type="text" required className={inputClass} autoComplete="name" />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={fieldErrors.email?.[0]}>
          <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Business name" htmlFor="businessName" error={fieldErrors.businessName?.[0]}>
          <input id="businessName" name="businessName" type="text" className={inputClass} autoComplete="organization" />
        </FormField>
        <FormField label="Current site URL" htmlFor="currentSiteUrl" error={fieldErrors.currentSiteUrl?.[0]}>
          <input id="currentSiteUrl" name="currentSiteUrl" type="url" placeholder="https://" className={inputClass} />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Project type" htmlFor="projectType" required error={fieldErrors.projectType?.[0]}>
          <select id="projectType" name="projectType" defaultValue="build" required className={inputClass}>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Budget" htmlFor="budgetRange" required error={fieldErrors.budgetRange?.[0]}>
          <select id="budgetRange" name="budgetRange" required className={inputClass}>
            <option value="">Select…</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Timeline" htmlFor="timeline" required error={fieldErrors.timeline?.[0]}>
          <select id="timeline" name="timeline" required className={inputClass}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Message" htmlFor="message" required error={fieldErrors.message?.[0]}>
        <textarea id="message" name="message" required rows={6} className={inputClass} placeholder="Tell me about your project — what you have, what you want, any constraints." />
      </FormField>
      {state.status === 'error' && !state.fieldErrors ? (
        <p className="text-sm text-red-500">
          {state.message} You can also email me directly at{' '}
          <a className="underline" href={`mailto:${site.ownerEmail}`}>
            {site.ownerEmail}
          </a>
          .
        </p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton idleLabel="Send request" />
      </div>
    </form>
  );
}
```

- [ ] **Step 4: ContactForm**

Create `components/forms/ContactForm.tsx`:

```tsx
'use client';

import { useActionState } from 'react';
import { submitContact } from '@/lib/actions/submitContact';
import type { ActionState } from '@/lib/actions/submitQuote';
import { FormField, inputClass } from './FormField';
import { SubmitButton } from './SubmitButton';
import { site } from '@/data/site';

const initial: ActionState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.status === 'success') {
    return (
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6">
        <h3 className="font-semibold">Got it.</h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{state.message}</p>
      </div>
    );
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="grid gap-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />
      <FormField label="Name" htmlFor="c-name" required error={fieldErrors.name?.[0]}>
        <input id="c-name" name="name" type="text" required className={inputClass} autoComplete="name" />
      </FormField>
      <FormField label="Email" htmlFor="c-email" required error={fieldErrors.email?.[0]}>
        <input id="c-email" name="email" type="email" required className={inputClass} autoComplete="email" />
      </FormField>
      <FormField label="Message" htmlFor="c-message" required error={fieldErrors.message?.[0]}>
        <textarea id="c-message" name="message" required rows={6} className={inputClass} />
      </FormField>
      {state.status === 'error' && !state.fieldErrors ? (
        <p className="text-sm text-red-500">
          {state.message} Or email me directly:{' '}
          <a className="underline" href={`mailto:${site.ownerEmail}`}>
            {site.ownerEmail}
          </a>
        </p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton idleLabel="Send" />
      </div>
    </form>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(forms): add QuoteForm and ContactForm with progressive enhancement"
```

---

## Task 16: MDX content infrastructure (TDD)

**Files:**
- Create: `lib/mdx.ts`, `tests/mdx.test.ts`, `components/mdx/MdxComponents.tsx`, `components/mdx/Screenshot.tsx`, `components/mdx/Callout.tsx`
- Create: directories `content/services/`, `content/work/`

- [ ] **Step 1: Install MDX deps**

```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Write the failing tests**

Create `tests/mdx.test.ts`:

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { loadMdxEntries, loadMdxBySlug } from '@/lib/mdx';

const tmp = path.join(process.cwd(), 'tests', '_fixtures', 'mdx');

beforeAll(() => {
  if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  writeFileSync(
    path.join(tmp, 'first.mdx'),
    `---\ntitle: First\nslug: first\norder: 1\n---\nBody A`,
  );
  writeFileSync(
    path.join(tmp, 'second.mdx'),
    `---\ntitle: Second\nslug: second\norder: 2\n---\nBody B`,
  );
});

describe('loadMdxEntries', () => {
  it('returns frontmatter for all .mdx files in a directory', async () => {
    const items = await loadMdxEntries(tmp);
    expect(items.length).toBe(2);
    expect(items.map((i) => i.frontmatter.slug).sort()).toEqual(['first', 'second']);
  });

  it('orders by frontmatter.order ascending if present', async () => {
    const items = await loadMdxEntries(tmp);
    expect(items[0].frontmatter.slug).toBe('first');
    expect(items[1].frontmatter.slug).toBe('second');
  });
});

describe('loadMdxBySlug', () => {
  it('returns frontmatter and body for the matching slug', async () => {
    const item = await loadMdxBySlug(tmp, 'first');
    expect(item).not.toBeNull();
    expect(item?.frontmatter.title).toBe('First');
    expect(item?.body).toContain('Body A');
  });

  it('returns null for missing slug', async () => {
    expect(await loadMdxBySlug(tmp, 'nope')).toBeNull();
  });
});
```

- [ ] **Step 3: Run, confirm fail**

```bash
npm test
```

- [ ] **Step 4: Implement loaders**

Create `lib/mdx.ts`:

```ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type MdxFrontmatter = {
  title: string;
  slug: string;
  summary?: string;
  order?: number;
  [key: string]: unknown;
};

export type MdxEntry = {
  frontmatter: MdxFrontmatter;
  body: string;
};

export async function loadMdxEntries(dir: string): Promise<MdxEntry[]> {
  const files = await fs.readdir(dir);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));
  const entries = await Promise.all(
    mdxFiles.map(async (filename) => {
      const raw = await fs.readFile(path.join(dir, filename), 'utf-8');
      const parsed = matter(raw);
      return {
        frontmatter: parsed.data as MdxFrontmatter,
        body: parsed.content,
      };
    }),
  );
  entries.sort((a, b) => {
    const ao = a.frontmatter.order ?? 999;
    const bo = b.frontmatter.order ?? 999;
    if (ao !== bo) return ao - bo;
    return (a.frontmatter.slug ?? '').localeCompare(b.frontmatter.slug ?? '');
  });
  return entries;
}

export async function loadMdxBySlug(dir: string, slug: string): Promise<MdxEntry | null> {
  try {
    const raw = await fs.readFile(path.join(dir, `${slug}.mdx`), 'utf-8');
    const parsed = matter(raw);
    return { frontmatter: parsed.data as MdxFrontmatter, body: parsed.content };
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

export const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');
export const WORK_DIR = path.join(process.cwd(), 'content', 'work');
```

- [ ] **Step 5: Run tests, confirm pass**

```bash
npm test
```

- [ ] **Step 6: Build MDX components**

Create `components/mdx/Screenshot.tsx`:

```tsx
import Image from 'next/image';

export function Screenshot({
  src,
  alt,
  caption,
  width = 1280,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10">
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-[var(--color-text-muted)] text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
```

Create `components/mdx/Callout.tsx`:

```tsx
import { cn } from '@/lib/utils';

export function Callout({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-4 my-6 text-sm',
        tone === 'accent'
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
          : 'border-[var(--color-border)] bg-[var(--color-surface)]',
      )}
    >
      {children}
    </div>
  );
}
```

Create `components/mdx/MdxComponents.tsx`:

```tsx
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Screenshot } from './Screenshot';
import { Callout } from './Callout';

export const mdxComponents: MDXComponents = {
  Screenshot,
  Callout,
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-12 mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-12 mb-4">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="text-xl font-semibold mt-10 mb-3">{children}</h3>,
  p: ({ children }) => <p className="leading-relaxed mb-4 text-[var(--color-text-muted)]">{children}</p>,
  a: ({ href, children, ...rest }) => {
    const isExt = typeof href === 'string' && href.startsWith('http');
    if (isExt) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[var(--color-accent)]" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? '#'} className="underline underline-offset-2 hover:text-[var(--color-accent)]">
        {children}
      </Link>
    );
  },
  ul: ({ children }) => <ul className="list-disc list-outside pl-5 mb-4 space-y-2 text-[var(--color-text-muted)]">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-4 space-y-2 text-[var(--color-text-muted)]">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 italic font-serif my-6 text-[var(--color-text)]">
      {children}
    </blockquote>
  ),
};
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(mdx): add content loaders, MDX components, with tests"
```

---

## Task 17: Service routes and content

**Files:**
- Create: `content/services/web-build.mdx`, `migrations.mdx`, `hosting.mdx`, `optimizations.mdx`
- Create: `app/services/page.tsx`, `app/services/[slug]/page.tsx`

- [ ] **Step 1: Create the four service MDX files**

Create `content/services/web-build.mdx`:

```mdx
---
title: Custom website builds
slug: web-build
summary: Modern Next.js sites designed and built around your business.
order: 1
---

A custom website build is a from-scratch project — design, content, code, deploy. Built on Next.js, Tailwind, and a stack that will age well past the next CMS fad.

## What you get

- A site designed for your business specifically — not a template
- Built on Next.js 16, Tailwind CSS, and TypeScript
- Mobile-first, accessible, fast (Lighthouse ≥ 95 on launch day)
- Full SEO setup: sitemap, structured data, OG images
- Deployed to Vercel with your domain connected
- Source code handed over — the repo is yours

## What it costs

Starts at $750 (Starter package). Most builds land in the Business package at $2,000 — see the [pricing page](/pricing) for what is included at each tier.

## Timeline

One to three weeks depending on scope. The discovery call locks the timeline before we start.
```

Create `content/services/migrations.mdx`:

```mdx
---
title: Site migrations
slug: migrations
summary: Move your old site to a fast, modern stack — without losing SEO.
order: 2
---

If your current site runs on WordPress, Wix, Squarespace, or a ten-year-old static HTML build, a migration moves it onto a modern Next.js stack while preserving the parts you do not want to lose.

## What I migrate

- Pages and content (every URL gets a 1:1 redirect)
- Images (re-encoded to modern formats; smaller, sharper)
- Forms (rebuilt as Server Actions, not third-party iframe junk)
- SEO settings (meta tags, structured data, sitemap, robots)
- Domain and hosting (full DNS handover)

## What you keep

Your URLs, your search rankings, your existing analytics history. Migrations are scoped to be SEO-safe — broken redirects are how migrations go wrong, and I do not let that happen.

## What it costs

Migrations are typically priced as Custom builds ($4,500+) because the work scales with site size. Smaller sites can fit into the Business package — let me know what you have and I will quote it.
```

Create `content/services/hosting.mdx`:

```mdx
---
title: Hosting & domains
slug: hosting
summary: Vercel deploys, custom domains, DNS, SSL — all configured for you.
order: 3
---

Hosting is included free with every package. The "service" version is for businesses with an existing site that needs hosting set up (or fixed) without a full rebuild.

## What I do

- Deploy your site to Vercel (free tier handles most small businesses)
- Set up your custom domain and SSL (free, via Vercel)
- Configure DNS records — A, CNAME, MX (so email keeps working)
- Set up production / preview environments so you can review changes before they go live

## What I do not do

I do not host on my own servers — your site lives in your accounts (Vercel, your domain registrar). When the project is done, you have full control. No vendor lock-in.

## What it costs

Bundled into builds for free. Standalone hosting setup for an existing site is typically $300–600 depending on complexity — [get in touch](/contact) for a quick quote.
```

Create `content/services/optimizations.mdx`:

```mdx
---
title: Speed & SEO optimization
slug: optimizations
summary: Make an existing site faster, more accessible, and easier to find.
order: 4
---

If your site works but is slow, hard to find on Google, or fails accessibility, an optimization pass tunes it without rebuilding.

## What I optimize

- **Core Web Vitals** — LCP, CLS, INP. Most small business sites have easy wins.
- **Images** — modern formats (AVIF, WebP), responsive sizing, lazy loading
- **JavaScript bundle** — remove dead code, defer non-critical scripts
- **SEO basics** — title tags, meta descriptions, structured data, sitemap, internal linking
- **Accessibility** — keyboard navigation, screen reader labels, color contrast

## What you get

A before/after report with Lighthouse scores, plus the implemented changes. Targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

## What it costs

Audits start at $400. Implementation is scoped from the audit findings — most full optimizations land between $800 and $2,500.
```

- [ ] **Step 2: Build /services index page**

Create `app/services/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { loadMdxEntries, SERVICES_DIR } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web build, migrations, hosting, and optimization services.',
};

export default async function ServicesIndexPage() {
  const entries = await loadMdxEntries(SERVICES_DIR);
  return (
    <Container className="py-20 md:py-28">
      <SectionLabel>Services</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
        What I do
      </h1>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
        Four focused services for small businesses with no website or an outdated one.
      </p>
      <div className="mt-12 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {entries.map((entry) => (
          <Link
            key={entry.frontmatter.slug}
            href={`/services/${entry.frontmatter.slug}`}
            className="group flex items-start justify-between gap-6 py-8 hover:bg-[var(--color-surface)]/50 transition-colors -mx-6 md:-mx-8 px-6 md:px-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                {entry.frontmatter.title}
              </h2>
              <p className="mt-2 text-[var(--color-text-muted)]">{entry.frontmatter.summary}</p>
            </div>
            <ArrowRight className="h-5 w-5 mt-2 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Build /services/[slug] dynamic page**

Create `app/services/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxBySlug, loadMdxEntries, SERVICES_DIR } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MdxComponents';

export async function generateStaticParams() {
  const entries = await loadMdxEntries(SERVICES_DIR);
  return entries.map((e) => ({ slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await loadMdxBySlug(SERVICES_DIR, slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await loadMdxBySlug(SERVICES_DIR, slug);
  if (!entry) notFound();

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Service</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        {entry.frontmatter.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-muted)]">{entry.frontmatter.summary}</p>
      <article className="mt-12">
        <MDXRemote source={entry.body} components={mdxComponents} />
      </article>
      <div className="mt-16 flex gap-3 flex-wrap">
        <ButtonLink href="/contact">Book a discovery call</ButtonLink>
        <ButtonLink href="/pricing" variant="secondary">
          See pricing
        </ButtonLink>
      </div>
    </Container>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Visit `/services` — list of four services. Click each — full deep-dive page renders with MDX content. Both themes work.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(services): add service index and MDX-backed deep-dive pages"
```

---

## Task 18: Work routes and case study content

**Files:**
- Create: `content/work/universally-us.mdx`
- Create: `app/work/page.tsx`, `app/work/[slug]/page.tsx`
- Modify: `components/sections/SelectedWork.tsx` (load from MDX instead of inline)

- [ ] **Step 1: Write the case study MDX**

Create `content/work/universally-us.mdx`:

```mdx
---
title: Universally Us
slug: universally-us
client: Universally Us
summary: A headless-CMS-driven informational site built on Next.js, focused on accessibility and performance.
cover: /images/work/universally-us-cover.jpg
stack:
  - Next.js
  - Headless CMS
  - Tailwind CSS
  - Vercel
year: 2025
order: 1
---

## The brief

Build an informational platform that scales — content edited by non-developers, fast load times across devices, and serious accessibility from day one.

## What I built

A Next.js front-end backed by a headless CMS. Editors update content through the CMS interface; pages are statically generated and revalidated on demand. The site is deployed to Vercel with a custom domain.

<Screenshot src="/images/work/universally-us-cover.jpg" alt="Universally Us homepage" caption="Universally Us — Next.js front-end, headless CMS back-end" />

## Highlights

- **Performance** — Lighthouse scores in the high 90s across the board on launch
- **Accessibility** — keyboard navigation, screen reader labels, sufficient color contrast throughout
- **Editor experience** — non-technical staff can publish without involving a developer

## Stack

Next.js 15, Tailwind, a headless CMS for content, and Vercel for hosting.
```

- [ ] **Step 2: /work index page**

Create `app/work/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { loadMdxEntries, WORK_DIR } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
};

export default async function WorkIndexPage() {
  const entries = await loadMdxEntries(WORK_DIR);
  const items: WorkItem[] = entries.map((e) => {
    const f = e.frontmatter as WorkItem & { stack: string[] };
    return {
      slug: f.slug,
      title: f.title,
      client: f.client,
      summary: f.summary,
      cover: f.cover,
      stack: f.stack,
    };
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionLabel>Work</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
        Selected projects
      </h1>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: /work/[slug] case study page**

Create `app/work/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxBySlug, loadMdxEntries, WORK_DIR } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MdxComponents';

export async function generateStaticParams() {
  const entries = await loadMdxEntries(WORK_DIR);
  return entries.map((e) => ({ slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await loadMdxBySlug(WORK_DIR, slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: typeof entry.frontmatter.summary === 'string' ? entry.frontmatter.summary : undefined,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await loadMdxBySlug(WORK_DIR, slug);
  if (!entry) notFound();

  const fm = entry.frontmatter as { title: string; client: string; year?: number; stack?: string[] };
  const stack = Array.isArray(fm.stack) ? fm.stack : [];

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Case study {fm.year ? `· ${fm.year}` : ''}</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">{fm.title}</h1>
      <div className="mt-3 text-[var(--color-text-muted)]">{fm.client}</div>
      {stack.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}
      <article className="mt-12">
        <MDXRemote source={entry.body} components={mdxComponents} />
      </article>
      <div className="mt-16 flex gap-3 flex-wrap">
        <ButtonLink href="/work" variant="ghost">
          ← All work
        </ButtonLink>
        <ButtonLink href="/contact">Build something like this</ButtonLink>
      </div>
    </Container>
  );
}
```

- [ ] **Step 4: Update SelectedWork to read from MDX**

Replace `components/sections/SelectedWork.tsx`:

```tsx
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxEntries, WORK_DIR } from '@/lib/mdx';

export async function SelectedWork() {
  const entries = await loadMdxEntries(WORK_DIR);
  const items: WorkItem[] = entries.slice(0, 2).map((e) => {
    const f = e.frontmatter as WorkItem & { stack: string[] };
    return {
      slug: f.slug,
      title: f.title,
      client: f.client,
      summary: f.summary,
      cover: f.cover,
      stack: f.stack,
    };
  });

  return (
    <Section id="work">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <SectionLabel number="03">Selected work</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Recent builds</h2>
        </div>
        <ButtonLink href="/work" variant="ghost" size="sm">
          See all work →
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Visit `/`, `/work`, `/work/universally-us`. All render. SelectedWork on homepage now pulls from MDX.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(work): add work index and MDX-backed case study pages"
```

---

## Task 19: Pricing page

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Build pricing page**

Create `app/pricing/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { PackageCard } from '@/components/cards/PackageCard';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { packages } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent fixed-price packages plus custom quotes for larger projects.',
};

export default function PricingPage() {
  return (
    <>
      <Container className="py-20 md:py-28">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          Transparent pricing
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
          Fixed-price packages for most builds. For anything bigger or more bespoke, the quote form
          below collects what I need to come back with a number.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
      <Container id="quote" size="narrow" className="py-20 md:py-28 border-t border-[var(--color-border)]">
        <SectionLabel>Quote</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Need something custom?
        </h2>
        <p className="mt-4 text-[var(--color-text-muted)]">
          Tell me about your project. I will reply within one business day.
        </p>
        <div className="mt-10">
          <QuoteForm />
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Step 2: Verify**

`npm run dev` → `/pricing` renders packages + quote form. Theme switch works. Submit form (without API key set, expect "Sending failed" — that's correct).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(pricing): add pricing page with packages and quote form"
```

---

## Task 20: About and Contact pages

**Files:**
- Create: `app/about/page.tsx`, `app/contact/page.tsx`

- [ ] **Step 1: About page**

Create `app/about/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.ownerName} and ${site.name}.`,
};

export default function AboutPage() {
  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        Hi, I&rsquo;m {site.ownerName.split(' ')[0]}.
      </h1>
      <div className="mt-8 space-y-5 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          I&rsquo;m a software engineer who builds modern websites for small businesses. Most of my
          clients have either no website or one that has aged badly — slow, hard to update, painful
          on a phone. I fix that.
        </p>
        <p>
          The stack I use is the one I&rsquo;d use for myself: Next.js, TypeScript, Tailwind. The
          code is yours to keep, hosted on infrastructure you control. No proprietary builders, no
          vendor lock-in.
        </p>
        <p>
          I work solo, which means you talk to the person doing the work. No account managers, no
          handoffs. Smaller projects ship in 1–3 weeks; bigger custom builds are scoped on a
          discovery call.
        </p>
        <p className="font-serif italic text-[var(--color-text)]">
          The goal is not to build the most clever site — it&rsquo;s to build the one your business
          needs.
        </p>
      </div>
      <div className="mt-12 flex gap-3 flex-wrap">
        <ButtonLink href="/contact">Book a call</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See work
        </ButtonLink>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Contact page with Cal.com**

Create `app/contact/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ContactForm } from '@/components/forms/ContactForm';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a discovery call or send a message.',
};

export default function ContactPage() {
  const calUrl = site.calComUsername
    ? `https://cal.com/${site.calComUsername}/15min`
    : null;

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        Let&rsquo;s talk.
      </h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Book a 15-minute discovery call, or send a message and I&rsquo;ll reply within one business
        day.
      </p>

      {calUrl ? (
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Book a call</h2>
          <iframe
            src={calUrl}
            title="Book a call"
            className="w-full rounded-xl border border-[var(--color-border)]"
            style={{ height: 700 }}
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
        <h2 className="text-lg font-semibold mb-2">Or send a message</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Or email me directly:{' '}
          <a className="underline" href={`mailto:${site.ownerEmail}`}>
            {site.ownerEmail}
          </a>
        </p>
        <ContactForm />
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Verify**

`npm run dev` → both pages render. About reads cleanly. Contact shows iframe (or skips it if `CAL_COM_USERNAME` is unset) plus the contact form below.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(pages): add About and Contact pages with Cal.com embed"
```

---

## Task 21: SEO (metadata, sitemap, robots, OG image, 404)

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/not-found.tsx`

- [ ] **Step 1: Sitemap**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { loadMdxEntries, SERVICES_DIR, WORK_DIR } from '@/lib/mdx';
import { site } from '@/data/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, '');
  const services = await loadMdxEntries(SERVICES_DIR);
  const work = await loadMdxEntries(WORK_DIR);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/services',
    '/work',
    '/pricing',
    '/about',
    '/contact',
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  const serviceRoutes = services.map((e) => ({
    url: `${base}/services/${e.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  const workRoutes = work.map((e) => ({
    url: `${base}/work/${e.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes];
}
```

- [ ] **Step 2: Robots**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Default OG image**

Create `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, #7c5cff44, transparent 60%), #0a0a0a',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.7 }}>
          {site.name.toUpperCase()}
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 24, opacity: 0.6, maxWidth: 800 }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 4: 404 page**

Create `app/not-found.tsx`:

```tsx
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container size="narrow" className="py-32 text-center">
      <div className="text-7xl font-mono text-[var(--color-text-muted)]">404</div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Couldn&rsquo;t find that.</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        The page you tried to reach doesn&rsquo;t exist. Try one of these instead.
      </p>
      <div className="mt-10 flex gap-3 justify-center flex-wrap">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Services
        </ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Work
        </ButtonLink>
      </div>
    </Container>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

- Visit `/sitemap.xml` — XML with all routes.
- Visit `/robots.txt` — text file with sitemap link.
- Visit `/opengraph-image` — should render the PNG (browser will download it).
- Visit `/no-such-page` — 404 page renders.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seo): add sitemap, robots, default OG image, 404 page"
```

---

## Task 22: Analytics, Lighthouse pass, deploy prep

**Files:**
- Modify: `app/layout.tsx`
- Create: `vercel.json` (optional)

- [ ] **Step 1: Install Vercel Analytics**

```bash
npm install @vercel/analytics @vercel/speed-insights
```

- [ ] **Step 2: Wire into layout**

Update `app/layout.tsx` body — add the imports at top:

```tsx
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
```

And before `</body>`:

```tsx
<Analytics />
<SpeedInsights />
```

- [ ] **Step 3: Production build smoke test**

```bash
npm run build
npm start
```

Open `http://localhost:3000`. Walk through every route:
- `/`
- `/services`, `/services/web-build`, `/services/migrations`, `/services/hosting`, `/services/optimizations`
- `/work`, `/work/universally-us`
- `/pricing`
- `/about`
- `/contact`
- `/no-such-page` (404)

Verify each renders without errors. Check the browser console for warnings.

- [ ] **Step 4: Lighthouse acceptance run**

In Chrome DevTools → Lighthouse → Mobile, run on:
- `/`
- `/services`
- `/pricing`

Acceptance from spec: ≥ 90 on Performance, Accessibility, Best Practices, SEO.

If anything is below 90, the most likely culprits and fixes:
- **LCP slow** → check the liquid metal shader; lower opacity, or disable on mobile entirely
- **CLS** → add explicit `width`/`height` on Image components; verify font swap not shifting layout
- **Accessibility** → check button `aria-label`s and form `<label htmlFor>` matches inputs
- **SEO** → ensure all pages have unique `<title>` and `<meta description>`

- [ ] **Step 5: Run all tests**

```bash
npm test
npm run lint
npm run format:check
```

All green.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(analytics): add Vercel Analytics and Speed Insights"
```

- [ ] **Step 7: Deploy to Vercel**

Steps the user takes manually (not automated by this plan — Vercel CLI / dashboard work):

1. Push the repo to GitHub
2. Import the repo in the Vercel dashboard
3. Set environment variables:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_CAL_COM_USERNAME` (if used)
4. Deploy. Confirm preview URL works end-to-end (submit a real quote — verify email lands).
5. Connect custom domain.
6. Update `NEXT_PUBLIC_SITE_URL` env var to the production domain and redeploy.

- [ ] **Step 8: Final acceptance**

Walk through the spec's "Acceptance criteria for v1 done" list:
- [x] All seven homepage sections render in both themes
- [x] All routes in routing table render with real or placeholder content
- [x] Quote form delivers via Resend (test in production)
- [x] Cal.com booking embed loads on `/contact`
- [x] Mobile Lighthouse ≥ 90 on `/`, `/services`, `/pricing`
- [x] Theme persists across reload, respects OS preference
- [x] No console errors in production build

Tag the release:

```bash
git tag v1.0.0
git push --tags
```

---

## Self-review checklist (run after writing the plan)

**Spec coverage:**

- ✅ Brand identity / Lume Studio — Task 2 (site config)
- ✅ Audience / voice — embedded in copy across pages
- ✅ Routing table — Tasks 17, 18, 19, 20 cover all routes
- ✅ Homepage 7-section order — Tasks 8, 9, 10
- ✅ Color tokens, fonts, motion, theme — Tasks 2, 3
- ✅ Liquid metal hero with all constraints — Task 10
- ✅ MDX content + typed data — Tasks 6, 16, 17, 18
- ✅ Pricing tiers — Task 6 + 19
- ✅ FAQ — Task 6 + 8
- ✅ Quote and contact form fields — Tasks 11, 14, 15
- ✅ Resend + rate limit + Server Actions — Tasks 12, 13, 14
- ✅ Cal.com embed — Task 20
- ✅ SEO (metadata, sitemap, robots, OG, 404) — Task 21
- ✅ Analytics — Task 22
- ✅ Acceptance criteria check — Task 22

**Placeholder scan:** no TBD, TODO, "implement later", or "similar to Task N" without concrete code.

**Type consistency:** `ActionState` defined in `submitQuote.ts` and re-imported by `submitContact.ts`. `WorkItem` exported from `WorkCard.tsx` and reused in `SelectedWork.tsx` and `app/work/page.tsx`. Schemas (`QuoteFormSchema`, `ContactFormSchema`) consistent across validation, actions, and tests.

**Open items the spec already flagged** (not blockers — they belong to the user, not the plan):
- Domain choice
- Logo/wordmark beyond type-set wordmark
- Resend / Cal.com / Vercel account setup
- Owner inbox email
- Real case study screenshots and any additional case studies
