'use server';

import { headers } from 'next/headers';
import { QuoteFormSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/ratelimit';
import { sendQuoteEmail } from '@/lib/email';

export type ActionState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

const RATE = { max: 5, windowMs: 60 * 60 * 1000 }; // 5 per hour per IP

export async function submitQuote(
  _prev: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    businessName: String(formData.get('businessName') ?? ''),
    currentSiteUrl: String(formData.get('currentSiteUrl') ?? ''),
    projectType: String(formData.get('projectType') ?? ''),
    budgetRange: String(formData.get('budgetRange') ?? ''),
    timeline: String(formData.get('timeline') ?? ''),
    message: String(formData.get('message') ?? ''),
    honeypot: String(formData.get('honeypot') ?? ''),
  };

  // Honeypot tripped — silent success
  if (raw.honeypot && raw.honeypot.length > 0) {
    return { status: 'success', message: 'Thanks — I will be in touch soon.' };
  }

  const parsed = QuoteFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const limit = checkRateLimit(`quote:${ip}`, RATE);
  if (!limit.allowed) {
    return { status: 'error', message: 'Too many requests. Please try again later.' };
  }

  try {
    const data = parsed.data;
    await sendQuoteEmail({
      name: data.name,
      email: data.email,
      businessName: data.businessName || undefined,
      currentSiteUrl: data.currentSiteUrl || undefined,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      message: data.message,
    });
    return { status: 'success', message: 'Thanks — I will be in touch within 1 business day.' };
  } catch (err) {
    console.error('submitQuote send failed', err);
    return {
      status: 'error',
      message: 'Sending failed. Please email me directly instead.',
    };
  }
}
