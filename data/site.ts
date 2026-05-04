export const site = {
  name: 'Lume Studio',
  shortName: 'Lume',
  tagline: 'Modern websites, built right.',
  description:
    'Custom Next.js websites for small businesses. Real performance, real SEO, transparent pricing.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lume-studio-sandy.vercel.app',
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
