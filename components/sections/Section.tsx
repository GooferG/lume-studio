import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

export function Section({
  className,
  children,
  containerSize,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  containerSize?: 'narrow' | 'default' | 'wide';
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
