import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentRequest } from '@/lib/security/validation';

// Midtrans configuration
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_API_URL = process.env.NODE_ENV === 'production'
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

// Validate environment variables
if (!MIDTRANS_SERVER_KEY || MIDTRANS_SERVER_KEY === 'YOUR-SERVER-KEY-HERE') {
    console.warn('⚠️ Midtrans Server Key not configured. Payment API will not work.');
}

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();
        const validation = validatePaymentRequest(body);

        if (!validation.valid || !validation.sanitized) {
            console.error('Invalid payment request:', validation.error);
            return NextResponse.json(
                { error: validation.error || 'Invalid request data' },
                { status: 400 }
            );
        }

        const { planName, planPrice, planAnalysis } = validation.sanitized;

        // Check if Midtrans is configured
        if (!MIDTRANS_SERVER_KEY || MIDTRANS_SERVER_KEY === 'YOUR-SERVER-KEY-HERE') {
            return NextResponse.json(
                { error: 'Payment gateway not configured. Please contact support.' },
                { status: 503 }
            );
        }

        // Generate unique order ID with timestamp
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7).toUpperCase();
        const orderId = `ORDER-${timestamp}-${randomStr}`;

        // Remove dots and convert to number
        const grossAmount = parseInt(planPrice.replace(/\./g, ''));

        // Validate amount
        if (isNaN(grossAmount) || grossAmount <= 0) {
            return NextResponse.json(
                { error: 'Invalid payment amount' },
                { status: 400 }
            );
        }

        // Midtrans transaction parameters
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            credit_card: {
                secure: true
            },
            item_details: [
                {
                    id: planName.toLowerCase().replace(/\s+/g, '-'),
                    price: grossAmount,
                    quantity: 1,
                    name: `Paket ${planName} - ${planAnalysis} Analysis`,
                }
            ],
            customer_details: {
                first_name: "Customer",
                email: "customer@example.com",
                phone: "081234567890"
            },
            // Add callback URLs
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success`
            }
        };

        // Log transaction attempt (without sensitive data)
        console.log('Creating Midtrans transaction:', {
            orderId,
            amount: grossAmount,
            plan: planName,
            timestamp: new Date().toISOString()
        });

        // Create Snap transaction
        const authString = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');

        const response = await fetch(MIDTRANS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify(parameter)
        });

        const data = await response.json();

        if (data.token) {
            // Log successful token generation
            console.log('Midtrans token generated successfully:', {
                orderId,
                timestamp: new Date().toISOString()
            });

            return NextResponse.json({
                token: data.token,
                redirect_url: data.redirect_url,
                order_id: orderId
            });
        } else {
            // Log error
            console.error('Midtrans API error:', {
                statusCode: response.status,
                error: data.error_messages,
                timestamp: new Date().toISOString()
            });

            throw new Error(data.error_messages?.[0] || 'Failed to create transaction');
        }

    } catch (error: unknown) {
        const err = error as Error;
        // Log error with details
        console.error('Payment API Error:', {
            message: err.message,
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(
            {
                error: err.message || 'Internal server error',
                message: 'Payment processing failed. Please try again.'
            },
            { status: 500 }
        );
    }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
