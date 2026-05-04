'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { faq } from '@/data/faq';

export function FAQ() {
  return (
    <Section id="faq" containerSize="narrow">
      <SectionLabel>FAQ</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Common questions</h2>
      <Accordion.Root
        type="single"
        collapsible
        className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]"
      >
        {faq.map((item, idx) => (
          <Accordion.Item key={idx} value={`item-${idx}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-base font-medium hover:text-[var(--color-accent)] transition-colors">
                {item.question}
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm text-[var(--color-text-muted)] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pb-5 pr-8">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Section>
  );
}
