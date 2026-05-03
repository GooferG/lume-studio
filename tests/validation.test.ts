import { describe, it, expect } from 'vitest';
import { QuoteFormSchema, ContactFormSchema } from '@/lib/validation';

describe('QuoteFormSchema', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    businessName: 'Doe Bakery',
    currentSiteUrl: 'https://oldsite.com',
    projectType: 'build' as const,
    budgetRange: '1k-3k' as const,
    timeline: 'flexible' as const,
    message: 'I need a new site for my bakery.',
    honeypot: '',
  };

  it('accepts a valid payload', () => {
    expect(QuoteFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects when honeypot is filled', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, honeypot: 'spam' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects missing required fields', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, name: '', message: '' });
    expect(result.success).toBe(false);
  });

  it('treats currentSiteUrl as optional', () => {
    const { currentSiteUrl, ...rest } = valid;
    void currentSiteUrl;
    expect(QuoteFormSchema.safeParse(rest).success).toBe(true);
  });

  it('rejects an invalid currentSiteUrl', () => {
    const result = QuoteFormSchema.safeParse({ ...valid, currentSiteUrl: 'not a url' });
    expect(result.success).toBe(false);
  });
});

describe('ContactFormSchema', () => {
  const valid = {
    name: 'Jane',
    email: 'jane@example.com',
    message: 'Hello.',
    honeypot: '',
  };

  it('accepts a valid payload', () => {
    expect(ContactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects empty message', () => {
    expect(ContactFormSchema.safeParse({ ...valid, message: '' }).success).toBe(false);
  });
});
