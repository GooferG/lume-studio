'use client';

import { useActionState } from 'react';
import { submitContact } from '@/lib/actions/submitContact';
import type { ActionState } from '@/lib/actions/submitQuote';
import { FormField, inputClass } from './FormField';
import { SubmitButton } from './SubmitButton';
import { site } from '@/data/site';

const initial: ActionState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

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
      <FormField label="Name" htmlFor="c-name" required error={fieldErrors.name?.[0]}>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          className={inputClass}
          autoComplete="name"
        />
      </FormField>
      <FormField label="Email" htmlFor="c-email" required error={fieldErrors.email?.[0]}>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          className={inputClass}
          autoComplete="email"
        />
      </FormField>
      <FormField label="Message" htmlFor="c-message" required error={fieldErrors.message?.[0]}>
        <textarea id="c-message" name="message" required rows={6} className={inputClass} />
      </FormField>
      {state.status === 'error' && !state.fieldErrors ? (
        <p className="text-sm text-red-500">
          {state.message} Or email me directly:{' '}
          <a className="underline" href={`mailto:${site.ownerEmail}`}>
            {site.ownerEmail}
          </a>
        </p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton idleLabel="Send" />
      </div>
    </form>
  );
}
