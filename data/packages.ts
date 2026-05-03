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
