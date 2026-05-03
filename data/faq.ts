export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: 'How long does a build take?',
    answer:
      'Starter sites take 1–2 weeks, Business sites 2–3 weeks, Custom is scoped per project on the discovery call.',
  },
  {
    question: 'Do I own the site afterward?',
    answer:
      'Yes — full code ownership. The repo is handed over and you can host it anywhere. There is no lock-in.',
  },
  {
    question: 'What about hosting and domains?',
    answer:
      'I set up Vercel and connect your domain. The accounts stay in your name; you keep full control after handoff.',
  },
  {
    question: 'What if I need changes after launch?',
    answer:
      'Pick an hourly rate or a small monthly retainer for ongoing tweaks. We can also leave a CMS in place so you can edit content yourself.',
  },
  {
    question: 'Can you migrate my old site?',
    answer:
      'Yes — that is a service of its own. I move content, set up redirects, and preserve your SEO so you do not lose ranking.',
  },
  {
    question: 'How do payments work?',
    answer: 'Fifty percent deposit, fifty percent on launch. Invoices are sent through Stripe.',
  },
  {
    question: 'What is not included?',
    answer:
      'Logo design, custom photography, and ongoing copywriting are not included by default. I can refer trusted partners for any of those.',
  },
];
