'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export type FAQItemProps = {
  question: string;
  answer: string;
  open: boolean;
  dimmed: boolean;
  onToggle: () => void;
  onKeyNav: (direction: 'next' | 'prev' | 'first' | 'last') => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
};

export function FAQItem({
  question,
  answer,
  open,
  dimmed,
  onToggle,
  onKeyNav,
  buttonRef,
}: FAQItemProps) {
  const contentId = useId();
  const triggerId = useId();
  const reducedMotion = useReducedMotion();

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        onKeyNav('next');
        break;
      case 'ArrowUp':
        event.preventDefault();
        onKeyNav('prev');
        break;
      case 'Home':
        event.preventDefault();
        onKeyNav('first');
        break;
      case 'End':
        event.preventDefault();
        onKeyNav('last');
        break;
    }
  }

  return (
    <div
      className={cn(
        'transition-opacity duration-300',
        dimmed ? 'opacity-60' : 'opacity-100',
      )}
    >
      <h3>
        <button
          ref={buttonRef}
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'group flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium',
            'text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors',
            'focus-visible:outline-none focus-visible:text-[var(--color-accent)]',
          )}
        >
          <span>{question}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <motion.p
            initial={false}
            animate={
              reducedMotion
                ? { opacity: open ? 1 : 0 }
                : { opacity: open ? 1 : 0, y: open ? 0 : -4 }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.3,
              ease: 'easeOut',
              delay: open && !reducedMotion ? 0.1 : 0,
            }}
            className="pb-5 pr-8 text-sm text-[var(--color-text-muted)] leading-relaxed"
          >
            {answer}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
