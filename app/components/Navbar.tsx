"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Activity, Cpu, Factory, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DetailProduct from './DetailProduct';

const StackedProductCard = ({ item, index, activeIndex, total, onClick, onDetailClick, onSimulasiClick }: any) => {
  // Menghitung posisi relatif terhadap kartu yang sedang aktif
  const relativeIndex = (index - activeIndex + total) % total;
  
  // Logika posisi: kartu aktif di depan (0), kartu lain mundur ke belakang
  const zIndex = total - relativeIndex;
  const opacity = 1 - relativeIndex * 0.2;
  const scale = 1 - relativeIndex * 0.05;
  const yOffset = relativeIndex * -30; // Bergerak ke atas untuk kesan tumpukan menghadap atas
  const zOffset = relativeIndex * -50;

  return (
    <motion.div
      style={{ zIndex }}
      initial={false}
      animate={{
        opacity: opacity < 0 ? 0 : opacity,
        scale: scale,
        y: yOffset,
        z: zOffset,
        rotateX: 15, // Efek menghadap ke atas
        filter: `blur(${relativeIndex * 2}px)`,
      }}
      whileHover={relativeIndex === 0 ? { y: yOffset - 10, scale: scale + 0.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={`absolute w-[340px] md:w-[500px] min-h-[300px] p-8 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/30 backdrop-blur-3xl flex flex-col justify-between overflow-hidden cursor-pointer group ${item.color}`}
    >
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/40 shadow-2xl">
          <item.icon size={30} strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em]">Product</p>
          <p className="text-white font-bold text-sm">0{index + 1}</p>
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <h3 className="text-3xl font-black text-white tracking-tighter leading-tight mb-3">
          {item.title}
        </h3>
        <p className="text-white/80 text-sm font-medium leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Action Buttons - Hanya muncul/interaktif jika kartu di depan */}
      <div className={`relative z-10 flex gap-3 mt-8 transition-opacity duration-300 ${relativeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); onSimulasiClick(); }}
          className="flex-1 py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
        >
          Mulai Simulasi <ArrowRight size={14} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDetailClick(); }}
          className="px-8 py-4 bg-black/20 text-white border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black/40 backdrop-blur-md transition-all"
        >
          Detail
        </button>
      </div>

      {/* Credit Card Chip Decoration */}
      <div className="absolute bottom-8 right-8 w-12 h-9 bg-gradient-to-tr from-yellow-400/30 to-yellow-100/10 rounded-lg border border-white/20 opacity-30" />
    </motion.div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { icon: Zap, title: "Orbit Talent", desc: "Ubah ribuan CV menjadi keputusan rekrutmen yang tepat dengan teknologi AI Scoring.", color: "bg-gradient-to-br from-blue-500 via-indigo-600 to-slate-900" },
    { icon: Activity, title: "Biotrix Fingerprint", desc: "Pelacakan armada otomatis dan manajemen rute berbasis IoT untuk efisiensi logistik.", color: "bg-gradient-to-br from-purple-500 via-fuchsia-600 to-slate-900" },
    { icon: Cpu, title: "Room Pulse System", desc: "Monitoring ruangan cerdas secara real-time untuk memantau suhu, debu, dan cahaya.", color: "bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900" },
    { icon: Factory, title: "Manufindo Smart Ops", desc: "Integrasi operasional pabrik cerdas untuk meningkatkan output produksi secara signifikan.", color: "bg-gradient-to-br from-orange-500 via-red-600 to-slate-900" }
  ];

  // Fungsi untuk scroll tumpukan
  const nextCard = () => setActiveIndex((prev) => (prev + 1) % products.length);

  useEffect(() => {
    if (!isOpen) return; // Hanya jalankan listener jika modal/gallery terbuka

    let lastScrollTime = 0;
    const scrollCooldown = 500; // Jeda antar scroll (ms) agar tidak terlalu cepat pindahnya

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;

      if (e.deltaY > 0) {
        // Scroll bawah -> Kartu Berikutnya
        setActiveIndex((prev) => (prev + 1) % products.length);
        lastScrollTime = now;
      } else if (e.deltaY < 0) {
        // Scroll atas -> Kartu Sebelumnya
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isOpen, products.length]); // Re-run jika status open berubah

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 px-6 ${isScrolled ? 'top-4' : 'top-0'}`}>
        <div className={`mx-auto transition-all duration-500 ${isScrolled ? 'max-w-5xl bg-white/90 backdrop-blur-lg shadow-xl rounded-[2.5rem] border border-slate-200 py-3 px-8' : 'max-w-7xl bg-transparent py-8 px-4'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
              <div className="relative w-10 h-10"><Image src="/Logo Manufindo1-01.png" alt="Logo" fill className="object-contain"/></div>
              <div className="flex flex-col">
                <span className={`font-black text-lg leading-none ${isScrolled ? 'text-slate-900' : 'text-blue-900'}`}>MANUFINDO</span>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-600">Cipta Nusantara</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setIsOpen(true)} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                Product
              </button>

              {/* Tombol Tentang Kami menggunakan router.push */}
              <button 
                onClick={() => router.push('/about')} 
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Tentang Kami
              </button>

              <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Harga</a>
              <a href="#contact" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Kontak</a>

              <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                Gabung Mitra
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-[20px] z-[110]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-6"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">Our Solutions.</motion.h2>
                <p className="text-white/40 font-bold tracking-widest uppercase text-xs">Tap a card to bring it forward • Click Detail to Explore</p>
              </div>

              {/* STACKED AREA - Center Positioned */}
              <div className="relative w-full max-w-[500px] h-[450px] flex items-center justify-center perspective-[1000px]">
                {products.map((item, idx) => (
                  <StackedProductCard 
                    key={idx} 
                    item={item} 
                    index={idx} 
                    activeIndex={activeIndex}
                    total={products.length}
                    onClick={() => setActiveIndex(idx)}
                    onSimulasiClick={() => { setIsOpen(false); router.push('/simulation'); }}
                    onDetailClick={() => {
                        setIsOpen(false);
                        if(idx === 0) router.push('/pricing');
                        else setIsPricingOpen(true);
                    }}
                  />
                ))}
              </div>

              {/* Navigation Indicator */}
              <div className="mt-12 flex gap-2">
                {products.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>

              <button onClick={() => setIsOpen(false)} className="mt-10 text-white/50 hover:text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                <X size={16} /> Close Gallery
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DetailProduct isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
};

export default Navbar;