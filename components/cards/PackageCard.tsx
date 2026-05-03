import { Check } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Package } from '@/data/packages';

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 md:p-8 flex flex-col',
        pkg.highlight
          ? 'border-2 border-[var(--color-accent)] bg-[var(--color-surface)] shadow-lg shadow-[var(--color-accent)]/10'
          : 'border border-[var(--color-border)] bg-[var(--color-surface)]',
      )}
    >
      {pkg.priceNote ? (
        <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-accent)] mb-2">
          {pkg.priceNote}
        </div>
      ) : (
        <div className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-text-muted)] mb-2">
          {pkg.name}
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{pkg.description}</p>
      <ul className="mt-6 space-y-3 flex-1">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 mt-0.5 text-[var(--color-accent)] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={pkg.ctaHref}
        variant={pkg.highlight ? 'primary' : 'secondary'}
        className="mt-8 w-full"
      >
        {pkg.ctaLabel}
      </ButtonLink>
    </div>
  );
}
