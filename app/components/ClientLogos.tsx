"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ClientLogos = () => {
  // Daftar logo Anda (Pastikan file sudah ada di folder /public/logos/)
  const logos = [
    { id: 1, name: "PT Client Satu", path: "/7k.png" },
    { id: 2, name: "PT Client Dua", path: "/porlone.jpg" },
    { id: 3, name: "PT Client Tiga", path: "/rsmz.jpg" },
    { id: 4, name: "PT Client Empat", path: "/jabung.png" },
    // { id: 5, name: "PT Client Lima", path: "/public/7k.png" },
  ];

  // Kita duplikasi list logo agar scroll tidak terputus (infinite)
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-slate-50">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
          Trusted by Innovative Companies
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Efek Gradient Fade di Kiri dan Kanan agar halus saat masuk/keluar */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{
            x: ["0%", "-50%"], // Berjalan dari kanan ke kiri
          }}
          transition={{
            duration: 25, // Kecepatan jalan (makin besar makin lambat)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="relative w-40 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.path}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;