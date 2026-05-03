type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

export type RateLimitOptions = {
  max: number;
  windowMs: number;
  now?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
};

export function checkRateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = opts.now ?? Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { allowed: true, remaining: Math.max(0, opts.max - 1) };
  }

  if (existing.count >= opts.max) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: Math.max(0, opts.max - existing.count) };
}

export function _resetRateLimitForTests() {
  buckets.clear();
}
