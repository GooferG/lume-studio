import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { ContactForm } from '@/components/forms/ContactForm';
import { CalPopup } from '@/components/contact/CalPopup';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a discovery call or send a message.',
};

export default function ContactPage() {
  const calUrl = site.calComUsername ? `https://cal.com/${site.calComUsername}/15min` : null;

  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Let&rsquo;s talk.</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Book a 15-minute discovery call, or send a message and I&rsquo;ll reply within one business
        day.
      </p>

      {calUrl ? (
        <div className="mt-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Book a 15-min discovery call</div>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Pick a time that works for you. The scheduler opens in a popup.
            </p>
          </div>
          <CalPopup calUrl={calUrl} triggerLabel="Pick a time →" />
        </div>
      ) : null}

      <div className="mt-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="font-semibold">Get a quote</div>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tell us about your business and what you need — we&rsquo;ll come back with a number.
          </p>
        </div>
        <a
          href="https://forms.gle/aU5dStwZwXwrfhus8"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center justify-center h-10 px-5 text-sm font-medium rounded-full bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
        >
          Fill out the form →
        </a>
      </div>

      <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
        <h2 className="text-lg font-semibold mb-2">Or send a message</h2>
        {site.ownerEmail ? (
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Or email me directly:{' '}
            <a className="underline" href={`mailto:${site.ownerEmail}`}>
              {site.ownerEmail}
            </a>
          </p>
        ) : null}
        <ContactForm />
      </div>
    </Container>
  );
}
