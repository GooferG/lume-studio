'use client';

import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { StarBurst } from '@/components/theme/StarBurst';
import { LightFlash } from '@/components/theme/LightFlash';

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);
  const [enteringDark, setEnteringDark] = useState(false);
  const [enteringLight, setEnteringLight] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const isDark = resolvedTheme === 'dark';
      const next = isDark ? 'light' : 'dark';

      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const root = document.documentElement;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty('--vt-radius', `${maxRadius}px`);

      if (next === 'dark') {
        setBurstOrigin({ x, y });
        setEnteringDark(true);
        window.setTimeout(() => setEnteringDark(false), 850);
      } else {
        setEnteringLight(true);
        window.setTimeout(() => setEnteringLight(false), 450);
      }

      const doc = document as DocWithVT;
      const supportsVT = typeof doc.startViewTransition === 'function' && !reducedMotion;

      if (supportsVT) {
        doc.startViewTransition!(() => setTheme(next));
      } else {
        setTheme(next);
      }
    },
    [resolvedTheme, setTheme, reducedMotion],
  );

  if (!mounted) {
    return <div className={cn('h-9 w-9', className)} aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        className={cn(
          'relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full',
          'border border-[var(--color-border)] bg-[var(--color-surface)]',
          'text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
          className,
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              initial={reducedMotion ? false : { opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: 'easeOut' }}
              aria-hidden
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              initial={reducedMotion ? false : { opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: 'easeOut' }}
              aria-hidden
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {!reducedMotion && <StarBurst active={enteringDark} origin={burstOrigin} />}
      {!reducedMotion && <LightFlash active={enteringLight} />}
    </>
  );
}
