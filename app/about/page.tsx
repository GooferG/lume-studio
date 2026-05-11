import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Team',
  description: `Meet the team behind ${site.name}.`,
};

type Member = {
  name: string;
  role: string;
  image: string;
  bio: string[];
  objectPosition?: string;
};

const team: Member[] = [
  {
    name: 'Luiz Meneghim',
    role: 'Founder & Lead Developer',
    image: '/images/team/luizmprofile.jpeg',
    objectPosition: 'center 20%',
    bio: [
      'Software engineer who builds modern websites for small businesses. Most clients come in with no site or one that has aged badly — slow, hard to update, painful on a phone.',
      'Stack is the one I’d use for myself: Next.js, TypeScript, Tailwind. Code is yours to keep, hosted on infrastructure you control. No proprietary builders, no vendor lock-in.',
    ],
  },
  {
    name: 'Tanner Metro',
    role: 'Lead Client Relations & Sales',
    image: '/images/team/tannermetroprofile.jpg',
    bio: [
      'Partner on the client side of the studio. Runs discovery calls, scopes projects, and keeps communication clear from first call to launch.',
      'Point of contact for new business and ongoing accounts — focused on understanding the business first, then matching it to the right build.',
    ],
  },
];

export default function AboutPage() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-2xl">
        <SectionLabel>Team</SectionLabel>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
          The people behind {site.name}.
        </h1>
        <p className="mt-6 text-[var(--color-text-muted)] leading-relaxed">
          A two-person studio. You talk to the people doing the work — no account managers, no
          handoffs. Smaller projects ship in 1–3 weeks; bigger custom builds are scoped on a
          discovery call.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {team.map((m) => (
          <article
            key={m.name}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[var(--color-bg)]">
              <Image
                src={m.image}
                alt={`${m.name} — ${m.role}`}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: m.objectPosition ?? 'center' }}
              />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">{m.name}</h2>
            <p className="mt-1 text-sm text-[var(--color-accent)]">{m.role}</p>
            <div className="mt-4 space-y-3 text-[var(--color-text-muted)] leading-relaxed text-sm">
              {m.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-14 max-w-2xl font-serif italic text-[var(--color-text)]">
        The goal is not to build the most clever site — it’s to build the one your business needs.
      </p>

      <div className="mt-10 flex gap-3 flex-wrap">
        <ButtonLink href="/contact">Book a call</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See work
        </ButtonLink>
      </div>
    </Container>
  );
}
