import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { PackageCard } from '@/components/cards/PackageCard';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { packages } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent fixed-price packages plus custom quotes for larger projects.',
};

export default function PricingPage() {
  return (
    <>
      <Container className="py-20 md:py-28">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          Transparent pricing
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl">
          Fixed-price packages for most builds. For anything bigger or more bespoke, the quote form
          below collects what I need to come back with a number.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
      <Container
        id="quote"
        size="narrow"
        className="py-20 md:py-28 border-t border-[var(--color-border)]"
      >
        <SectionLabel>Quote</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Need something custom?
        </h2>
        <p className="mt-4 text-[var(--color-text-muted)]">
          Tell us about your project and we&rsquo;ll come back with a number within one business day.
        </p>
        <a
          href="https://forms.gle/aU5dStwZwXwrfhus8"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center h-12 px-7 text-base font-medium rounded-full bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
        >
          Fill out the quote form →
        </a>
      </Container>
    </>
  );
}
