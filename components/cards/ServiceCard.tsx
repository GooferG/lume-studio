import { ArrowRight, Sparkles, ArrowRightLeft, Server, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Service } from '@/data/services';

const icons = {
  sparkles: Sparkles,
  'arrow-right-left': ArrowRightLeft,
  server: Server,
  zap: Zap,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]',
        'p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40',
      )}
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
        <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
      </div>
      <h3 className="mt-6 font-semibold text-base">{service.shortTitle}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {service.summary}
      </p>
    </Link>
  );
}
