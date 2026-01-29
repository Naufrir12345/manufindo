import { NextResponse } from 'next/server';

// Security headers configuration
export function securityHeaders() {
    const headers = new Headers();

    // Content Security Policy
    headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.sandbox.midtrans.com https://app.midtrans.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https:",
            "connect-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com https://api.midtrans.com",
            "frame-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
        ].join('; ')
    );

    // Strict Transport Security (HSTS)
    headers.set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
    );

    // Prevent clickjacking
    headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // XSS Protection (legacy browsers)
    headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy
    headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );

    return headers;
}

// Apply security headers to response
export function applySecurityHeaders(response: NextResponse) {
    const headers = securityHeaders();
    headers.forEach((value, key) => {
        response.headers.set(key, value);
    });
    return response;
}

// CORS configuration for API routes
export function corsHeaders(origin?: string) {
    const headers = new Headers();

    // Only allow same origin in production
    const allowedOrigins = process.env.NODE_ENV === 'production'
        ? [process.env.NEXT_PUBLIC_SITE_URL || 'https://manufindo.com']
        : ['http://localhost:3000', 'http://localhost:3001'];

    if (origin && allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', origin);
    }

    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Max-Age', '86400');

    return headers;
}
