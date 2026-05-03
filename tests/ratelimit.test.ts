import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, _resetRateLimitForTests } from '@/lib/ratelimit';

describe('checkRateLimit', () => {
  beforeEach(() => _resetRateLimitForTests());

  it('allows the first request from a key', () => {
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 })).toEqual({
      allowed: true,
      remaining: 2,
    });
  });

  it('counts subsequent requests in the same window', () => {
    checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 })).toEqual({
      allowed: true,
      remaining: 0,
    });
  });

  it('blocks when limit is exceeded', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 }).allowed).toBe(false);
  });

  it('keys are independent', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('1.2.3.4', { max: 3, windowMs: 60_000 });
    expect(checkRateLimit('5.6.7.8', { max: 3, windowMs: 60_000 }).allowed).toBe(true);
  });

  it('resets after the window passes', () => {
    const now = Date.now();
    checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now });
    expect(checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now }).allowed).toBe(false);
    expect(checkRateLimit('1.2.3.4', { max: 1, windowMs: 1000, now: now + 1500 }).allowed).toBe(
      true,
    );
  });
});
