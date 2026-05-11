import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionLabel } from '@/components/sections/SectionLabel';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `How ${site.name} handles your information.`,
};

const lastUpdated = 'May 11, 2026';

export default function PrivacyPage() {
  return (
    <Container size="narrow" className="py-20 md:py-28">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">Last updated: {lastUpdated}</p>

      <div className="mt-10 space-y-10 text-[var(--color-text-muted)] leading-relaxed">
        <section>
          <p>
            {site.name} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is a small studio run by {site.ownerName}.
            This page explains what information we collect when you use this site or work with us,
            how we use it, and the choices you have.
          </p>
          <p className="mt-4 font-serif italic text-[var(--color-text)]">
            We do not sell, rent, or trade your personal information. Ever.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Information we collect</h2>
          <p className="mt-3">We only collect what we need to respond to you and do the work:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--color-text)]">Contact &amp; quote forms.</strong> Name,
              email, business name, current website URL, project details, budget, and timeline —
              whatever you choose to share.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Bookings.</strong> If you book a call,
              the scheduling tool collects your name, email, and meeting time.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Project files.</strong> Anything you
              send us during a project (copy, logos, photos, credentials needed to do the work).
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Analytics.</strong> Aggregate, anonymous
              traffic data (page views, referrers, device type) via Vercel Analytics. No cookies,
              no cross-site tracking.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">How we use it</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Reply to your message and answer questions.</li>
            <li>Scope, propose, and deliver work you&rsquo;ve asked for.</li>
            <li>Send invoices and project updates.</li>
            <li>Understand which pages people find useful so we can improve the site.</li>
          </ul>
          <p className="mt-3">
            We don&rsquo;t use your information for advertising and we don&rsquo;t add you to any
            marketing list without your consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Who we share it with</h2>
          <p className="mt-3">
            We share data only with the service providers we need to operate the studio. Each has
            its own privacy policy:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[var(--color-text)]">Vercel</strong> — site hosting and
              anonymous analytics.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Resend</strong> — delivers form
              submissions to our inbox.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Cal.com</strong> — handles call
              bookings (only if you book one).
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Email &amp; cloud storage providers</strong>{' '}
              — store the messages and files you send us.
            </li>
          </ul>
          <p className="mt-3">
            We may also disclose information if required by law (court order, subpoena, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Cookies</h2>
          <p className="mt-3">
            This site does not use tracking cookies. Vercel Analytics is cookieless. Your browser
            may still store small technical items (e.g. theme preference) locally on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">How long we keep it</h2>
          <p className="mt-3">
            We keep inquiry emails and project records for as long as needed to provide the
            service, respond to follow-ups, and meet tax/accounting requirements. You can ask us
            to delete your information at any time (see below).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Your rights</h2>
          <p className="mt-3">
            You can ask us to access, correct, export, or delete your personal information. Email
            us and we&rsquo;ll handle it within a reasonable timeframe. If you&rsquo;re in the EU,
            UK, or California, you have additional rights under GDPR / CCPA — same email, same
            process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Children</h2>
          <p className="mt-3">
            This site is not directed at children under 13, and we don&rsquo;t knowingly collect
            information from them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Changes to this policy</h2>
          <p className="mt-3">
            If we change anything material, we&rsquo;ll update the &ldquo;Last updated&rdquo; date
            above. Continued use of the site after a change means you accept the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Contact</h2>
          <p className="mt-3">
            Questions, requests, or anything else privacy-related:{' '}
            {site.ownerEmail ? (
              <a className="underline" href={`mailto:${site.ownerEmail}`}>
                {site.ownerEmail}
              </a>
            ) : (
              <a className="underline" href="/contact">
                use the contact form
              </a>
            )}
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
