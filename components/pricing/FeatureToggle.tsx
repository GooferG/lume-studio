'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureToggleProps = {
  id: string;
  label: string;
  price: number;
  selected: boolean;
  onChange: (next: boolean) => void;
};

export function FeatureToggle({ id, label, price, selected, onChange }: FeatureToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={selected}
      onClick={() => onChange(!selected)}
      className={cn(
        'group flex items-center justify-between gap-3 w-full rounded-lg px-4 py-3 text-left',
        'border transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        selected
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-muted)]',
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          aria-hidden
          className={cn(
            'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors',
            selected
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
              : 'border-[var(--color-border)] bg-[var(--color-bg)]',
          )}
        >
          {selected && <Check className="h-3.5 w-3.5" />}
        </span>
        <span className="text-sm font-medium text-[var(--color-text)] truncate">{label}</span>
      </div>
      <span
        className={cn(
          'text-xs font-medium whitespace-nowrap transition-colors',
          selected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]',
        )}
      >
        +${price.toLocaleString()}
      </span>
    </button>
  );
}
