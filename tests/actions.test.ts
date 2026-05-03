import { describe, it, expect, beforeEach, vi } from 'vitest';
import { _resetRateLimitForTests } from '@/lib/ratelimit';

vi.mock('@/lib/email', () => ({
  sendQuoteEmail: vi.fn().mockResolvedValue({ data: { id: 'fake' }, error: null }),
  sendContactEmail: vi.fn().mockResolvedValue({ data: { id: 'fake' }, error: null }),
}));

vi.mock('next/headers', () => ({
  headers: () => Promise.resolve(new Headers([['x-forwarded-for', '1.2.3.4']])),
}));

import { submitQuote } from '@/lib/actions/submitQuote';
import { submitContact } from '@/lib/actions/submitContact';
import * as email from '@/lib/email';

function quoteFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', 'Jane Doe');
  fd.append('email', 'jane@example.com');
  fd.append('businessName', 'Doe Bakery');
  fd.append('currentSiteUrl', '');
  fd.append('projectType', 'build');
  fd.append('budgetRange', '1k-3k');
  fd.append('timeline', 'flexible');
  fd.append('message', 'I need a website for my bakery.');
  fd.append('honeypot', '');
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  return fd;
}

function contactFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', 'Jane');
  fd.append('email', 'jane@example.com');
  fd.append('message', 'Hello there.');
  fd.append('honeypot', '');
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  return fd;
}

describe('submitQuote', () => {
  beforeEach(() => {
    _resetRateLimitForTests();
    vi.clearAllMocks();
  });

  it('returns success for valid data and sends email', async () => {
    const result = await submitQuote(undefined, quoteFormData());
    expect(result.status).toBe('success');
    expect(email.sendQuoteEmail).toHaveBeenCalledTimes(1);
  });

  it('returns validation error for invalid data', async () => {
    const result = await submitQuote(undefined, quoteFormData({ email: 'not-an-email' }));
    expect(result.status).toBe('error');
    expect(email.sendQuoteEmail).not.toHaveBeenCalled();
  });

  it('rejects honeypot submissions silently as success but does not email', async () => {
    const result = await submitQuote(undefined, quoteFormData({ honeypot: 'bot' }));
    expect(result.status).toBe('success');
    expect(email.sendQuoteEmail).not.toHaveBeenCalled();
  });

  it('rate-limits after 5 submissions per IP', async () => {
    for (let i = 0; i < 5; i++) await submitQuote(undefined, quoteFormData());
    const result = await submitQuote(undefined, quoteFormData());
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.message).toMatch(/too many/i);
    }
  });
});

describe('submitContact', () => {
  beforeEach(() => {
    _resetRateLimitForTests();
    vi.clearAllMocks();
  });

  it('returns success for valid data and sends email', async () => {
    const result = await submitContact(undefined, contactFormData());
    expect(result.status).toBe('success');
    expect(email.sendContactEmail).toHaveBeenCalledTimes(1);
  });

  it('returns error when message is too short', async () => {
    const result = await submitContact(undefined, contactFormData({ message: 'hi' }));
    expect(result.status).toBe('error');
  });
});
