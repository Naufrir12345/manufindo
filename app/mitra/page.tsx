"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, User, Send, CheckCircle2, Briefcase, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function JoinMitra() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);

        try {
            // FLOW 1: Kirim ke Email via EmailJS
            await emailjs.sendForm(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                formRef.current!,
                'YOUR_PUBLIC_KEY'
            );

            // FLOW 2: (Opsional) Simpan ke DB
            // Anda bisa menambahkan fetch ke API route internal Anda di sini jika sudah ada DB
            // await fetch('/api/mitra', { method: 'POST', body: JSON.stringify(data) });

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan teknis. Silakan hubungi admin via WhatsApp.");
        } finally {
            setIsSending(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-10 bg-white rounded-[2.5rem] shadow-2xl max-w-md border border-slate-100"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Application Received!</h2>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Terima kasih telah tertarik bermitra dengan Manufindo. Tim Strategic Partner kami akan menghubungi Anda melalui email dalam 24 jam ke depan.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all"
                    >
                        Kembali ke Beranda
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]"
                    >
                        Partnership Program
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mt-2 mb-4"
                    >
                        Grow Your Industry <span className="text-blue-600 flex md:inline italic">With Us.</span>
                    </motion.h1>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col lg:flex-row">
                    {/* Sidebar Info */}
                    <div className="bg-slate-900 p-10 lg:p-14 text-white lg:w-2/5 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8">Official Partnership</h3>
                            <div className="space-y-8">
                                {[
                                    { t: "Solution Integration", d: "Akses penuh ke API Orbit Platform untuk sistem pabrik Anda." },
                                    { t: "Technical Support", d: "Pendampingan engineer langsung di lokasi jika diperlukan." },
                                    { t: "Revenue Growth", d: "Skema bagi hasil dan lisensi yang kompetitif untuk reseller." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white">{item.t}</h4>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                            <p className="text-[10px] text-slate-500 font-mono italic">Inquiry: manufindociptanusantara@gmail.com</p>
                        </div>
                    </div>

                    {/* Form Utama */}
                    <form ref={formRef} onSubmit={handleSubmit} className="p-8 lg:p-14 lg:w-3/5 space-y-5 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <input required name="from_name" type="text" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="E.g. Kurniawan Naufrir" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Perusahaan</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <input required name="company_name" type="text" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="PT. Nama Perusahaan" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Bisnis</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <input required name="reply_to" type="email" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="nama@perusahaan.com" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nomor WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <input required name="phone_number" type="tel" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="0812..." />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bidang Industri</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <select name="industry" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium appearance-none">
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Logistics">Logistics & Supply Chain</option>
                                        <option value="IoT Integrator">System Integrator / IT</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lokasi Proyek</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-3.5 text-slate-400" size={16} />
                                    <input name="location" type="text" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="Kota, Provinsi" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Detail Kebutuhan</label>
                            <textarea name="message" rows={3} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium" placeholder="Apa yang bisa Orbit bantu untuk efisiensi bisnis Anda?"></textarea>
                        </div>

                        <button
                            disabled={isSending}
                            type="submit"
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 ${isSending ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-slate-900 shadow-lg shadow-blue-500/20'}`}
                        >
                            {isSending ? "Processing Application..." : <><Send size={14} /> Submit Partnership Request</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}