import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container size="narrow" className="py-32 text-center">
      <div className="text-7xl font-mono text-[var(--color-text-muted)]">404</div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Couldn&rsquo;t find that.</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        The page you tried to reach doesn&rsquo;t exist. Try one of these instead.
      </p>
      <div className="mt-10 flex gap-3 justify-center flex-wrap">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Services
        </ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Work
        </ButtonLink>
      </div>
    </Container>
  );
}
