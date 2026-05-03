import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxBySlug, loadMdxEntries, SERVICES_DIR } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/MdxComponents';

export async function generateStaticParams() {
  const entries = await loadMdxEntries(SERVICES_DIR);
  return entries.map((e) => ({ slug: e.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await loadMdxBySlug(SERVICES_DIR, slug);
  if (!entry) return {};
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await loadMdxBySlug(SERVICES_DIR, slug);
  if (!entry) notFound();

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Service</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        {entry.frontmatter.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text-muted)]">{entry.frontmatter.summary}</p>
      <article className="mt-12">
        <MDXRemote source={entry.body} components={mdxComponents} />
      </article>
      <div className="mt-16 flex gap-3 flex-wrap">
        <ButtonLink href="/contact">Book a discovery call</ButtonLink>
        <ButtonLink href="/pricing" variant="secondary">
          See pricing
        </ButtonLink>
      </div>
    </Container>
  );
}
