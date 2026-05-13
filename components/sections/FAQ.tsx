'use client';

import { useRef, useState } from 'react';
import { Section } from './Section';
import { SectionLabel } from './SectionLabel';
import { FAQItem } from '@/components/faq/FAQItem';
import { faq } from '@/data/faq';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function focusButton(i: number) {
    const clamped = (i + faq.length) % faq.length;
    buttonsRef.current[clamped]?.focus();
  }

  function handleKeyNav(index: number, direction: 'next' | 'prev' | 'first' | 'last') {
    if (direction === 'next') focusButton(index + 1);
    else if (direction === 'prev') focusButton(index - 1);
    else if (direction === 'first') focusButton(0);
    else focusButton(faq.length - 1);
  }

  return (
    <Section id="faq" containerSize="narrow">
      <SectionLabel>FAQ</SectionLabel>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Common questions</h2>
      <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {faq.map((item, idx) => (
          <FAQItem
            key={idx}
            question={item.question}
            answer={item.answer}
            open={openIndex === idx}
            dimmed={openIndex !== null && openIndex !== idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            onKeyNav={(direction) => handleKeyNav(idx, direction)}
            buttonRef={(el) => {
              buttonsRef.current[idx] = el;
            }}
          />
        ))}
      </div>
    </Section>
  );
}
