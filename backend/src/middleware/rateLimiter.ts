import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateLimitEntry>();

export function rateLimiter(maxRequests: number = 30, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const entry = ipBuckets.get(ip);

    if (!entry || now > entry.resetAt) {
      ipBuckets.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    entry.count += 1;
    return next();
  };
}
