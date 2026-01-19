"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Globe } from 'lucide-react';

const AboutUs = () => {
  return (
    <main className="bg-white text-slate-900 overflow-hidden">
      {/* SECTION 1: HERO - The "Digital Orbit" Core */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">Our Journey</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Navigating the <span className="text-blue-600">Digital Orbit.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
            Manufindo Cipta Nusantara hadir sebagai kompas bagi industri di Indonesia 
            untuk bertransformasi menuju efisiensi mutlak melalui ekosistem IoT yang cerdas.
          </p>
        </div>

        {/* Visual Orbit Background - Elemen Estetik */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
          <div className="absolute inset-0 border border-slate-200 rounded-full animate-[spin_20s_linear_infinity]"></div>
          <div className="absolute inset-20 border border-slate-100 rounded-full animate-[spin_15s_linear_infinity_reverse]"></div>
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
        </div>
      </section>

      {/* SECTION 2: VISION & MISSION (Apple Style Cards) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
            <Target className="text-blue-600 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Visi Kami</h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              Menjadi orbit utama dalam ekosistem teknologi industri, di mana setiap data 
              menjadi tenaga penggerak pertumbuhan ekonomi nasional.
            </p>
          </div>
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
            <Users className="text-blue-600 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Misi Kami</h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              Memberdayakan manufaktur lokal dengan solusi hardware dan software yang 
              Scalable, Secure, dan Sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE VALUES (Elegant Grid) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl font-bold max-w-md">Value yang mengorbit di setiap lini bisnis kami.</h2>
            <div className="h-[1px] flex-1 bg-slate-100 mx-12 hidden md:block mb-5"></div>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-4">Core Principles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Inovasi Tanpa Batas", desc: "Terus mengeksplorasi teknologi terbaru untuk solusi masa depan.", icon: Globe },
              { title: "Keamanan Industri", desc: "Standar keamanan data tingkat tinggi di setiap perangkat.", icon: ShieldCheck },
              { title: "Dampak Nyata", desc: "Fokus pada hasil ROI (Return on Investment) bagi klien.", icon: Target },
            ].map((value, index) => (
              <div key={index} className="space-y-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                  <value.icon size={24} />
                </div>
                <h4 className="text-xl font-bold">{value.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;