"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total durasi animasi (Logo 1s + Garis 1.5s + Exit 0.5s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative w-full max-w-[600px] px-10 flex flex-col items-center">
            
            {/* 1. ANIMASI LOGO (Muncul Pertama) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ 
                opacity: [0, 1, 1, 0], // Muncul, Diam sebentar, lalu Hilang
                scale: [0.9, 1, 1, 1.05],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"]
              }}
              transition={{ 
                duration: 2, 
                times: [0, 0.2, 0.8, 1], // Mengatur timing tiap step di atas
                ease: "easeInOut" 
              }}
              className="mb-0 absolute" // Absolute agar garis muncul tepat di tengah logo
            >
              <Image 
                src="/Logo Manufindo1-01.png" // Pastikan path logo sesuai (di folder public)
                alt="Manufindo Logo" 
                width={180} 
                height={60} 
                priority
              />
            </motion.div>

            {/* 2. ANIMASI GARIS (Muncul Setelah Logo Mulai Memudar) */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ 
                delay: 1.6, // Delay agar muncul saat logo mulai fade-out
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="h-[1.5px] bg-blue-600 relative"
              style={{
                boxShadow: "0px 0px 20px 2px rgba(37, 99, 235, 0.4)"
              }}
            >
              {/* Kilatan Cahaya Berjalan (Glow Tipis) */}
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-1/2"
              />
            </motion.div>

            {/* 3. TEKS BRANDING */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-6 text-[11px] font-medium tracking-[0.5em] text-slate-400 uppercase"
            >
              Innovation <span className="text-blue-600 font-bold">In Progress</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}