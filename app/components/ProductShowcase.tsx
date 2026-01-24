"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ChevronRight, Zap, Activity, ShieldCheck, Fingerprint, Cpu } from 'lucide-react';
import CustomSensorModal from './CustomSensorModal';

export default function ProductShowcase() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 space-y-24">

                    {/* Product 1: Biotrix */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="relative flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 min-h-[400px] md:min-h-[500px] overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-110 group-hover:scale-150 transition-transform duration-700"></div>
                            <Image
                                src="/Biotrix.png"
                                alt="Biotrix Smart Fingerprint Access"
                                width={800}
                                height={800}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                                className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                            />
                            {/* Floating Badges */}
                            <div className="absolute top-6 left-6 md:top-10 md:left-8 z-20 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2 md:gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    <Activity size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-[7px] md:text-[9px] text-slate-400 font-bold uppercase tracking-tight">Status</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-900">Real-time Active</p>
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-8 z-20 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2 md:gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <ShieldCheck size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-[7px] md:text-[9px] text-slate-400 font-bold uppercase tracking-tight">Security</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-900">Industrial Grade</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                                    <Zap size={14} fill="currentColor" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">New Release 2024</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                    Biotrix Smart Fingerprint Access<br />
                                    <span className="text-blue-600">Series BX-125</span>
                                </h2>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={16} className="text-amber-400" fill="currentColor" />
                                        ))}
                                        <span className="ml-2 font-bold text-slate-900">4.9/5</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-slate-200"></div>
                                    <p className="text-sm text-slate-500">Diterapkan di 100+ Lini Produksi</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Konektivitas</p>
                                    <p className="text-sm font-semibold text-slate-800">Wi-Fi, LoRa, LTE</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Durabilitas</p>
                                    <p className="text-sm font-semibold text-slate-800">IP65 Waterproof</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 space-y-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Harga Mulai Dari</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900">Rp 850.000</span>
                                        <span className="text-slate-400 text-sm">/ Unit</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
                                        <ShoppingCart size={20} />
                                        Beli Sekarang
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex-1 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <Fingerprint size={20} />
                                        Custom Fingerprint?
                                    </button>
                                </div>
                                <p className="text-[10px] text-center text-slate-400">
                                    *Tersedia diskon untuk pengadaan batch industri di atas 10 unit.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product 2: RoomPulse */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Product Info - Kiri */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                                    <Zap size={14} fill="currentColor" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">New Release 2024</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                    RoomPulse Monitoring System <br />
                                    <span className="text-blue-600">Series RMS-010</span>
                                </h2>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={16} className="text-amber-400" fill="currentColor" />
                                        ))}
                                        <span className="ml-2 font-bold text-slate-900">4.9/5</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-slate-200"></div>
                                    <p className="text-sm text-slate-500">Diterapkan di 100+ Lini Produksi</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Konektivitas</p>
                                    <p className="text-sm font-semibold text-slate-800">Wi-Fi, LoRa, LTE</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Durabilitas</p>
                                    <p className="text-sm font-semibold text-slate-800">IP65 Waterproof</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 space-y-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Harga Mulai Dari</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900">Rp 2.500.000</span>
                                        <span className="text-slate-400 text-sm">/ Unit</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
                                        <ShoppingCart size={20} />
                                        Beli Sekarang
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex-1 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <Cpu size={20} />
                                        Custom Sensor?
                                    </button>
                                </div>
                                <p className="text-[10px] text-center text-slate-400">
                                    *Tersedia diskon untuk pengadaan batch industri di atas 10 unit.
                                </p>
                            </div>
                        </div>

                        {/* Image - Kanan */}
                        <div className="relative flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 min-h-[400px] md:min-h-[500px] overflow-hidden group order-first lg:order-last">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-110 group-hover:scale-150 transition-transform duration-700"></div>
                            <Image
                                src="/RoomPulse.png"
                                alt="RoomPulse Monitoring System"
                                width={800}
                                height={800}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                                className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                            />
                            <div className="absolute top-6 left-6 md:top-10 md:left-8 z-20 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2 md:gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    <Activity size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-[7px] md:text-[9px] text-slate-400 font-bold uppercase tracking-tight">Status</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-900">Real-time Active</p>
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-8 z-20 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2 md:gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <ShieldCheck size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <div>
                                    <p className="text-[7px] md:text-[9px] text-slate-400 font-bold uppercase tracking-tight">Security</p>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-900">Industrial Grade</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <CustomSensorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
