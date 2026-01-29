"use client";
import React from 'react';
import { Rocket, Cpu, Mail, MapPin, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DigitalOrbitFooter() {
  // Fungsi scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // UBAH 1: Hapus fixed height (h-[700px]), gunakan padding (py-16) agar lebih pendek.
    <footer className="relative bg-[#0a0a0a] text-slate-300 py-16 overflow-hidden leading-relaxed">

      {/* ================= ORBIT BACKGROUND SYSTEM (Diperkecil & Absolute) ================= */}
      {/* Kita letakkan ini di belakang konten (z-0) dan ukurannya diperkecil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-30 pointer-events-none z-0">
        {/* Efek Bintang/Grid di Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Jalur Orbit 1 (Inner) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] border border-blue-500/20 rounded-full animate-spin-slow"></div>

        {/* Jalur Orbit 2 (Middle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] border border-slate-700/40 rounded-full animate-spin-reverse">
          <div className="absolute top-0 right-1/4 p-1.5 bg-slate-900 border border-slate-700 rounded-full">
            <Cpu size={14} className="text-blue-400" />
          </div>
        </div>

        {/* Jalur Orbit 3 (Outer + Rocket) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-slate-800/30 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-blue-500">
            <Rocket size={24} className="rotate-90" />
          </div>
        </div>
        {/* Garis Horizon Cahaya */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>


      {/* ================= KONTEN UTAMA FOOTER (Grid System) ================= */}
      {/* Gunakan z-10 agar konten berada di atas animasi orbit */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* KOLOM KIRI: CTA BESAR (Mirip referensi "GET IN TOUCH") */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              READY TO <br />
              <span className="text-blue-500">ORBIT?</span>
            </h2>
            <p className="text-slate-400 max-w-sm">
              Transformasi manufaktur Anda dimulai di sini. Diskusikan kebutuhan IoT Anda dengan tim ahli kami.
            </p>

            <div className="pt-4 flex flex-col space-y-4">
              <a href="mailto:contact@manufindo.com" className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors group">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-medium">manufindociptanusantara@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-sm">Griya Permata Hijau H/26, Wedoro Klurak, Candi Sidoarjo, Jawa Timur, Indonesia</span>
              </div>
            </div>
          </div>


          {/* KOLOM KANAN: LINK NAVIGASI (3 Kolom Kecil) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">

            {/* Navigasi */}
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
                <li><Link href="/solutions" className="hover:text-blue-400 transition-colors">Solusi IoT</Link></li>
                <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Harga</Link></li>
              </ul>
            </div>

            {/* Resources/Produk */}
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog & Studi Kasus</Link></li>
                <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Dokumentasi API</Link></li>
                <li><Link href="/support" className="hover:text-blue-400 transition-colors">Pusat Bantuan</Link></li>
              </ul>
            </div>

            {/* Socials & Legal */}
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Instagram</a></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors mt-4 block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>
        </div>


        {/* ================= BOTTOM BAR (Copyright) ================= */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">

          <div className="flex items-center gap-3">
            <Image src="/Logo Manufindo1-01.png" alt="Logo" width={24} height={24}
            />
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
              © 2024 Manufindo Cipta Nusantara.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:block">Beyond the line into digital orbit</span>

            {/* Tombol Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}