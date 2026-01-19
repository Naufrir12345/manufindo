"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Users, Clock, CheckCircle2, FileText } from 'lucide-react';
import Image from 'next/image';

interface DetailProductProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalone?: boolean;
}

const DetailProduct = ({ isOpen, onClose, isStandalone = false }: DetailProductProps) => {
  if (!isStandalone && !isOpen) return null;

  const plans = [
    { 
      name: "Basic", price: "199.000", analysis: "150 CV", popular: false,
      features: [
        { text: "Candidate ranking & score", include: true },
        { text: "Candidate report (strengths, gaps)", include: true },
        { text: "Bulk CV upload", include: true },
        { text: "Tags & notes", include: true },
        { text: "Candidate status pipeline", include: true },
        { text: "Shareable internal link", include: false },
        { text: "Audit log (basic)", include: false },
      ]
    },
    { 
      name: "Plus", price: "599.000", analysis: "600 CV", popular: false,
      features: [
        { text: "Candidate ranking & score", include: true },
        { text: "Candidate report (strengths, gaps)", include: true },
        { text: "Bulk CV upload", include: true },
        { text: "Advanced filters", include: true },
        { text: "Interactive dashboard", include: true },
        { text: "Export CSV", include: true },
        { text: "Shareable internal link", include: false },
      ]
    },
    { 
      name: "Intermediate", price: "1.499.000", analysis: "2.000 CV", popular: true,
      features: [
        { text: "All Plus features", include: true },
        { text: "Shareable internal report link", include: true },
        { text: "Audit log (basic)", include: true },
        { text: "Email templates", include: true },
        { text: "Manual email sending", include: true },
        { text: "Delivery log & retry", include: true },
        { text: "Branded sender support", include: false },
      ]
    },
    { 
      name: "Advanced", price: "3.499.000", analysis: "5.000 CV", popular: false,
      features: [
        { text: "All Intermediate features", include: true },
        { text: "Automated emails (rules-based)", include: true },
        { text: "Workflow rules (auto-tag)", include: true },
        { text: "Integrations (API/Webhook)", include: true },
        { text: "Notifications (Email/Slack)", include: true },
        { text: "Branded sender support", include: true },
        { text: "Custom SLA", include: false },
      ]
    },
    { 
      name: "Custom", price: "Kontak Kami", analysis: "Unlimited", popular: false,
      features: [
        { text: "Everything in Advanced", include: true },
        { text: "Single sign-on (SSO)", include: true },
        { text: "Dedicated database", include: true },
        { text: "Custom SLA & Compliance", include: true },
        { text: "Dedicated support manager", include: true },
        { text: "On-premise option", include: true },
        { text: "Custom development", include: true },
      ]
    },
  ];

  const stats = [
    { icon: Users, value: "94", label: "CV Dianalisis", color: "text-blue-600" },
    { icon: Clock, value: "5", label: "Menit Screening", color: "text-green-600" },
    { icon: CheckCircle2, value: "Top 10", label: "Kandidat Terbaik", color: "text-emerald-600" },
    { icon: FileText, value: "PDF", label: "Summary Report", color: "text-amber-600" },
  ];

  const wrapperStyles = isStandalone ? "w-full bg-slate-50/50" : "fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4";
  const cardStyles = isStandalone ? "w-full max-w-[1500px] mx-auto p-8" : "bg-white rounded-[2rem] max-w-7xl w-full max-h-[95vh] overflow-y-auto p-10 relative shadow-2xl";

  return (
    <div className={wrapperStyles}>
      <div className={cardStyles}>
        {!isStandalone && onClose && (
          <button onClick={onClose} className="absolute top-6 right-8 text-gray-400 hover:text-gray-800 text-3xl z-50">&times;</button>
        )}

        {/* BAGIAN BADGE DI TENGAH ATAS - VERSI FIX ANIMASI */}
        <div className="w-full flex justify-center mb-10 mt-4">
        <div className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full shadow-sm">
            
            {/* Animasi Garis Melingkar Menggunakan Framer Motion (Lebih Stabil) */}
            <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#22c55e_360deg)]"
            />
            
            {/* Isi Badge (Z-index 10 agar berada di atas animasi) */}
            <div className="relative z-10 px-6 py-2 bg-white rounded-full">
            <span className="text-emerald-600 text-sm font-bold italic tracking-wide flex items-center gap-2">
                <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                >
                ✨
                </motion.span>
                Optimalkan Rekrutmen Anda Dalam Hitungan Menit
            </span>
            </div>
        </div>
        </div>

        {/* SECTION 1: PREVIEW GAMBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span> Detail Candidate Report
            </h4>
            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-inner bg-white">
               <Image src="/sampleCV1.jpeg" alt="Candidate Report" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-500 rounded-full"></span> AI Ranking & Analysis
            </h4>
            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-inner bg-white">
               <Image src="/sampleCV2.jpeg" alt="Ranking Analysis" fill className="object-contain" />
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: STATS GRID */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center gap-2">
                  <div className="p-3 bg-slate-50 rounded-2xl mb-2">
                    <IconComponent size={24} className={stat.color} />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: BUTTON COBA GRATIS */}
        <div className="text-center mb-24 flex flex-col items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-blue-400/40 transition-all uppercase tracking-widest"
          >
            Coba Gratis Sekarang
          </motion.button>
        </div>

        <hr className="border-slate-100 mb-20" />

        {/* SECTION 4: PRICING SECTION */}
        <div className="mt-20 mb-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 uppercase">
                Bagaimana Manufindo Menghemat Waktu?
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto italic">
                Pilih paket yang paling sesuai dengan volume rekrutmen perusahaan Anda
                </p>
            </div>

            {/* PRICING GRID DENGAN CONTROLLABLE OVERFLOW */}
            <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
                {/* Menggunakan min-w agar di layar kecil user bisa scroll horizontal, tapi tetap rapi di layar besar */}
                <div className="flex lg:grid lg:grid-cols-5 gap-6 min-w-[1200px] lg:min-w-full py-4 px-2">
                {plans.map((plan, index) => (
                    <div key={index} className="relative flex-1 min-h-full">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className={`flex flex-col h-full p-6 rounded-3xl border-2 transition-all duration-300 relative shadow-sm 
                        ${plan.popular ? 'border-blue-600 shadow-xl bg-white z-10 scale-[1.02]' : 'border-slate-100 bg-white hover:border-blue-300'}`}
                    >
                        {plan.popular && (
                        <div className="absolute -top-4 left-0 right-0 flex justify-center z-40">
                            <div className="bg-blue-600 text-white px-4 py-1 rounded-full border-2 border-white shadow-md text-[10px] font-black uppercase tracking-widest">
                            Most Popular
                            </div>
                        </div>
                        )}

                        {/* Header Paket */}
                        <div className="text-center pt-2">
                        <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                        <div className="my-6">
                            <div className="text-2xl font-black text-slate-900">
                            {plan.price === 'Kontak Kami' ? plan.price : `Rp ${plan.price}`}
                            </div>
                            {plan.price !== 'Kontak Kami' && (
                            <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">Per Bulan</div>
                            )}
                        </div>
                        <div className={`py-2 px-4 rounded-full mb-8 inline-block ${plan.popular ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}>
                            <p className="text-[11px] font-bold uppercase">{plan.analysis} Analysis</p>
                        </div>
                        </div>

                        {/* List Fitur - Flex Grow agar tombol tetap di bawah */}
                        <div className="space-y-4 mb-8 flex-grow">
                        {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                            {feature.include ? (
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            ) : (
                                <X className="w-4 h-4 text-rose-300 mt-0.5 shrink-0" />
                            )}
                            <span className={`text-[12px] leading-snug ${feature.include ? 'text-slate-600' : 'text-slate-300'}`}>
                                {feature.text}
                            </span>
                            </div>
                        ))}
                        </div>

                        {/* Tombol Aksi */}
                        <button className={`w-full py-3 rounded-2xl text-sm font-bold transition-all mt-auto 
                        ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                        {plan.price === 'Kontak Kami' ? 'Hubungi Sales' : 'Pilih Paket'}
                        </button>
                    </motion.div>
                    </div>
                ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DetailProduct;