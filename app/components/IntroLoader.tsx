"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Kurangi total durasi menjadi 3 detik agar terasa lebih snappy
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }} // Tambahkan efek zoom sedikit saat keluar
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative w-full max-w-[600px] px-10 flex flex-col items-center">

            {/* 1. ANIMASI LOGO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [10, 0, 0, -10],
              }}
              transition={{
                duration: 2,
                times: [0, 0.2, 0.7, 1], // Logo memudar lebih cepat (0.7) agar tidak "stuck"
                ease: "circOut"
              }}
              className="mb-0 absolute"
            >
              <Image
                src="/Logo Manufindo1-01.png"
                alt="Manufindo Logo"
                width={180}
                height={60}
                priority // SANGAT PENTING: Menginstruksikan browser mengunduh logo segera
                quality={100} // Pastikan kualitas maksimal
              />
            </motion.div>

            {/* 2. ANIMASI GARIS */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{
                delay: 1.4, // Dimajukan dari 1.6 agar transisi lebih cepat
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-[1.5px] bg-blue-600 relative"
              style={{
                boxShadow: "0px 0px 20px 2px rgba(37, 99, 235, 0.4)"
              }}
            >
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-1/2"
              />
            </motion.div>

            {/* 3. TEKS BRANDING */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
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