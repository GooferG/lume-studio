import { z } from 'zod';

export const PROJECT_TYPES = ['build', 'migrate', 'optimize', 'hosting', 'other'] as const;
export const BUDGET_RANGES = ['<1k', '1k-3k', '3k-5k', '5k+', 'unsure'] as const;
export const TIMELINES = ['asap', '1mo', '1-3mo', 'flexible'] as const;

export const QuoteFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Enter a valid email').max(200),
  businessName: z.string().max(200).optional().or(z.literal('')),
  currentSiteUrl: z.string().url('Enter a valid URL').max(500).optional().or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES),
  budgetRange: z.enum(BUDGET_RANGES),
  timeline: z.enum(TIMELINES),
  message: z.string().min(10, 'Tell me a bit more').max(5000),
  honeypot: z.string().max(0, 'Bot detected'),
});
export type QuoteFormInput = z.infer<typeof QuoteFormSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(5).max(5000),
  honeypot: z.string().max(0),
});
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
