'use server';

import { headers } from 'next/headers';
import { ContactFormSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';
import { sendContactEmail } from '@/lib/email';
import type { ActionState } from './submitQuote';

const RATE = { max: 5, windowMs: 60 * 60 * 1000 };

export async function submitContact(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    honeypot: String(formData.get('honeypot') ?? ''),
  };

  if (raw.honeypot && raw.honeypot.length > 0) {
    return { status: 'success', message: 'Thanks — I will be in touch soon.' };
  }

  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const limit = checkRateLimit(`contact:${ip}`, RATE);
  if (!limit.allowed) {
    return { status: 'error', message: 'Too many requests. Please try again later.' };
  }

  try {
    await sendContactEmail(parsed.data);
    return { status: 'success', message: 'Thanks — message received.' };
  } catch (err) {
    console.error('submitContact send failed', err);
    return { status: 'error', message: 'Sending failed. Please email me directly instead.' };
  }
}
