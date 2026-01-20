"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Globe, ArrowRight, Lightbulb, Zap } from 'lucide-react';
import SuccessStories from './successstories';

const AboutUs = () => {
  return (
    <main className="bg-white text-slate-900 overflow-hidden pt-10">
      {/* SECTION 1: HERO - Digital Orbit with Storytelling */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8"
          >
            <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase">The Genesis</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Navigating the <br />
            <span className="text-blue-600 italic">Digital Orbit.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Manufindo Cipta Nusantara lahir dari sebuah misi sederhana: Membantu industri Indonesia berbicara dalam bahasa data.
          </p>
        </div>

        {/* Orbit Background Enhancements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none opacity-30">
          <div className="absolute inset-0 border border-dashed border-slate-200 rounded-full animate-[spin_40s_linear_infinity]"></div>
          <div className="absolute inset-40 border border-slate-100 rounded-full animate-[spin_25s_linear_infinity_reverse]"></div>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY (Surplus Inspired) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Dekorasi Cahaya */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
                Mengubah <span className="text-blue-400">Tantangan</span> <br /> 
                Menjadi <span className="text-emerald-400">Peluang.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  Di era industri 4.0, banyak bisnis tertahan oleh data yang tidak terorganisir dan proses manual yang melelahkan. Kami melihat ini bukan sebagai hambatan, melainkan titik awal revolusi.
                </p>
                <p>
                  Melalui ekosistem IoT Manufindo, kami mendigitalkan insting menjadi presisi, dan mengubah ketidakpastian menjadi efisiensi yang terukur.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] mt-12">
                  <Lightbulb className="text-yellow-400 mb-4" size={32} />
                  <h4 className="font-bold text-xl mb-2">Inovasi</h4>
                  <p className="text-xs text-slate-400">Solusi cerdas untuk masalah kompleks.</p>
               </div>
               <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem]">
                  <Zap className="text-blue-400 mb-4" size={32} />
                  <h4 className="font-bold text-xl mb-2">Akselerasi</h4>
                  <p className="text-xs text-slate-400">Mempercepat pertumbuhan bisnis Anda.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MEET THE FOUNDER (Orbit Style) */}
      {/* SECTION: MEET THE FOUNDER (Orbit Style - Revised) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Kolom Foto dengan Elemen Orbit Lingkaran */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center h-[500px]">
              
              {/* Orbit Luar (Dashed) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[350px] h-[350px] md:w-[480px] md:h-[480px] border border-blue-200 border-dashed rounded-full"
              />

              {/* Orbit Dalam dengan Icon Berjalan */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-slate-100 rounded-full"
              >
                {/* Icon yang menempel di garis orbit dan ikut berputar */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg rotate-12">
                  <Zap size={16} />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Globe size={16} />
                </div>
              </motion.div>

              {/* Foto CEO Berbentuk Lingkaran */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full p-[2px] bg-gradient-to-b from-blue-400/20 to-transparent">
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]">
                  <Image 
                    src="/adhi.png" 
                    alt="CEO Manufindo"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Label Glassmorphism */}
                <motion.div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white px-8 py-2.5 rounded-full whitespace-nowrap shadow-2xl border border-white/10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Founder & CEO</p>
                </motion.div>
              </div>
            </div>

            {/* Kolom Narasi Latar Belakang */}
            <div className="w-full lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  Founder & CEO
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                  Leading the Revolution <br /> From the <span className="text-blue-600">Core.</span>
                </h2>
                <div className="space-y-4 text-slate-500 text-lg leading-relaxed font-medium">
                  <p>
                    Berawal dari keresahan melihat kesenjangan teknologi di lantai produksi, saya mendirikan Manufindo untuk memastikan setiap industri di Indonesia memiliki akses ke data yang akurat dan sistem yang cerdas.
                  </p>
                  <p>
                    Visi saya sederhana: Menjadikan teknologi bukan sebagai beban, melainkan sebagai orbit yang menggerakkan seluruh ekosistem bisnis Anda menuju efisiensi maksimal.
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-10">
                  <p className="font-black text-2xl text-slate-900">Adhi - CEO Manufindo</p>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] mt-1">Driving Industrial Innovation</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: VISION & MISSION (Apple Minimalist) */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100 transition-all"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl shadow-blue-200">
                <Target size={32} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tighter">Visi Kami</h3>
              <p className="text-slate-500 leading-relaxed text-xl font-medium">
                Menjadi infrastruktur digital utama yang menghubungkan setiap elemen industri di Indonesia ke dalam satu jaringan yang cerdas dan berkelanjutan.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-slate-900 p-16 rounded-[4rem] text-white transition-all shadow-2xl shadow-slate-200"
            >
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-900 mb-10">
                <Users size={32} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tighter text-white">Misi Kami</h3>
              <ul className="space-y-4">
                {[
                  "Menciptakan teknologi IoT yang mudah diakses.",
                  "Membangun talenta digital yang kompeten.",
                  "Mengoptimalkan efisiensi manufaktur nasional."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-lg">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      {/* SECTION 4: SUCCESS STORIES */}
      <SuccessStories />
      {/* SECTION 4: CALL TO ACTION */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Siap mengorbit bersama kami?</h2>
            <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg">
              Mari diskusikan bagaimana Manufindo dapat membantu mentransformasi tantangan industri Anda menjadi keunggulan kompetitif.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                Hubungi Kami <ArrowRight size={18} />
              </button>
              <button className="px-10 py-5 bg-blue-700/50 text-white border border-blue-400/30 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all">
                Pelajari Produk
              </button>
            </div>
          </div>
          {/* Subtle Orbit Decoration for CTA */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 border-4 border-white/10 rounded-full" />
        </div>
      </section>
    </main>
  );
};

export default AboutUs;