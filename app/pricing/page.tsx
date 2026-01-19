"use client";
import React from 'react';
import DetailProduct from '../components/DetailProduct';
import { ArrowLeft, Zap, Target, BarChart3, Layers, Clock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Komponen Card Fitur berdasarkan screenshot
const FeatureCard = ({ icon: Icon, title, desc, tag, color }: any) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden group">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>
      <Icon size={24} />
    </div>
    <div className="absolute top-4 right-4 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-lg">
      {tag}
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function PricingPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50/50 pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Tombol Back */}
        <motion.button 
          variants={itemVariants}
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all mb-16 font-semibold"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowLeft size={18} />
          </div>
          Kembali ke Beranda
        </motion.button>

        {/* HEADER SECTION (Sesuai Screenshot) */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Bagaimana Manufindo Menghemat Waktu & Biaya Anda?
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Ubah cara Anda melakukan manajemen industri dengan teknologi AI terdepan.
          </p>
        </motion.div>

        {/* GRID FITUR (Sesuai Screenshot) */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          <FeatureCard 
            icon={Zap} 
            title="Analisis 100x Lebih Cepat" 
            desc="Scan ratusan data dalam hitungan menit, bukan jam. Teknologi AI kami ekstraksi data penting otomatis."
            tag="10 detik/data"
            color="bg-blue-500"
          />
          <FeatureCard 
            icon={Target} 
            title="Temukan Perfect Match Otomatis" 
            desc="Filter berdasarkan kriteria custom dengan akurasi hingga 95% untuk kebutuhan industri Anda."
            tag="95% akurasi"
            color="bg-emerald-500"
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Ranking Objektif & Transparan" 
            desc="Scoring 0-100 berdasarkan performa dengan breakdown detail. Eliminasi bias subjektif."
            tag="0-100 score"
            color="bg-indigo-500"
          />
          <FeatureCard 
            icon={Layers} 
            title="Batch Process Skala Besar" 
            desc="Upload ribuan file sekaligus. Proses ratusan data secara paralel dalam waktu singkat."
            tag="1000 data/batch"
            color="bg-sky-500"
          />
          <FeatureCard 
            icon={Clock} 
            title="Hasil Instant dengan Analisis" 
            desc="Dapatkan summary detail per kategori. Identifikasi kebutuhan perbaikan secara real-time."
            tag="Real-time"
            color="bg-cyan-500"
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Data Aman dengan Compliance" 
            desc="Keamanan data terjamin dengan enkripsi end-to-end dan standar keamanan internasional."
            tag="ISO Certified"
            color="bg-blue-600"
          />
        </motion.div>

        {/* TABEL HARGA */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <DetailProduct isStandalone={true} />
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}