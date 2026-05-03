# Lume Studio

Modern websites for small businesses. Built with Next.js 16, Tailwind v4, MDX.

## Setup

```bash
cp .env.example .env.local
# fill in RESEND_API_KEY, etc.
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme` config in CSS)
- MDX content + typed TS data
- Resend for transactional email
- Cal.com for discovery-call booking
- Vercel for hosting

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — lint
- `npm run format` — format with Prettier
- `npm test` — run Vitest tests once
- `npm run test:watch` — watch mode

## Project structure

See `docs/superpowers/specs/` and `docs/superpowers/plans/` for the design and implementation plan.
