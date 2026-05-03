import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { PackageCard } from '@/components/cards/PackageCard';
import { packages } from '@/data/packages';

export function Packages() {
  return (
    <Section id="pricing">
      <SectionLabel number="04">Pricing</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        Transparent pricing
      </h2>
      <p className="mt-4 text-[var(--color-text-muted)] max-w-xl">
        Pick a package or request a custom quote. No hidden fees, no surprise renewals.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.slug} pkg={pkg} />
        ))}
      </div>
    </Section>
  );
}
