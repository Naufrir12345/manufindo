"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, Home, ArrowLeft } from 'lucide-react';

export default function PaymentFailed() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
                >
                    <XCircle size={48} className="text-white" />
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl font-black text-slate-900 mb-4">
                    Pembayaran Gagal
                </h1>

                {/* Description */}
                <p className="text-lg text-slate-600 mb-8">
                    Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi atau gunakan metode pembayaran lain.
                </p>

                {/* Common Issues */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Kemungkinan Penyebab:</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Saldo atau limit kartu tidak mencukupi</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Informasi pembayaran tidak valid</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Koneksi internet terputus selama transaksi</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Transaksi dibatalkan</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Coba Lagi
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="flex-1 border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Kembali ke Beranda
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
