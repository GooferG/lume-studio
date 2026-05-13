'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import {
  PRICING_CONFIG,
  computeEstimate,
  type FeatureId,
  type SiteTypeId,
} from '@/lib/pricing/config';
import { FeatureToggle } from './FeatureToggle';

export function Calculator() {
  const [siteType, setSiteType] = useState<SiteTypeId>('business');
  const [pages, setPages] = useState<number>(PRICING_CONFIG.pagesIncluded);
  const [features, setFeatures] = useState<Set<FeatureId>>(new Set());
  const reducedMotion = useReducedMotion();

  const estimate = useMemo(
    () =>
      computeEstimate({
        siteType,
        pages,
        features: Array.from(features),
      }),
    [siteType, pages, features],
  );

  const animatedPrice = useMotionValue(estimate.display);
  const display = useTransform(animatedPrice, (v) => `$${Math.round(v).toLocaleString()}`);

  useEffect(() => {
    if (reducedMotion) {
      animatedPrice.set(estimate.display);
      return;
    }
    const controls = animate(animatedPrice, estimate.display, {
      duration: 0.3,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [estimate.display, reducedMotion, animatedPrice]);

  function toggleFeature(id: FeatureId, next: boolean) {
    setFeatures((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(id);
      else copy.delete(id);
      return copy;
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Controls */}
      <div className="space-y-10">
        {/* Site type */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text)]">
            What kind of site do you need?
          </legend>
          <div
            role="radiogroup"
            aria-label="Site type"
            className="mt-4 grid gap-3 sm:grid-cols-2"
          >
            {PRICING_CONFIG.siteTypes.map((opt) => {
              const selected = siteType === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSiteType(opt.id)}
                  className={cn(
                    'rounded-lg border px-4 py-4 text-left transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
                    selected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-muted)]',
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium text-[var(--color-text)]">{opt.label}</span>
                    <span
                      className={cn(
                        'text-xs font-medium whitespace-nowrap',
                        selected
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-text-muted)]',
                      )}
                    >
                      from ${opt.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Pages */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label
              htmlFor="pages-slider"
              className="text-sm font-semibold text-[var(--color-text)]"
            >
              How many pages?
            </label>
            <span className="text-sm text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text)] font-semibold">{pages}</span>{' '}
              {pages === 1 ? 'page' : 'pages'}
              {pages > PRICING_CONFIG.pagesIncluded && (
                <span className="ml-2 text-xs">
                  ({pages - PRICING_CONFIG.pagesIncluded} extra × $
                  {PRICING_CONFIG.pricePerExtraPage})
                </span>
              )}
            </span>
          </div>
          <input
            id="pages-slider"
            type="range"
            min={1}
            max={PRICING_CONFIG.maxPages}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className={cn(
              'mt-4 w-full appearance-none h-1.5 rounded-full bg-[var(--color-border)]',
              'accent-[var(--color-accent)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
            )}
          />
          <div className="mt-2 flex justify-between text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
            <span>1</span>
            <span>{PRICING_CONFIG.pagesIncluded} included</span>
            <span>{PRICING_CONFIG.maxPages}+</span>
          </div>
        </div>

        {/* Features */}
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text)]">
            Any extras?
          </legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRICING_CONFIG.features.map((f) => (
              <FeatureToggle
                key={f.id}
                id={`feature-${f.id}`}
                label={f.label}
                price={f.price}
                selected={features.has(f.id)}
                onChange={(next) => toggleFeature(f.id, next)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Summary — sticky on desktop, sticky-bottom on mobile */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div
          className={cn(
            'rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6',
            'shadow-sm',
          )}
        >
          <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
            Estimated price
          </div>
          <motion.div
            className="mt-2 text-5xl font-semibold tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-space-grotesk, inherit)' }}
          >
            <motion.span>{display}</motion.span>
          </motion.div>
          <div className="mt-2 text-sm text-[var(--color-accent)] font-medium">
            {estimate.match.label}
          </div>

          <p className="mt-4 text-xs text-[var(--color-text-muted)] leading-relaxed">
            Starting estimate based on your selections. Final price confirmed after a quick call to
            understand the details.
          </p>

          <Link
            href={estimate.match.ctaHref}
            className={cn(
              'mt-6 inline-flex h-11 w-full items-center justify-center px-5 text-sm font-medium',
              'bg-[var(--color-accent)] text-white rounded-full hover:opacity-90 transition-opacity',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
            )}
          >
            {estimate.match.ctaLabel} →
          </Link>

          {estimate.display !== estimate.raw && (
            <div className="mt-3 text-[11px] text-[var(--color-text-muted)] text-center">
              Raw total: ${estimate.raw.toLocaleString()} · snapped to {estimate.match.label} tier
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
