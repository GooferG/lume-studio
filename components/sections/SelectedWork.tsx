import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { ButtonLink } from '@/components/ui/Button';
import { loadMdxEntries, WORK_DIR } from '@/lib/mdx';

export async function SelectedWork() {
  const entries = await loadMdxEntries(WORK_DIR);
  const items: WorkItem[] = entries.slice(0, 2).map((e) => {
    const f = e.frontmatter as WorkItem & { stack: string[] };
    return {
      slug: f.slug,
      title: f.title,
      client: f.client,
      summary: f.summary,
      cover: f.cover,
      stack: f.stack,
      coverPosition: f.coverPosition,
    };
  });

  return (
    <Section id="work">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Recent builds</h2>
        </div>
        <ButtonLink href="/work" variant="ghost" size="sm">
          See all work →
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
