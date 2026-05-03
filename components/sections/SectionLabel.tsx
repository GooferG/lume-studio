import { cn } from '@/lib/utils';

export function SectionLabel({
  number,
  children,
  className,
}: {
  number?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]',
        className,
      )}
    >
      {number ? <span className="opacity-70 mr-2">{number} ·</span> : null}
      {children}
    </div>
  );
}
