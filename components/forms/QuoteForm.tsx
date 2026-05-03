'use client';

import { useActionState } from 'react';
import { submitQuote, type ActionState } from '@/lib/actions/submitQuote';
import { FormField, inputClass } from './FormField';
import { SubmitButton } from './SubmitButton';
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from '@/lib/validation';
import { site } from '@/data/site';

const initial: ActionState = { status: 'idle' };

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initial);

  if (state.status === 'success') {
    return (
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-6">
        <h3 className="font-semibold">Got it.</h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{state.message}</p>
      </div>
    );
  }

  const fieldErrors = state.status === 'error' ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="grid gap-4">
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" htmlFor="name" required error={fieldErrors.name?.[0]}>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            autoComplete="name"
          />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={fieldErrors.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Business name" htmlFor="businessName" error={fieldErrors.businessName?.[0]}>
          <input
            id="businessName"
            name="businessName"
            type="text"
            className={inputClass}
            autoComplete="organization"
          />
        </FormField>
        <FormField
          label="Current site URL"
          htmlFor="currentSiteUrl"
          error={fieldErrors.currentSiteUrl?.[0]}
        >
          <input
            id="currentSiteUrl"
            name="currentSiteUrl"
            type="url"
            placeholder="https://"
            className={inputClass}
          />
        </FormField>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          label="Project type"
          htmlFor="projectType"
          required
          error={fieldErrors.projectType?.[0]}
        >
          <select
            id="projectType"
            name="projectType"
            defaultValue="build"
            required
            className={inputClass}
          >
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Budget" htmlFor="budgetRange" required error={fieldErrors.budgetRange?.[0]}>
          <select id="budgetRange" name="budgetRange" required className={inputClass}>
            <option value="">Select…</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Timeline" htmlFor="timeline" required error={fieldErrors.timeline?.[0]}>
          <select id="timeline" name="timeline" required className={inputClass}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <FormField label="Message" htmlFor="message" required error={fieldErrors.message?.[0]}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell me about your project — what you have, what you want, any constraints."
        />
      </FormField>
      {state.status === 'error' && !state.fieldErrors ? (
        <p className="text-sm text-red-500">
          {state.message} You can also email me directly at{' '}
          <a className="underline" href={`mailto:${site.ownerEmail}`}>
            {site.ownerEmail}
          </a>
          .
        </p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton idleLabel="Send request" />
      </div>
    </form>
  );
}
