import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { services } from '@/data/services';

export function ServicesPreview() {
  return (
    <Section id="services">
      <SectionLabel number="02">Services</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        What I do
      </h2>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-xl">
        Four focused services that cover everything from a brand-new site to fixing the one you
        already have.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}
