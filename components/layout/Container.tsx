import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Container({
  className,
  size = 'default',
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: 'default' | 'narrow' | 'wide' }) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return <div className={cn('mx-auto px-6 md:px-8', widths[size], className)} {...props} />;
}
