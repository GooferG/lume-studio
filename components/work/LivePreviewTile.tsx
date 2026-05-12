'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useActiveTile } from './ActiveTileContext';

type LivePreviewTileProps = {
  slug: string;
  title: string;
  liveUrl: string;
  posterImage: string;
  coverPosition?: 'center' | 'top' | 'bottom';
};

export function LivePreviewTile({
  slug,
  title,
  liveUrl,
  posterImage,
  coverPosition,
}: LivePreviewTileProps) {
  const { activeSlug, setActiveSlug } = useActiveTile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isActive = activeSlug === slug;

  // IntersectionObserver — mark as in-view when 50%+ visible
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold: 0.5 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Claim active slot when hovered OR (in view and nothing else is hovered)
  useEffect(() => {
    if (hovered) {
      setActiveSlug(slug);
      return;
    }
    if (inView && !activeSlug) {
      setActiveSlug(slug);
    }
  }, [hovered, inView, activeSlug, slug, setActiveSlug]);

  // Release slot when leaving view
  useEffect(() => {
    if (!inView && isActive && !hovered) {
      setActiveSlug(null);
    }
  }, [inView, isActive, hovered, setActiveSlug]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative aspect-[16/10] bg-[var(--color-bg)] overflow-hidden"
    >
      <Image
        src={posterImage}
        alt={`${title} preview`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={cn(
          'object-cover transition-opacity duration-300',
          coverPosition === 'top' && 'object-top',
          coverPosition === 'bottom' && 'object-bottom',
          isActive ? 'opacity-0' : 'opacity-100',
        )}
        priority
      />

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <iframe
              src={liveUrl}
              title={`Live preview of ${title}`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              referrerPolicy="no-referrer"
              className="h-full w-full border-0"
            />
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title} in a new tab`}
              className={cn(
                'absolute top-2 right-2 inline-flex items-center gap-1 rounded-full',
                'bg-[var(--color-surface)]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium',
                'border border-[var(--color-border)] text-[var(--color-text)]',
                'hover:bg-[var(--color-surface)] transition-colors',
              )}
            >
              Open <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px]',
          'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
          'text-[var(--color-text-muted)] tracking-wider uppercase',
          'transition-opacity duration-200',
          isActive ? 'opacity-0' : 'opacity-100',
        )}
      >
        Live preview · Hover
      </div>
    </div>
  );
}
