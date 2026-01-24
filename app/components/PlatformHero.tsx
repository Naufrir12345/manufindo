"use client";
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import OrbitLiveDashboard from './OrbitLiveDashboard';

export default function PlatformHero() {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                {/* Badge Branding */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8"
                >
                    <Cpu size={14} className="animate-pulse" /> The Core AI Brain
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
                >
                    Satu Dashboard.<br />Kendali <span className="italic text-blue-500">Mutlak.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 font-medium"
                >
                    Orbit Platform mengubah jutaan data mentah dari sensor menjadi keputusan bisnis yang presisi melalui algoritma Machine Learning.
                </motion.p>

                {/* Dashboard Display Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative mx-auto max-w-6xl group"
                >
                    {/* Efek Glow di belakang dashboard */}
                    <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000" />

                    {/* Memanggil Dashboard Real-time */}
                    <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                        <OrbitLiveDashboard />
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[120px] -z-10" />
        </section>
    );
}