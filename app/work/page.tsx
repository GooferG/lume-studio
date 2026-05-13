import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ProjectCard } from '@/components/work/ProjectCard';
import { ActiveTileProvider } from '@/components/work/ActiveTileContext';
import { loadMdxEntries, WORK_DIR } from '@/lib/mdx';
import type { WorkItem } from '@/lib/work-types';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects and case studies.',
};

export default async function WorkIndexPage() {
  const entries = await loadMdxEntries(WORK_DIR);
  const items: WorkItem[] = entries.map((e) => e.frontmatter as WorkItem);

  return (
    <Container className="py-20 md:py-28">
      <SectionLabel>Work</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
        Selected projects
      </h1>
      <ActiveTileProvider>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <ProjectCard key={item.slug} item={item} />
          ))}
        </div>
      </ActiveTileProvider>
    </Container>
  );
}
