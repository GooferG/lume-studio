'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type BeforeAfterTileProps = {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfterTile({
  title,
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterTileProps) {
  const [reveal, setReveal] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromPointer = useCallback((clientX: number) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setReveal(Math.max(0, Math.min(100, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromPointer(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setReveal((v) => Math.max(0, v - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setReveal((v) => Math.min(100, v + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setReveal(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setReveal(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] bg-[var(--color-bg)] overflow-hidden select-none touch-none cursor-ew-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After image (bottom layer, full) */}
      <Image
        src={afterImage}
        alt={`${title} — after`}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-top"
        priority
      />

      {/* Before image (top layer, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${title} — before`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Labels */}
      <span
        aria-hidden
        className={cn(
          'absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase',
          'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
          'text-[var(--color-text-muted)]',
        )}
      >
        {beforeLabel}
      </span>
      <span
        aria-hidden
        className={cn(
          'absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase',
          'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
          'text-[var(--color-text-muted)]',
        )}
      >
        {afterLabel}
      </span>

      {/* Divider line */}
      <div
        aria-hidden
        className="absolute inset-y-0 w-px bg-white/80 mix-blend-difference pointer-events-none"
        style={{ left: `${reveal}%` }}
      />

      {/* Handle */}
      <button
        type="button"
        role="slider"
        aria-label={`${title} before-and-after slider`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(reveal)}
        aria-valuetext={`${Math.round(reveal)}% revealing ${beforeLabel}`}
        onKeyDown={onKeyDown}
        className={cn(
          'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg',
          'text-[var(--color-text)] cursor-ew-resize',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        )}
        style={{ left: `${reveal}%` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="15 18 9 12 15 6" />
          <polyline points="9 6 15 12 9 18" transform="translate(6 0)" />
        </svg>
      </button>
    </div>
  );
}
