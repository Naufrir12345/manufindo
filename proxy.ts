import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders } from './lib/security/headers';
import { checkRateLimit, getRateLimitKey } from './lib/security/rateLimit';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Apply security headers to all responses
    let response = NextResponse.next();
    response = applySecurityHeaders(response);

    // Rate limiting for API routes
    if (pathname.startsWith('/api/')) {
        const rateLimitKey = getRateLimitKey(request);
        const { allowed, remaining, resetTime } = checkRateLimit(rateLimitKey);

        if (!allowed) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Too many requests. Please try again later.',
                    resetTime: new Date(resetTime).toISOString()
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
                        'X-RateLimit-Limit': '100',
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': String(resetTime)
                    }
                }
            );
        }

        // Add rate limit headers to successful responses
        response.headers.set('X-RateLimit-Limit', '100');
        response.headers.set('X-RateLimit-Remaining', String(remaining));
        response.headers.set('X-RateLimit-Reset', String(resetTime));
    }

    // Extra strict rate limiting for payment endpoints
    if (pathname.startsWith('/api/midtrans')) {
        const paymentKey = `payment:${getRateLimitKey(request)}`;
        const { allowed, resetTime } = checkRateLimit(paymentKey, {
            windowMs: 15 * 60 * 1000,  // 15 minutes
            maxRequests: 10  // Only 10 payment attempts
        });

        if (!allowed) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Payment rate limit exceeded. Please try again later.',
                    resetTime: new Date(resetTime).toISOString()
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000))
                    }
                }
            );
        }
    }

    return response;
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
