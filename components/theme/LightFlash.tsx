'use client';

import { AnimatePresence, motion } from 'framer-motion';

type LightFlashProps = {
  active: boolean;
};

export function LightFlash({ active }: LightFlashProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="light-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[99]"
          style={{ background: '#FFE9A8' }}
        />
      )}
    </AnimatePresence>
  );
}
