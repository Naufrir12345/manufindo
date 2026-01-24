"use client";
import { motion } from 'framer-motion';
import { BarChart3, Globe2, Zap } from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: "Predictive Analytics",
        desc: "AI Orbit mempelajari pola penggunaan alat dan memprediksi anomali sebelum terjadi downtime."
    },
    {
        icon: Globe2,
        title: "Multi-Region Sync",
        desc: "Kelola ribuan sensor di berbagai lokasi geografis dalam satu sinkronisasi cloud terpusat."
    },
    {
        icon: Zap,
        title: "Actionable Reports",
        desc: "Otomasi laporan efisiensi (OEE) yang dikirim langsung ke tim manajemen setiap pagi."
    }
];

export default function PlatformFeatures() {
    return (
        <section className="py-24 px-6 bg-[#05070A]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 mb-6">
                                <f.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}