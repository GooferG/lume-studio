export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: '01',
    title: 'Chat',
    description: 'A quick 15-minute call to learn about your business, your goals, and what you need.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'You see exactly what the site will look like before we build anything. No surprises.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We build your site and keep you updated along the way. You can give feedback at any point.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Your site goes live. You get everything — full ownership, no strings attached.',
  },
];
