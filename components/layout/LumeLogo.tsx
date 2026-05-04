import Link from 'next/link';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

function LensMark({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* outer ring */}
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      {/* coral pupil */}
      <circle cx="60" cy="60" r="28" fill="var(--color-coral)" />
      {/* light dot */}
      <circle cx="50" cy="50" r="6" fill="#ffffff" opacity="0.95" />
    </svg>
  );
}

export function LumeLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn('flex items-center gap-2.5 group', className)}
    >
      <LensMark className="text-(--color-text) shrink-0 transition-transform duration-300 group-hover:scale-110" />
      <span
        className="font-(family-name:--font-space-grotesk) font-medium tracking-[-0.02em] text-(--color-text) leading-none"
        style={{ fontSize: '18px' }}
      >
        Lume<span className="opacity-30">·</span>Studio
      </span>
    </Link>
  );
}
