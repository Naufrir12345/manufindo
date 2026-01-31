import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentRequest } from '@/lib/security/validation';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/security/auth"; // Pastikan path ini sesuai struktur folder Anda

// Midtrans configuration
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_API_URL = process.env.NODE_ENV === 'production'
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

// Validate environment variables
if (!MIDTRANS_SERVER_KEY || MIDTRANS_SERVER_KEY === 'YOUR-SERVER-KEY-HERE') {
    console.warn('⚠️ Midtrans Server Key not configured.');
}

export async function POST(request: NextRequest) {
    try {
        // 1. Ambil session user (jika ada)
        const session = await getServerSession(authOptions);

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

        if (!MIDTRANS_SERVER_KEY || MIDTRANS_SERVER_KEY === 'YOUR-SERVER-KEY-HERE') {
            return NextResponse.json(
                { error: 'Payment gateway not configured.' },
                { status: 503 }
            );
        }

        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7).toUpperCase();
        const orderId = `ORDER-${timestamp}-${randomStr}`;
        const grossAmount = parseInt(planPrice.replace(/\./g, ''));

        if (isNaN(grossAmount) || grossAmount <= 0) {
            return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 });
        }

        // 2. Gunakan data dinamis dari session untuk Midtrans
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
                // Jika login, gunakan nama user. Jika tidak, gunakan "Guest Customer"
                first_name: session?.user?.name || "Guest",
                last_name: !session?.user?.name ? "Customer" : "",
                email: session?.user?.email || "customer@orbit-guest.com",
                phone: "" // Bisa dikosongkan jika tidak ada di session
            },
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success`
            }
        };

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
            return NextResponse.json({
                token: data.token,
                redirect_url: data.redirect_url,
                order_id: orderId,
                status: session ? "MEMBER_TRANSACTION" : "GUEST_TRANSACTION"
            });
        } else {
            throw new Error(data.error_messages?.[0] || 'Failed to create transaction');
        }

    } catch (error: unknown) {
        const err = error as Error;
        console.error('Payment API Error:', err.message);

        return NextResponse.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}