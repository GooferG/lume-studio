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
