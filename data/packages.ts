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
    description: 'A clean, professional website to get your business online.',
    features: [
      'Up to 5 pages',
      'Works on phones and tablets',
      'Shows up on Google',
      '1 round of changes',
      'Hosting setup included',
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
    description: 'A full website built to grow with your business.',
    features: [
      'Up to 10 pages',
      'You can update content yourself',
      'Better Google visibility',
      'Loads fast on any device',
      '2 rounds of changes',
      'Contact form + visitor tracking',
      'Optional blog',
    ],
    highlight: true,
    ctaLabel: 'Get started',
    ctaHref: '/contact',
  },
  {
    slug: 'custom',
    name: 'Custom',
    price: '$4,500+',
    description: 'A fully tailored website with any features your business needs.',
    features: [
      'Fully custom design',
      'As many pages as you need',
      'Connect any tool (bookings, payments, etc.)',
      'Easy content editing',
      'Changes as needed during build',
      'Support after launch',
    ],
    highlight: false,
    ctaLabel: 'Request a quote',
    ctaHref: '/pricing#quote',
  },
];
