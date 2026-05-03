import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { LiquidMetalBackground } from './LiquidMetalBackground';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <LiquidMetalBackground />
      <Container className="py-24 md:py-36">
        <SectionLabel>{site.name} · Web services for small business</SectionLabel>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
          Modern websites,
          <br />
          <span className="text-[var(--color-text-muted)]">built right.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
          {site.description}
        </p>
        <div className="mt-10 flex gap-3 flex-wrap">
          <ButtonLink href="/pricing" size="lg">
            See pricing
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Book a call
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
