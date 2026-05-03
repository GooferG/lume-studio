import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
  required,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]"
      >
        {label}
        {required ? <span className="text-[var(--color-accent)] ml-1">*</span> : null}
      </label>
      {children}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </div>
  );
}

const inputBase =
  'w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 ' +
  'text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] ' +
  'focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]';

export const inputClass = inputBase;
