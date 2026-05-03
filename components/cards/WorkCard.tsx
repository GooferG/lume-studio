import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  cover: string;
  stack: string[];
};

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn(
        'group block rounded-xl overflow-hidden border border-[var(--color-border)]',
        'bg-[var(--color-surface)] transition-all hover:-translate-y-0.5',
      )}
    >
      <div className="relative aspect-[16/10] bg-[var(--color-bg)] overflow-hidden">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.client}</div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0" />
        </div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{item.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
