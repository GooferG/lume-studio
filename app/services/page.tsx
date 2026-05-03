import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { loadMdxEntries, SERVICES_DIR } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web build, migrations, hosting, and optimization services.',
};

export default async function ServicesIndexPage() {
  const entries = await loadMdxEntries(SERVICES_DIR);
  return (
    <Container className="py-20 md:py-28">
      <SectionLabel>Services</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
        What I do
      </h1>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
        Four focused services for small businesses with no website or an outdated one.
      </p>
      <div className="mt-12 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {entries.map((entry) => (
          <Link
            key={entry.frontmatter.slug}
            href={`/services/${entry.frontmatter.slug}`}
            className="group flex items-start justify-between gap-6 py-8 hover:bg-[var(--color-surface)]/50 transition-colors -mx-6 md:-mx-8 px-6 md:px-8"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                {entry.frontmatter.title}
              </h2>
              <p className="mt-2 text-[var(--color-text-muted)]">{entry.frontmatter.summary}</p>
            </div>
            <ArrowRight className="h-5 w-5 mt-2 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
