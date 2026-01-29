"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentPage from '../components/PaymentPage';
import Navbar from '../components/Navbar';

function PaymentContent() {
    const searchParams = useSearchParams();

    const planName = searchParams.get('plan') || 'Basic';
    const planPrice = searchParams.get('price') || '199.000';
    const planAnalysis = searchParams.get('analysis') || '150';

    return (
        <>
            <Navbar />
            <PaymentPage
                planName={planName}
                planPrice={planPrice}
                planAnalysis={planAnalysis}
            />
        </>
    );
}

export default function Payment() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
