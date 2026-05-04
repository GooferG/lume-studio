import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ParticleBackground } from './ParticleBackground';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ParticleBackground />

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
            className="leading-[0.96] tracking-[-0.035em] text-(--color-text)"
            style={{
              fontFamily: 'var(--font-space-grotesk, inherit)',
              fontWeight: 500,
              fontSize: 'clamp(48px, 8vw, 80px)',
            }}
          >
            We build websites small businesses{' '}
            <span style={{ color: 'var(--color-coral, #FF5E47)' }}>are proud of.</span>
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
            A great website brings in more customers and makes your business look as good as it actually is. No tech headaches — we handle everything.
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
