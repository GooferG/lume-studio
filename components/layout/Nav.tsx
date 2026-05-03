import Link from 'next/link';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { mainNav } from '@/data/nav';
import { site } from '@/data/site';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--color-bg)]/70 border-b border-[var(--color-border)]">
      <Container className="flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-semibold tracking-wide text-sm"
          aria-label={`${site.name} home`}
        >
          {site.name.toUpperCase()}
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
