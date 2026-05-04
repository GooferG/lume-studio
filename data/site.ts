export const site = {
  name: 'Lume Studio',
  shortName: 'Lume',
  tagline: 'Modern websites, built right.',
  description:
    'Websites for small businesses that want to look great and get found online. Transparent pricing, no tech jargon.',
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
