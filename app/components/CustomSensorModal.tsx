"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface CustomSensorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CustomSensorModal({ isOpen, onClose }: CustomSensorModalProps) {
    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();

        const nama = (document.getElementById('nama_user') as HTMLInputElement)?.value;
        const email = (document.getElementById('email_user') as HTMLInputElement)?.value;
        const rencana = (document.getElementById('rencana_dev') as HTMLTextAreaElement)?.value;

        if (!nama || !email || !rencana) {
            alert("Harap isi semua kolom konsultasi.");
            return;
        }

        const subject = encodeURIComponent(`Konsultasi Custom Sensor - ${nama}`);
        const body = encodeURIComponent(
            `Halo Manufindo,\\n\\nSaya ingin konsultasi mengenai:\\n${rencana}\\n\\nDetail Kontak:\\nNama: ${nama}\\nEmail: ${email}`
        );

        window.location.href = `mailto:manufindociptanusantara@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white rounded-[2.5rem] shadow-2xl z-[1000] overflow-hidden border border-slate-100"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Custom IoT Solution</h3>
                                    <p className="text-sm text-slate-500">Diskusikan kebutuhan spesifik hardware Anda.</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nama Lengkap</label>
                                        <input id="nama_user" type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Perusahaan</label>
                                        <input id="email_user" type="email" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="name@company.com" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Rencana Pengembangan</label>
                                    <textarea id="rencana_dev" rows={4} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jelaskan sensor atau sistem yang ingin Anda kembangkan..."></textarea>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleEmailClick}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    Kirim Konsultasi Gratis
                                    <ChevronRight size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
