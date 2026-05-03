import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { loadMdxEntries, WORK_DIR } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
};

export default async function WorkIndexPage() {
  const entries = await loadMdxEntries(WORK_DIR);
  const items: WorkItem[] = entries.map((e) => {
    const f = e.frontmatter as WorkItem & { stack: string[] };
    return {
      slug: f.slug,
      title: f.title,
      client: f.client,
      summary: f.summary,
      cover: f.cover,
      stack: f.stack,
    };
  });

  return (
    <Container className="py-20 md:py-28">
      <SectionLabel>Work</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
        Selected projects
      </h1>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Container>
  );
}
