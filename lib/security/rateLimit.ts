import { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
// In production, use Redis or similar
const rateLimit = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Max requests per window
}

// Default: 100 requests per 15 minutes
const DEFAULT_CONFIG: RateLimitConfig = {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100
};

// Strict rate limit for payment endpoints
export const PAYMENT_RATE_LIMIT: RateLimitConfig = {
    windowMs: 15 * 60 * 1000,  // 15 minutes
    maxRequests: 10  // Only 10 payment attempts per 15 min
};

export function getRateLimitKey(request: NextRequest): string {
    // Use IP address as identifier
    // NextRequest doesn't have ip property in types but it exists at runtime in some environments
    const ip = (request as unknown as { ip?: string }).ip ||
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown';

    const pathname = request.nextUrl.pathname;
    return `${ip}:${pathname}`;
}

export function checkRateLimit(
    key: string,
    config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = rateLimit.get(key);

    // Clean up expired records (simple garbage collection)
    if (record && now > record.resetTime) {
        rateLimit.delete(key);
    }

    if (!record || now > record.resetTime) {
        // New window
        const resetTime = now + config.windowMs;
        rateLimit.set(key, { count: 1, resetTime });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetTime
        };
    }

    // Existing window
    if (record.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: record.resetTime
        };
    }

    // Increment counter
    record.count += 1;
    rateLimit.set(key, record);

    return {
        allowed: true,
        remaining: config.maxRequests - record.count,
        resetTime: record.resetTime
    };
}

// Cleanup function to run periodically
export function cleanupRateLimitStore() {
    const now = Date.now();
    for (const [key, record] of rateLimit.entries()) {
        if (now > record.resetTime) {
            rateLimit.delete(key);
        }
    }
}

// Run cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupRateLimitStore, 10 * 60 * 1000);
}
