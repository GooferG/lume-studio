'use client';

import { motion, type Variants } from 'framer-motion';

type SkeletonBlocksProps = {
  visible: boolean;
};

const parent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  collapsed: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const block: Variants = {
  hidden: { opacity: 0, scaleX: 0.4, transformOrigin: '0% 50%' },
  visible: {
    opacity: [0, 1, 0.85, 0.95, 0.85],
    scaleX: 1,
    transition: {
      duration: 0.9,
      times: [0, 0.25, 0.55, 0.8, 1],
      ease: 'easeOut',
      repeat: Infinity,
      repeatType: 'mirror',
    },
  },
  collapsed: { opacity: 0, transition: { duration: 0.25 } },
};

const blockBase = 'rounded-md bg-[var(--color-text-muted)]/45';

export function SkeletonBlocks({ visible }: SkeletonBlocksProps) {
  return (
    <motion.div
      aria-hidden
      initial="hidden"
      animate={visible ? 'visible' : 'collapsed'}
      variants={parent}
      className="pointer-events-none absolute inset-0 flex flex-col justify-center"
    >
      {/* Eyebrow placeholder */}
      <motion.div variants={block} className={`${blockBase} mb-7 h-3 w-64`} />

      {/* Headline placeholder — three rows */}
      <motion.div
        variants={block}
        className={`${blockBase} mb-3 h-[clamp(48px,8vw,80px)] w-[90%]`}
      />
      <motion.div
        variants={block}
        className={`${blockBase} mb-3 h-[clamp(48px,8vw,80px)] w-[75%]`}
      />
      <motion.div
        variants={block}
        className={`${blockBase} h-[clamp(48px,8vw,80px)] w-[60%]`}
      />

      {/* Subtext placeholder */}
      <motion.div variants={block} className={`${blockBase} mt-7 h-4 w-[36ch] max-w-full`} />
      <motion.div variants={block} className={`${blockBase} mt-2 h-4 w-[30ch] max-w-full`} />

      {/* CTA placeholders */}
      <div className="mt-10 flex gap-3">
        <motion.div variants={block} className={`${blockBase} h-12 w-36`} />
        <motion.div variants={block} className={`${blockBase} h-12 w-32`} />
      </div>
    </motion.div>
  );
}
