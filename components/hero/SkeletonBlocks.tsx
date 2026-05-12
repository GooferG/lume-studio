'use client';

import { motion, type Variants } from 'framer-motion';

type SkeletonBlocksProps = {
  visible: boolean;
};

const pulse: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.6],
    transition: { duration: 0.4, times: [0, 0.6, 1], ease: 'easeOut' },
  },
  collapsed: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

const blockBase =
  'rounded-md bg-[var(--color-text-muted)]/20 backdrop-blur-[1px]';

export function SkeletonBlocks({ visible }: SkeletonBlocksProps) {
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      animate={visible ? 'visible' : 'collapsed'}
      className="pointer-events-none absolute inset-0 flex flex-col justify-center"
    >
      {/* Eyebrow placeholder */}
      <motion.div variants={pulse} className={`${blockBase} mb-7 h-3 w-64`} />

      {/* Headline placeholder — three rows */}
      <motion.div variants={pulse} className={`${blockBase} mb-3 h-[clamp(48px,8vw,80px)] w-[90%]`} />
      <motion.div variants={pulse} className={`${blockBase} mb-3 h-[clamp(48px,8vw,80px)] w-[75%]`} />
      <motion.div variants={pulse} className={`${blockBase} h-[clamp(48px,8vw,80px)] w-[60%]`} />

      {/* Subtext placeholder */}
      <motion.div variants={pulse} className={`${blockBase} mt-7 h-4 w-[36ch] max-w-full`} />
      <motion.div variants={pulse} className={`${blockBase} mt-2 h-4 w-[30ch] max-w-full`} />

      {/* CTA placeholders */}
      <div className="mt-10 flex gap-3">
        <motion.div variants={pulse} className={`${blockBase} h-12 w-36`} />
        <motion.div variants={pulse} className={`${blockBase} h-12 w-32`} />
      </div>
    </motion.div>
  );
}
