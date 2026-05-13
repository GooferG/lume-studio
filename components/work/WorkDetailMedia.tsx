'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BeforeAfterTile } from './BeforeAfterTile';
import type { WorkItem } from '@/lib/work-types';

const VIEWPORT_WIDTH = 1280;

type Props = {
  item: Pick<
    WorkItem,
    | 'title'
    | 'cover'
    | 'coverPosition'
    | 'displayType'
    | 'liveUrl'
    | 'posterImage'
    | 'beforeImage'
    | 'afterImage'
    | 'beforeLabel'
    | 'afterLabel'
  >;
};

export function WorkDetailMedia({ item }: Props) {
  if (item.displayType === 'live-preview' && item.liveUrl) {
    return (
      <AlwaysOnLivePreview
        title={item.title}
        liveUrl={item.liveUrl}
        posterImage={item.posterImage ?? item.cover}
        coverPosition={item.coverPosition}
      />
    );
  }

  if (item.displayType === 'before-after' && item.beforeImage && item.afterImage) {
    return (
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)]">
        <BeforeAfterTile
          title={item.title}
          beforeImage={item.beforeImage}
          afterImage={item.afterImage}
          beforeLabel={item.beforeLabel}
          afterLabel={item.afterLabel}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]">
      <Image
        src={item.cover}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 800px, 100vw"
        className={cn(
          'object-cover',
          item.coverPosition === 'top' && 'object-top',
          item.coverPosition === 'bottom' && 'object-bottom',
        )}
        priority
      />
    </div>
  );
}

function AlwaysOnLivePreview({
  title,
  liveUrl,
  posterImage,
  coverPosition,
}: {
  title: string;
  liveUrl: string;
  posterImage: string;
  coverPosition?: 'center' | 'top' | 'bottom';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? node.clientWidth;
      setScale(width / VIEWPORT_WIDTH);
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <Image
        src={posterImage}
        alt={`${title} preview`}
        fill
        sizes="(min-width: 1024px) 800px, 100vw"
        className={cn(
          'object-cover transition-opacity duration-500',
          coverPosition === 'top' && 'object-top',
          coverPosition === 'bottom' && 'object-bottom',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
        priority
      />

      <iframe
        src={liveUrl}
        title={`Live preview of ${title}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute top-0 left-0 border-0 origin-top-left transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          width: `${VIEWPORT_WIDTH}px`,
          height: scale > 0 ? `${100 / scale}%` : '100%',
          transform: `scale(${scale || 1})`,
        }}
      />

      <a
        href={liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title} in a new tab`}
        className={cn(
          'absolute top-3 right-3 inline-flex items-center gap-1 rounded-full z-10',
          'bg-[var(--color-surface)]/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium',
          'border border-[var(--color-border)] text-[var(--color-text)]',
          'hover:bg-[var(--color-surface)] transition-colors',
        )}
      >
        Open live <ExternalLink className="h-3 w-3" />
      </a>

      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] z-10',
          'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
          'text-[var(--color-text-muted)] tracking-wider uppercase',
        )}
      >
        Live preview
      </div>
    </div>
  );
}
