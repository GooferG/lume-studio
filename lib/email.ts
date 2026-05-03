import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    resendClient = new Resend(key);
  }
  return resendClient;
}

export async function sendQuoteEmail(payload: {
  name: string;
  email: string;
  businessName?: string;
  currentSiteUrl?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'hello@lume.studio';
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error('RESEND_TO_EMAIL is not set');

  const subject = `New quote request from ${payload.name}`;
  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Business:</strong> ${escapeHtml(payload.businessName ?? '—')}</p>
    <p><strong>Current site:</strong> ${escapeHtml(payload.currentSiteUrl ?? '—')}</p>
    <p><strong>Project type:</strong> ${escapeHtml(payload.projectType)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(payload.budgetRange)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline)}</p>
    <hr/>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>
  `;
  return getResend().emails.send({ from, to, subject, html, replyTo: payload.email });
}

export async function sendContactEmail(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'hello@lume.studio';
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error('RESEND_TO_EMAIL is not set');

  const subject = `New contact message from ${payload.name}`;
  const html = `
    <h2>New contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <hr/>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br/>')}</p>
  `;
  return getResend().emails.send({ from, to, subject, html, replyTo: payload.email });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
