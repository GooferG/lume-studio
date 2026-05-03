import { cn } from '@/lib/utils';

export function Callout({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'accent';
}) {
  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-4 my-6 text-sm',
        tone === 'accent'
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
          : 'border-[var(--color-border)] bg-[var(--color-surface)]',
      )}
    >
      {children}
    </div>
  );
}
