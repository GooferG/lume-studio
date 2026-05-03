import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { process } from '@/data/process';

export function Process() {
  return (
    <Section id="process">
      <SectionLabel number="05">Process</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl">
        How it works
      </h2>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step) => (
          <div key={step.number}>
            <div className="text-3xl font-mono text-[var(--color-text-muted)]">{step.number}</div>
            <h3 className="mt-3 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
