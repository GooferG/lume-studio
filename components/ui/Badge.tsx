import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Badge({
  className,
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider',
        variant === 'default'
          ? 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
          : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30',
        className,
      )}
      {...props}
    />
  );
}
