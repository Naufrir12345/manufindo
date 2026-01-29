"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function OrbitLiveDashboard() {
    // State untuk data sensor
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [metrics, setMetrics] = useState({
        voltage: 224.5,
        current: 12.82,
        freq: 50.02,
        power: 2.87,
        temp: 62.3,
        pf: 0.98
    });

    // State untuk data grafik (array of 40 numbers)
    const [chartData, setChartData] = useState(
        Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20)
    );

    // const handleSendAccess = (e: React.FormEvent) => { ... } removed as requested by lint

    const handleSendRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        const templateParams = {
            user_email: emailInput,
            message: "Request Access for Orbit Sandbox",
            node_id: "MANU-PRD-0912-JKT"
        };

        try {
            // Catatan: Ganti ID di bawah ini dengan ID dari dashboard EmailJS Anda
            await emailjs.send(
                'service_ojd130n',
                'template_yprg3y8',
                templateParams,
                'Y0xcNiibdwbBIapJu'
            );

            setIsSuccess(true);

            // Tutup modal otomatis setelah 2 detik sukses
            setTimeout(() => {
                setIsModalOpen(false);
                setIsSuccess(false);
                setEmailInput("");
            }, 2000);

        } catch (error) {
            console.error("Gagal mengirim:", error);
            alert("Terjadi kesalahan teknis. Silakan coba lagi.");
        } finally {
            setIsSending(false);
        }
    };

    // Efek simulasi Real-time
    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Update angka-angka sensor secara acak tipis
            setMetrics(prev => ({
                voltage: +(prev.voltage + (Math.random() * 0.4 - 0.2)).toFixed(1),
                current: +(prev.current + (Math.random() * 0.2 - 0.1)).toFixed(2),
                freq: +(prev.freq + (Math.random() * 0.02 - 0.01)).toFixed(2),
                power: +(prev.power + (Math.random() * 0.1 - 0.05)).toFixed(2),
                temp: +(prev.temp + (Math.random() * 0.6 - 0.3)).toFixed(1),
                pf: +(0.97 + Math.random() * 0.02).toFixed(2)
            }));

            // 2. Update grafik (geser data ke kiri dan masukkan data baru di kanan)
            setChartData(prev => {
                const newData = [...prev.slice(1)];
                newData.push(Math.floor(Math.random() * 65) + 25);
                return newData;
            });
        }, 1500); // Update setiap 1.5 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-6 bg-slate-900/90 h-full overflow-hidden font-sans border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] rounded-[2rem]">
            <div className="flex justify-center mb-6">
                <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.15em]">
                        Mode Simulasi: Berdasarkan Data Real-time Sensor PZEM & Suhu
                    </p>
                </div>
            </div>{

            /* TOP BAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 animate-pulse" />
                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-md border border-emerald-500/30 flex items-center gap-2 relative">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            LIVE STREAMING
                        </div>
                    </div>
                    <div className="h-4 w-px bg-slate-700" />
                    <div className="flex flex-col text-left">
                        <span className="text-slate-500 text-[8px] uppercase font-bold tracking-widest">Global Node</span>
                        <span className="text-white text-[10px] font-mono font-bold uppercase tracking-tighter">ID: MANU-PRD-0912-JKT</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Uptime Efficiency</p>
                        <p className="text-blue-400 font-mono text-sm font-black">99.98%</p>
                    </div>
                    <div className="bg-blue-600/20 px-3 py-2 rounded-lg border border-blue-500/30">
                        <p className="text-blue-400 font-mono text-[10px] font-black tracking-widest">ORBIT OS v2.1.b</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/* LEFT COLUMN */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Voltage', val: metrics.voltage, unit: 'V', color: 'text-white' },
                            { label: 'Current', val: metrics.current, unit: 'A', color: 'text-blue-400' },
                            { label: 'Frequency', val: metrics.freq, unit: 'Hz', color: 'text-emerald-400' },
                            { label: 'Active Power', val: metrics.power, unit: 'kW', color: 'text-amber-400' }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-800/40 p-3 rounded-2xl border border-white/5 group hover:bg-slate-800/60 transition-colors">
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider mb-1 text-left">{item.label}</p>
                                <p className={`text-xl font-black ${item.color} leading-none mb-1 text-left`}>
                                    {item.val}<span className="text-[10px] ml-1 opacity-50">{item.unit}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* REAL-TIME CHART */}
                    <div className="bg-slate-800/20 rounded-3xl border border-white/10 p-5 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h5 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Live Harmonic Analysis</h5>
                        </div>
                        <div className="h-40 flex items-end gap-[2px]">
                            {chartData.map((h, i) => (
                                <motion.div
                                    key={i}
                                    layout
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="flex-1 bg-gradient-to-t from-blue-600/40 via-blue-400 to-cyan-300 rounded-full min-w-[2px]"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: AI & LOGS */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-5 relative overflow-hidden">
                        <div className="relative z-10 text-left">
                            <h4 className="text-[10px] font-black text-white/80 uppercase mb-4">Orbit Intelligence</h4>
                            <div className="p-3 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 mb-4">
                                <p className="text-[9px] font-black text-orange-300 uppercase mb-1">Status: {metrics.temp > 63 ? 'Warning' : 'Normal'}</p>
                                <p className="text-[11px] text-white/90 font-medium">Suhu operasional {metrics.temp}°C terdeteksi {metrics.temp > 63 ? 'di atas' : 'dalam'} limit.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-3 bg-white text-blue-700 rounded-xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform hover:bg-blue-50"
                            >
                                Optimize System
                            </button>
                        </div>
                    </div>

                    {/* LOGS */}
                    <div className="bg-slate-800/40 rounded-[2rem] p-5 border border-white/5 h-44 overflow-y-auto font-mono text-left">
                        <p className="text-[9px] text-slate-500 font-bold mb-3 uppercase tracking-widest">Event logs</p>
                        <div className="space-y-2">
                            <p className="text-[9px] text-emerald-400 tracking-tighter leading-none">[11:13:02] Link Established</p>
                            <p className="text-[9px] text-blue-400 tracking-tighter leading-none">[11:13:05] AI Model Synced</p>
                            <p className="text-[9px] text-slate-400 tracking-tighter leading-none italic">[...] Background scanning</p>
                            {metrics.temp > 63 && <p className="text-[9px] text-red-500 animate-pulse font-bold tracking-tighter leading-none">[ALERT] High Temp Detected</p>}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-md w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-500 hover:text-white"
                            >
                                ✕
                            </button>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <h3 className="text-2xl font-black mb-2 text-white">Request Sandbox Access</h3>
                                <p className="text-slate-400 text-sm mb-8 font-medium">
                                    Dapatkan akses penuh ke dashboard interaktif dengan data sensor asli pabrik Anda.
                                </p>

                                <form onSubmit={handleSendRequest} className="space-y-4 text-left">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase ml-2 text-left block">Email Korporat</label>
                                        <input
                                            required
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder="nama@perusahaan.com"
                                            className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full py-4 bg-blue-600 rounded-xl font-black uppercase tracking-widest transition-all"
                                    >
                                        {isSending ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                SENDING DATA...
                                            </span>
                                        ) : isSuccess ? (
                                            <span className="text-emerald-400">✓ REQUEST SENT SUCCESSFULLY</span>
                                        ) : (
                                            "REQUEST ACCESS NOW"
                                        )}
                                    </button>
                                </form>

                                <p className="mt-6 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                                    Terintegrasi dengan Protokol MQTT & Modbus
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}