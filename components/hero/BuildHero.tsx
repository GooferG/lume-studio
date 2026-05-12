'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ParticleBackground } from './ParticleBackground';
import { SkeletonBlocks } from './SkeletonBlocks';
import { site } from '@/data/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useFirstVisit } from '@/lib/hooks/useFirstVisit';

const containerVariants: Variants = {
  initial: { filter: 'saturate(0)' },
  final: {
    filter: 'saturate(1)',
    transition: { duration: 0.4, delay: 1.1, ease: 'easeOut' },
  },
  instant: { filter: 'saturate(1)' },
};

const contentParent: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.05,
    },
  },
  instant: {},
};

const contentChild: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  instant: { opacity: 1, y: 0 },
};

const SKELETON_HIDE_AT_MS = 700;

export function BuildHero() {
  const reducedMotion = useReducedMotion();
  const { isFirstVisit, ready } = useFirstVisit();
  const shouldAnimate = ready && isFirstVisit && !reducedMotion;

  const [skeletonVisible, setSkeletonVisible] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) {
      setSkeletonVisible(false);
      return;
    }
    setSkeletonVisible(true);
    const t = window.setTimeout(() => setSkeletonVisible(false), SKELETON_HIDE_AT_MS);
    return () => window.clearTimeout(t);
  }, [shouldAnimate]);

  // Until the first-visit check resolves, render final state to avoid SSR flicker.
  const containerInitial = ready ? (shouldAnimate ? 'initial' : 'instant') : 'instant';
  const containerAnimate = ready ? (shouldAnimate ? 'final' : 'instant') : 'instant';
  const contentInitial = shouldAnimate ? 'initial' : 'instant';
  const contentAnimate = shouldAnimate ? 'animate' : 'instant';

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ParticleBackground />

      <motion.div
        initial={containerInitial}
        animate={containerAnimate}
        variants={containerVariants}
        className="relative"
      >
        <Container className="relative py-28 md:py-40">
          <div className="relative max-w-3xl">
            {shouldAnimate && <SkeletonBlocks visible={skeletonVisible} />}

            <motion.div
              initial={contentInitial}
              animate={contentAnimate}
              variants={contentParent}
            >
              {/* Eyebrow */}
              <motion.div
                variants={contentChild}
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
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={contentChild}
                className="leading-[0.96] tracking-[-0.035em] text-(--color-text)"
                style={{
                  fontFamily: 'var(--font-space-grotesk, inherit)',
                  fontWeight: 500,
                  fontSize: 'clamp(48px, 8vw, 80px)',
                }}
              >
                We build websites small businesses{' '}
                <span style={{ color: 'var(--color-coral, #FF5E47)' }}>are proud of.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={contentChild}
                className="mt-7 leading-relaxed max-w-[36ch]"
                style={{
                  fontFamily: 'var(--font-space-grotesk, inherit)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--color-text-muted)',
                }}
              >
                A great website brings in more customers and makes your business look as good as it
                actually is. No tech headaches — we handle everything.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={contentChild} className="mt-10 flex gap-3 flex-wrap">
                <ButtonLink href="/pricing" size="lg" className="!rounded-none">
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
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
