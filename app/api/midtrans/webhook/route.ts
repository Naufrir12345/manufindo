import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Midtrans Server Key from environment variables
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Extract required fields for signature verification and handling
        const {
            order_id,
            status_code,
            gross_amount,
            signature_key,
            transaction_status,
            fraud_status,
            payment_type
        } = body;

        // 1. Verify Midtrans Signature
        // Formula: SHA512(order_id + status_code + gross_amount + server_key)
        const payload = order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY;
        const calculatedHash = crypto.createHash('sha512').update(payload).digest('hex');

        if (calculatedHash !== signature_key) {
            console.error('⚠️ [SECURITY] Invalid Webhook Signature detected:', {
                orderId: order_id,
                timestamp: new Date().toISOString()
            });
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 403 }
            );
        }

        // 2. Log Webhook Notification
        console.log(`✅ [PAYMENT] Webhook received for ${order_id}:`, {
            status: transaction_status,
            fraud: fraud_status,
            type: payment_type,
            amount: gross_amount,
            timestamp: new Date().toISOString()
        });

        // 3. Handle Transaction Status Updates
        // Note: Production implementation should update its database here.

        let finalStatus = 'pending';

        if (transaction_status === 'capture') {
            if (fraud_status === 'challenge') {
                finalStatus = 'challenge';
            } else if (fraud_status === 'accept') {
                finalStatus = 'success';
            }
        } else if (transaction_status === 'settlement') {
            finalStatus = 'success';
        } else if (transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire') {
            finalStatus = 'failed';
        } else if (transaction_status === 'pending') {
            finalStatus = 'pending';
        }

        // 4. Return success to Midtrans to stop retries
        return NextResponse.json(
            {
                status: 'OK',
                message: `Transaction ${order_id} handled as ${finalStatus}`
            },
            { status: 200 }
        );

    } catch (error) {
        const err = error as Error;
        console.error('❌ [WEBHOOK ERROR]:', {
            message: err.message,
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * Handle OPTIONS request for CORS if needed
 */
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
