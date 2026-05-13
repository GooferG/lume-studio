'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WorkItem } from '@/lib/work-types';
import { LivePreviewTile } from './LivePreviewTile';
import { BeforeAfterTile } from './BeforeAfterTile';

export function ProjectCard({ item }: { item: WorkItem }) {
  return (
    <article
      className={cn(
        'group block rounded-xl overflow-hidden border border-[var(--color-border)]',
        'bg-[var(--color-surface)] transition-transform hover:-translate-y-0.5',
      )}
    >
      <Media item={item} />

      <Link href={`/work/${item.slug}`} className="block p-5 focus-visible:outline-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition-colors">
              {item.title}
            </h3>
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
      </Link>
    </article>
  );
}

function Media({ item }: { item: WorkItem }) {
  if (item.displayType === 'live-preview' && item.liveUrl) {
    return (
      <LivePreviewTile
        slug={item.slug}
        title={item.title}
        liveUrl={item.liveUrl}
        posterImage={item.posterImage ?? item.cover}
        coverPosition={item.coverPosition}
      />
    );
  }

  if (item.displayType === 'before-after' && item.beforeImage && item.afterImage) {
    return (
      <BeforeAfterTile
        title={item.title}
        beforeImage={item.beforeImage}
        afterImage={item.afterImage}
        beforeLabel={item.beforeLabel}
        afterLabel={item.afterLabel}
      />
    );
  }

  // Static fallback — matches the old WorkCard look
  return (
    <Link
      href={`/work/${item.slug}`}
      className="relative block aspect-[16/10] bg-[var(--color-bg)] overflow-hidden"
    >
      <Image
        src={item.cover}
        alt={item.title}
        fill
        className={cn(
          'object-cover transition-transform duration-500 group-hover:scale-105',
          item.coverPosition === 'top' && 'object-top',
          item.coverPosition === 'bottom' && 'object-bottom',
        )}
        sizes="(min-width: 768px) 50vw, 100vw"
        priority
      />
    </Link>
  );
}
