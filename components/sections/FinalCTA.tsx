import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { ButtonLink } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <Section id="cta">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-accent)]/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <SectionLabel className="justify-center inline-block">
            Get started
          </SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Ready to build a site you&rsquo;re proud of?
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)] max-w-md mx-auto">
            Book a 15-minute call or send a quote request. No commitment.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <ButtonLink href="/contact">Book a call</ButtonLink>
            <ButtonLink href="https://forms.gle/aU5dStwZwXwrfhus8" variant="secondary">
              Get a quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
