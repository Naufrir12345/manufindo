"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, FileText } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const orderId = searchParams.get('order_id') || 'N/A';
    const status = searchParams.get('status') || 'success';

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
                >
                    <CheckCircle2 size={48} className="text-white" />
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl font-black text-slate-900 mb-4">
                    {status === 'pending' ? 'Pembayaran Pending' : 'Pembayaran Berhasil!'}
                </h1>

                {/* Description */}
                <p className="text-lg text-slate-600 mb-8">
                    {status === 'pending'
                        ? 'Pembayaran Anda sedang diproses. Kami akan mengirimkan konfirmasi melalui email setelah pembayaran dikonfirmasi.'
                        : 'Terima kasih! Pembayaran Anda telah berhasil diproses. Kami akan mengirimkan detail akses ke email Anda dalam beberapa menit.'
                    }
                </p>

                {/* Order Details */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="text-blue-600" size={24} />
                        <h3 className="text-lg font-bold text-slate-900">Detail Pesanan</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Order ID</span>
                            <span className="font-mono font-bold text-slate-900 text-sm">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                {status === 'pending' ? 'Pending' : 'Success'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Tanggal</span>
                            <span className="font-bold text-slate-900">{new Date().toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Kembali ke Beranda
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                        <FileText size={20} />
                        Cetak Invoice
                    </button>
                </div>

                {/* Additional Info */}
                <p className="text-sm text-slate-500 mt-8">
                    Butuh bantuan? Hubungi customer support kami di{' '}
                    <a href="mailto:support@manufindo.com" className="text-blue-600 hover:underline font-semibold">
                        support@manufindo.com
                    </a>
                </p>
            </motion.div>
        </div>
    );
}

export default function PaymentSuccess() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
