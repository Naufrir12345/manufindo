"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const IoTImplementation = () => {
  // Definisi tipe Variants untuk menghindari error TypeScript
  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2.5, ease: "linear", repeat: Infinity }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#f8fafc] py-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Judul Seksi */}
      <div className="text-center mb-12 md:mb-24 z-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
          Integrated IoT Ecosystem
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          Menghubungkan hardware, cloud, dan antarmuka pengguna dalam satu jaringan industri yang cerdas.
        </p>
      </div>

      {/* Container Utama Isometrik */}
      <div className="relative w-full max-w-6xl aspect-[1/1] md:aspect-[16/10] flex items-center justify-center scale-75 md:scale-100">

        {/* SVG Garis Penghubung antar 4 Titik */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          fill="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Garis dari Sensor (Kiri) ke Cloud (Tengah) */}
          {/* <motion.path d="M250 300 L500 200" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6,6" variants={lineVariants} initial="hidden" whileInView="visible" /> */}

          {/* Garis dari Factory (Bawah) ke Cloud (Tengah) */}
          {/* <motion.path d="M500 450 L500 250" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6,6" variants={lineVariants} initial="hidden" whileInView="visible" /> */}

          {/* Garis dari Cloud (Tengah) ke Dashboard (Kanan) */}
          {/* <motion.path d="M550 220 L750 300" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6,6" variants={lineVariants} initial="hidden" whileInView="visible" /> */}
        </svg>

        {/* --- IMPLEMENTASI 4 FILE SVG --- */}

        {/* 1. CLOUD AI (Pusat / Center) */}

        <Image src="/animate/svg/server.svg" alt="Cloud Central" fill className="object-contain drop-shadow-[0_35px_35px_rgba(59,130,246,0.4)]" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl uppercase tracking-widest">Core AI Brain</div>
        {/* <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-64 h-64"
        >
          
        </motion.div> */}

        {/* 2. SENSOR NODE (Kiri / West) */}
        <Image src="/animate/svg/parking.svg" alt="IoT Sensor" fill className="object-contain transition-transform group-hover:-translate-y-3" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-slate-200 text-slate-900 text-[9px] font-bold px-3 py-1 rounded-lg shadow-md">DATA ACQUISITION</div>
        {/* <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="absolute left-[10%] top-[40%] w-40 h-40 group"
        >
          
        </motion.div> */}

        {/* 3. SMART FACTORY (Bawah / South) */}
        <Image src="/animate/svg/hospital.svg" alt="Smart Factory" fill className="object-contain transition-transform group-hover:-translate-y-3" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-slate-200 text-slate-900 text-[9px] font-bold px-3 py-1 rounded-lg shadow-md">MANUFACTURING OPS</div>
        {/* <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-44 h-44 group"
        >
          
        </motion.div>

        {/* 4. ANALYTICS DASHBOARD (Kanan / East) */}
        <Image src="/animate/svg/plant.svg" alt="Live Analytics" fill className="object-contain transition-transform group-hover:-translate-y-3" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-slate-200 text-slate-900 text-[9px] font-bold px-3 py-1 rounded-lg shadow-md">USER INTERFACE</div>
        {/* <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="absolute right-[10%] top-[40%] w-44 h-44 group"
        >
          
        </motion.div> */}

      </div>
    </section>
  );
};

export default IoTImplementation;