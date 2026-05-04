import Link from 'next/link';
import { Container } from './Container';
import { LumeLogo } from './LumeLogo';
import { site } from '@/data/site';
import { footerNav } from '@/data/nav';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-12">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <LumeLogo />
          <p className="mt-3 text-sm text-(--color-text-muted) max-w-xs">{site.tagline}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Site
          </div>
          <ul className="space-y-2 text-sm">
            {[...footerNav.primary, ...footerNav.secondary].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
            Legal
          </div>
          <ul className="space-y-2 text-sm">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-10 pt-6 border-t border-[var(--color-border)] flex justify-between text-xs text-[var(--color-text-muted)]">
        <span>
          © {year} {site.name}
        </span>
        <span>Built with Next.js</span>
      </Container>
    </footer>
  );
}
