import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.ownerName} and ${site.name}.`,
};

export default function AboutPage() {
  const firstName = site.ownerName.split(' ')[0];
  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        Hi, I&rsquo;m {firstName}.
      </h1>
      <div className="mt-8 space-y-5 text-[var(--color-text-muted)] leading-relaxed">
        <p>
          I&rsquo;m a software engineer who builds modern websites for small businesses. Most of my
          clients have either no website or one that has aged badly — slow, hard to update, painful
          on a phone. I fix that.
        </p>
        <p>
          The stack I use is the one I&rsquo;d use for myself: Next.js, TypeScript, Tailwind. The
          code is yours to keep, hosted on infrastructure you control. No proprietary builders, no
          vendor lock-in.
        </p>
        <p>
          I work solo, which means you talk to the person doing the work. No account managers, no
          handoffs. Smaller projects ship in 1–3 weeks; bigger custom builds are scoped on a
          discovery call.
        </p>
        <p className="font-serif italic text-[var(--color-text)]">
          The goal is not to build the most clever site — it&rsquo;s to build the one your business
          needs.
        </p>
      </div>
      <div className="mt-12 flex gap-3 flex-wrap">
        <ButtonLink href="/contact">Book a call</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See work
        </ButtonLink>
      </div>
    </Container>
  );
}
