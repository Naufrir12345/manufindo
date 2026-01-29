"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentPageProps {
    planName: string;
    planPrice: string;
    planAnalysis: string;
}

interface MidtransSnapResult {
    order_id: string;
    status_code: string;
    transaction_status: string;
    [key: string]: unknown;
}

declare global {
    interface Window {
        snap: {
            pay: (token: string, options: {
                onSuccess?: (result: MidtransSnapResult) => void;
                onPending?: (result: MidtransSnapResult) => void;
                onError?: (result: MidtransSnapResult) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

const PaymentPage = ({ planName, planPrice, planAnalysis }: PaymentPageProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [snapLoaded, setSnapLoaded] = useState(false);

    useEffect(() => {
        // Load Midtrans Snap script
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'YOUR-CLIENT-KEY-HERE');
        script.onload = () => setSnapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        if (!snapLoaded) {
            alert('Payment system is loading, please wait...');
            return;
        }

        setLoading(true);

        try {
            // Call API to create transaction and get snap token
            const response = await fetch('/api/midtrans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planName,
                    planPrice,
                    planAnalysis,
                }),
            });

            const data = await response.json();

            if (data.token) {
                // Open Midtrans Snap popup
                window.snap.pay(data.token, {
                    onSuccess: function (result: MidtransSnapResult) {
                        console.log('Payment success:', result);
                        router.push('/payment/success?order_id=' + result.order_id);
                    },
                    onPending: function (result: MidtransSnapResult) {
                        console.log('Payment pending:', result);
                        router.push('/payment/success?order_id=' + result.order_id + '&status=pending');
                    },
                    onError: function (result: MidtransSnapResult) {
                        console.log('Payment error:', result);
                        router.push('/payment/failed');
                    },
                    onClose: function () {
                        console.log('Payment popup closed');
                        setLoading(false);
                    }
                });
            } else {
                throw new Error('Failed to get payment token');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Terjadi kesalahan saat memproses pembayaran');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all mb-8 font-semibold"
                >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    Kembali
                </motion.button>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-fit"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Ringkasan Pesanan</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <span className="text-slate-600">Paket</span>
                                <span className="font-bold text-slate-900">{planName}</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <span className="text-slate-600">Kuota Analisis</span>
                                <span className="font-bold text-slate-900">{planAnalysis} CV</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <span className="text-slate-600">Durasi</span>
                                <span className="font-bold text-slate-900">1 Bulan</span>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-black text-blue-600">
                                    Rp {planPrice}
                                </span>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
                            <ShieldCheck className="text-blue-600 mt-0.5 shrink-0" size={20} />
                            <div>
                                <p className="text-sm font-bold text-blue-900 mb-1">Pembayaran Aman</p>
                                <p className="text-xs text-blue-700">
                                    Transaksi Anda dilindungi dengan enkripsi SSL dan sistem keamanan Midtrans.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Payment Method */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Metode Pembayaran</h2>

                        <div className="mb-8">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <CreditCard size={24} />
                                    <span className="font-bold">Midtrans Payment Gateway</span>
                                </div>
                                <p className="text-sm text-blue-100">
                                    Pilih metode pembayaran favorit Anda: Virtual Account, E-Wallet, Kartu Kredit/Debit, dan lainnya.
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    Virtual Account (BCA, Mandiri, BNI, BRI)
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    E-Wallet (GoPay, OVO, DANA, ShopeePay)
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    Kartu Kredit/Debit (Visa, Mastercard)
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    QRIS & Retail Outlet (Indomaret, Alfamart)
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading || !snapLoaded}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : !snapLoaded ? (
                                'Loading Payment System...'
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Bayar Sekarang
                                </>
                            )}
                        </button>

                        <div className="mt-6 flex items-start gap-2 text-xs text-slate-500">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <p>
                                Dengan melanjutkan pembayaran, Anda menyetujui{' '}
                                <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a>{' '}
                                serta{' '}
                                <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
