"use client";
import React from 'react';
import { Activity, ClipboardList, Zap, HardHat } from 'lucide-react';

export default function ProblemsSection() {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100">
                        <span className="text-red-600 text-xs font-bold tracking-widest uppercase">Analisis Loss Profit</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Data Ada, <span className="text-red-600 italic">Tapi Profit Tetap Bocor?</span></h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Manufaktur modern menghadapi tantangan kompleks yang menghambat skalabilitas. Kami hadir dengan solusi cerdas.</p>
                </div>

                {/* Grid Masalah */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Activity size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Kebocoran Profit Akibat Downtime</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Mesin mati tiba-tiba menyebabkan kerugian jutaan rupiah per jam karena downtime yang tidak terencana.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <ClipboardList size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Data Tersebar & Manual?</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Laporan produksi masih menggunakan kertas atau Excel yang rawan human error dan lambat dianalisis.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Kurang Optimal & Boros?</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Tanpa pemantauan real-time, efisiensi mesin menurun, konsumsi energi meningkat, dan biaya operasional membengkak.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Stok Bahan Baku Berantakan</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Produksi terhenti karena bahan baku habis mendadak atau stok menumpuk terlalu lama.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <HardHat size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Keamanan Kerja Berisiko Tinggi</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Sulit memantau kepatuhan APD dan zona bahaya di area pabrik yang luas.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <HardHat size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Kualitas Produk Tidak Konsisten</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Cacat produk baru ketahuan setelah barang sampai di gudang (QC lambat).</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Kerusakan Datang Tanpa Peringatan</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Operasional sering terganggu karena kerusakan alat yang tidak terprediksi sebelumnya.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Keputusan Optimasi Berdasarkan Asumsi</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Tanpa data real-time dan analisis berbasis IoT, keputusan operasional sering dibuat berdasarkan perkiraan dan pengalaman semata.</p>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3">Tidak Ada prediksi Umur Pakai Alat</h4>
                        <p className="text-slate-500 leading-relaxed text-sm">Tanpa prediksi umur pakai alat yang akurat, penggantian menjadi tidak tepat waktu, biaya aset membengkak, dan risiko kerusakan fatal meningkat.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
