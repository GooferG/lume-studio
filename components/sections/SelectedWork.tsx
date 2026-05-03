import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { WorkCard, type WorkItem } from '@/components/cards/WorkCard';
import { ButtonLink } from '@/components/ui/Button';

const featuredWork: WorkItem[] = [
  {
    slug: 'universally-us',
    title: 'Universally Us',
    client: 'Informational platform',
    summary:
      'A headless-CMS-driven content site built on Next.js, focused on accessibility and performance.',
    cover: '/images/work/universally-us-cover.svg',
    stack: ['Next.js', 'Headless CMS', 'Tailwind'],
  },
];

export function SelectedWork() {
  return (
    <Section id="work">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <SectionLabel number="03">Selected work</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Recent builds</h2>
        </div>
        <ButtonLink href="/work" variant="ghost" size="sm">
          See all work →
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {featuredWork.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
