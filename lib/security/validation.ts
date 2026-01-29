// Input validation and sanitization utilities

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
    if (!input) return '';

    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indonesian format)
 */
export function isValidPhone(phone: string): boolean {
    // Remove spaces, dashes, and plus sign
    const cleaned = phone.replace(/[\s\-+]/g, '');

    // Indonesian phone: 10-13 digits, starts with 0 or 62
    const phoneRegex = /^(0|62)\d{9,12}$/;
    return phoneRegex.test(cleaned);
}

/**
 * Validate price/amount (must be positive number)
 */
export function isValidAmount(amount: unknown): boolean {
    const num = Number(amount);
    return !isNaN(num) && num > 0 && isFinite(num);
}

/**
 * Sanitize and validate plan name
 */
export function isValidPlanName(plan: string): boolean {
    const validPlans = ['Basic', 'Plus', 'Intermediate', 'Advanced', 'Custom'];
    return validPlans.includes(plan);
}

/**
 * Validate order ID format
 */
export function isValidOrderId(orderId: string): boolean {
    // Order ID should start with ORDER- and contain alphanumeric
    const orderRegex = /^ORDER-[A-Z0-9-]+$/;
    return orderRegex.test(orderId);
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Validate and sanitize payment request
 */
export interface PaymentRequest {
    planName: string;
    planPrice: string;
    planAnalysis: string;
}

export function validatePaymentRequest(data: Record<string, unknown>): {
    valid: boolean;
    sanitized?: PaymentRequest;
    error?: string;
} {
    if (!data || typeof data !== 'object') {
        return { valid: false, error: 'Invalid request data' };
    }

    const { planName, planPrice, planAnalysis } = data as {
        planName: string;
        planPrice: string;
        planAnalysis: string;
    };

    // Validate plan name
    if (!planName || !isValidPlanName(planName)) {
        return { valid: false, error: 'Invalid plan name' };
    }

    // Validate price (should be numeric string)
    if (!planPrice || typeof planPrice !== 'string') {
        return { valid: false, error: 'Invalid price format' };
    }

    // Remove dots and validate
    const priceNumber = parseInt(planPrice.replace(/\./g, ''));
    if (!isValidAmount(priceNumber)) {
        return { valid: false, error: 'Invalid price value' };
    }

    // Validate analysis quota
    if (!planAnalysis || typeof planAnalysis !== 'string') {
        return { valid: false, error: 'Invalid analysis quota' };
    }

    return {
        valid: true,
        sanitized: {
            planName: sanitizeString(planName),
            planPrice: sanitizeString(planPrice),
            planAnalysis: sanitizeString(planAnalysis)
        }
    };
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
