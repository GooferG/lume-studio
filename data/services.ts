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
    title: 'New website',
    shortTitle: 'New Site',
    summary: 'A brand-new website built around your business, designed to bring in customers.',
    icon: 'sparkles',
  },
  {
    slug: 'migrations',
    title: 'Website refresh',
    shortTitle: 'Refresh',
    summary: 'Move from your old, slow website to something fast and modern — without losing your place on Google.',
    icon: 'arrow-right-left',
  },
  {
    slug: 'hosting',
    title: 'Hosting & setup',
    shortTitle: 'Hosting',
    summary: 'We take care of putting your site online, connecting your domain, and keeping it secure.',
    icon: 'server',
  },
  {
    slug: 'optimizations',
    title: 'Make it work better',
    shortTitle: 'Improvements',
    summary: 'Already have a site? We make it faster, easier to find on Google, and better on mobile.',
    icon: 'zap',
  },
];
