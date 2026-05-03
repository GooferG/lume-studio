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
