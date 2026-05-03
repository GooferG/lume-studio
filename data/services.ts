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
