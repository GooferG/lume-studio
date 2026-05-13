import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxBySlug, loadMdxEntries, WORK_DIR } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import { WorkDetailMedia } from '@/components/work/WorkDetailMedia';
import type { WorkItem } from '@/lib/work-types';

export async function generateStaticParams() {
  const entries = await loadMdxEntries(WORK_DIR);
  return entries.map((e) => ({ slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await loadMdxBySlug(WORK_DIR, slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description:
      typeof entry.frontmatter.summary === 'string' ? entry.frontmatter.summary : undefined,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await loadMdxBySlug(WORK_DIR, slug);
  if (!entry) notFound();

  const fm = entry.frontmatter as unknown as WorkItem & { year?: number };
  const stack = Array.isArray(fm.stack) ? fm.stack : [];

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Case study {fm.year ? `· ${fm.year}` : ''}</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">{fm.title}</h1>
      <div className="mt-3 text-[var(--color-text-muted)]">{fm.client}</div>
      {stack.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-10">
        <WorkDetailMedia item={fm} />
      </div>
      <article className="mt-12">
        <MDXRemote source={entry.body} components={mdxComponents} />
      </article>
      <div className="mt-16 flex gap-3 flex-wrap">
        <ButtonLink href="/work" variant="ghost">
          ← All work
        </ButtonLink>
        <ButtonLink href="/contact">Build something like this</ButtonLink>
      </div>
    </Container>
  );
}
