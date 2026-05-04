import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ParticleBackground } from './ParticleBackground';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ParticleBackground />
      {/* Decorative lens rings — top right */}
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 md:-right-16 md:-top-16">
        <svg
          width="560"
          height="560"
          viewBox="0 0 560 560"
          fill="none"
          className="opacity-[0.07] dark:opacity-[0.04]"
        >
          <circle cx="280" cy="280" r="220" stroke="var(--color-navy, #0E1A2B)" strokeWidth="2" />
          <circle cx="280" cy="280" r="160" stroke="var(--color-navy, #0E1A2B)" strokeWidth="1.5" />
          <circle cx="280" cy="280" r="100" stroke="var(--color-navy, #0E1A2B)" strokeWidth="1" />
          <circle cx="280" cy="280" r="50" fill="var(--color-coral, #FF5E47)" opacity="0.6" />
          <circle cx="246" cy="246" r="18" fill="white" opacity="0.9" />
        </svg>
      </div>

      <Container className="relative py-28 md:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="mb-7 inline-flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-space-grotesk, inherit)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            <span
              className="inline-block w-5 h-px"
              style={{ background: 'var(--color-coral, #FF5E47)' }}
            />
            {site.name} · Web services for small business
          </div>

          {/* Headline */}
          <h1
            className="leading-[0.96] tracking-[-0.035em] text-[var(--color-text)]"
            style={{
              fontFamily: 'var(--font-space-grotesk, inherit)',
              fontWeight: 500,
              fontSize: 'clamp(48px, 8vw, 80px)',
            }}
          >
            We focus your
            <br />
            brand into{' '}
            <span style={{ color: 'var(--color-coral, #FF5E47)' }}>view.</span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-7 leading-relaxed max-w-[36ch]"
            style={{
              fontFamily: 'var(--font-space-grotesk, inherit)',
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            DTC websites and identity for small teams that want to be seen. Modern, fast, built right.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex gap-3 flex-wrap">
            <ButtonLink
              href="/pricing"
              size="lg"
              className="!rounded-none"
            >
              See pricing
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              size="lg"
              className="!rounded-none"
            >
              Book a call
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
