'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

type Star = { id: number; x: number; y: number; size: number; delay: number };

type StarBurstProps = {
  active: boolean;
  origin: { x: number; y: number } | null;
};

const PARTICLE_COUNT = 10;
const SPREAD = 180;

export function StarBurst({ active, origin }: StarBurstProps) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.6;
      const distance = SPREAD * (0.6 + Math.random() * 0.4);
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.12,
      };
    });
  }, [active]);

  if (!origin) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ '--ox': `${origin.x}px`, '--oy': `${origin.y}px` } as React.CSSProperties}
      aria-hidden
    >
      <AnimatePresence>
        {active &&
          stars.map((s) => (
            <motion.span
              key={s.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: s.x, y: s.y, opacity: [0, 1, 0], scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: s.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: 'var(--ox)',
                top: 'var(--oy)',
                width: s.size,
                height: s.size,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                boxShadow: '0 0 8px var(--color-accent)',
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
