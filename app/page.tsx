"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Fingerprint, ShoppingCart, Star, LucideIcon, Activity, ClipboardList, Truck, Lightbulb, ChevronUp, X, Zap, Eye, Box, ShieldCheck, Cpu, Factory, BrainCircuit, HardHat, Rocket, ChevronRight, CheckCircle2, Cloud, Smartphone, ArrowRight } from 'lucide-react';
import Lottie from "lottie-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring, useInView } from "framer-motion";
import { useRouter } from 'next/navigation'; // Tambahkan ini!
import IoTImplementation from './components/IoTImplementation';
import ClientLogos from './components/ClientLogos';
import { AuroraBackground } from './components/AuroraTexture';
import  DigitalOrbitFooter  from './components/DigitalOrbitFooter';

// import { useRef } from "react";

// const [selectedDetail, setSelectedDetail] = useState<{title: string, content: string} | null>(null);
// const containerRef = useRef(null);
const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

// 1. Definisikan interface CUKUP SATU KALI
interface UseCaseCardProps {
  icon: LucideIcon; 
  title: string;
  desc: string;
  onDetailClick: () => void;
  onSimulasiClick: () => void;
}

// 2. Gunakan kurung kurawal { ... } setelah tanda => jika ada logika di dalamnya
const UseCaseCard = ({ icon: Icon, title, desc, onDetailClick, onSimulasiClick }: UseCaseCardProps) => {
  // Baris "const { icon: Icon... } = props;" DIHAPUS karena sudah ada di atas
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="mb-4 bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
        {/* Sekarang Icon ini akan bekerja dengan benar */}
        <Icon className="text-blue-600" size={24} />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{desc}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
        <button 
          onClick={onSimulasiClick} 
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Coba Simulasi
        </button>
        <button 
          onClick={onDetailClick} 
          className="text-slate-500 text-xs font-medium hover:text-blue-600 transition-colors underline underline-offset-4"
        >
          Detail
        </button>
      </div>
    </div>
  );
};



export default function Home() {
  // Tambahkan tipe data agar TypeScript tidak error saat mengakses .title atau .content
  const [selectedDetail, setSelectedDetail] = useState<{title: string, content: string} | null>(null);
  const router = useRouter(); // Pastikan sudah import dari 'next/navigation'
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const yPosition = useTransform(scrollY, [0, 200], [50, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSimulasiClick = () => {
    router.push('/simulation'); // Ganti dengan path halaman simulasi Anda
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Gunakan 'as HTMLInputElement' agar TypeScript tahu ini elemen input
    const nama = (document.getElementById('nama_user') as HTMLInputElement)?.value;
    const email = (document.getElementById('email_user') as HTMLInputElement)?.value;
    const rencana = (document.getElementById('rencana_dev') as HTMLTextAreaElement)?.value;

    if (!nama || !email || !rencana) {
      alert("Harap isi semua kolom konsultasi.");
      return;
    }

    const subject = encodeURIComponent(`Konsultasi Custom Sensor - ${nama}`);
    const body = encodeURIComponent(
      `Halo Manufindo,\n\nSaya ingin konsultasi mengenai:\n${rencana}\n\nDetail Kontak:\nNama: ${nama}\nEmail: ${email}`
    );

    window.location.href = `mailto:manufindociptanusantara@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen text-slate-900">
      
      <section className="relative pt-32 pb-20 px-6 lg:px-12">
        <AuroraBackground />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* KOLOM KIRI: TEKS & HOOK */}
          <div className="space-y-8 uppercase-none">
            <div className="relative inline-block px-4 py-1.5 rounded-full bg-white border border-blue-100 overflow-hidden group">
            {/* Beam Animation (Cahaya yang berputar) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-border-beam absolute top-0 left-0 w-[40px] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px]"></div>
            </div>

            {/* Konten Teks */}
            <span className="relative z-10 text-blue-600 text-[10px] md:text-sm font-bold tracking-[0.2em]">
              BEYOND THE LINE. INTO THE DIGITAL ORBIT.
            </span>
          </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Empowering smarter decisions <br className="hidden md:block" />
              through <span className="text-blue-600 font-medium">connected technology.</span>
            </h1>

            {/* Deskripsi dengan Font-size yang lebih proporsional */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-light tracking-wide">
              Our IoT platform transforms real-time data into actionable insights—
              <span className="font-medium text-slate-800 italic">secure, scalable, and reliable.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
                Start Exploring <ChevronRight size={20} />
              </button>
              <button className="bg-white border border-slate-200 hover:border-slate-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* KOLOM KANAN: ANIMASI TOPOLOGY / VISUAL */}
          <div className="relative h-[400px] lg:h-[500px] bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner flex items-center justify-center p-6">
            {/* KOLOM KANAN: ANIMASI IOT FLOW (REVISI IOTERA STYLE) */}
            
              
              {/* Container Utama Animasi */}
              <div className="relative flex flex-col items-center justify-between h-full py-12 z-10 w-full">
                
                {/* STEP 1: SENSOR / DEVICE */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600 border border-slate-50 group-hover:scale-110 transition-transform">
                    <Cpu size={28} />
                  </div>
                  <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">IoT Sensors</span>
                </motion.div>

                {/* FLOW LINE 1 (Vertical) */}
                <div className="relative h-24 w-[2px] bg-slate-200 overflow-hidden">
                  <motion.div 
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                  />
                </div>

                {/* STEP 2: CLOUD AI (CENTER PIECE) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200 flex items-center justify-center text-white z-10">
                    <Cloud size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="absolute -right-20 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hidden md:block">AI Processing</span>
                </motion.div>

                {/* FLOW LINE 2 (Vertical) */}
                <div className="relative h-24 w-[2px] bg-slate-200 overflow-hidden">
                  <motion.div 
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                  />
                </div>

                {/* STEP 3: DASHBOARD / USER APP */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-indigo-600 border border-slate-50 group-hover:scale-110 transition-transform">
                    <Smartphone size={28} />
                  </div>
                  <span className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Insights</span>
                </motion.div>

              </div>

              {/* Dekorasi Grid Pattern (Tetap Ada) */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
              
              {/* Extra Glow untuk nuansa Futuristik */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>
              
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] z-20">
              <div className="grid grid-cols-3 gap-3">
                
                {/* Card 1: AI Integration */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-200">
                    <Cpu size={16} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-tighter">AI Integration</h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Otomasi cerdas produksi.</p>
                </div>

                {/* Card 2: Smart Factory */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-cyan-200">
                    <Factory size={16} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-tighter">Smart Factory</h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Real-time monitoring.</p>
                </div>

                {/* Card 3: Data Analytics */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-indigo-200">
                    <BrainCircuit size={16} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-[10px] md:text-xs uppercase tracking-tighter">Data Analytics</h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Prediksi akurat.</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
      <IoTImplementation />
      <ClientLogos />
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">National Reach</h2>
            <p className="text-slate-500 mt-2">Connecting industries across the archipelago.</p>
          </div>

          {/* Space Kosong untuk 3D Illustration Map */}
          <div className="relative w-full h-[400px] lg:h-[600px] bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center group overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
            
            <div className="text-center z-10">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">
                [ 3D Map Illustration Placeholder ]
              </p>
              <p className="text-slate-300 text-xs mt-2">Fokus: Pulau Jawa & Digital Orbit</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STATS COUNTER */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* Stat 1: Customer */}
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-blue-600 flex justify-center items-center">
                <Counter value={17} />
                <span>+</span>
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Happy Customers</p>
            </div>

            {/* Stat 2: Projects */}
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-slate-900 flex justify-center items-center">
                <Counter value={25} />
                <span>+</span>
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Projects Completed</p>
            </div>

            {/* Stat 3: Cities */}
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-slate-900 flex justify-center items-center">
                <Counter value={5} />
                <span>+</span>
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Cities Covered</p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100">
              <span className="text-red-600 text-xs font-bold tracking-widest uppercase">Analisis Loss Profit</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Data Ada, <span className="text-red-600 italic">Tapi Profit Tetap Bocor?</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Manufaktur modern menghadapi tantangan kompleks yang menghambat skalabilitas. Kami hadir dengan solusi cerdas.</p>
          </div>

          {/* Grid Masalah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Activity size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Kebocoran Profit Akibat Downtime</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Mesin mati tiba-tiba menyebabkan kerugian jutaan rupiah per jam karena downtime yang tidak terencana.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <ClipboardList size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Data Tersebar & Manual?</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Laporan produksi masih menggunakan kertas atau Excel yang rawan human error dan lambat dianalisis.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Kurang Optimal & Boros?</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Tanpa pemantauan real-time, efisiensi mesin menurun, konsumsi energi meningkat, dan biaya operasional membengkak.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Stok Bahan Baku Berantakan</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Produksi terhenti karena bahan baku habis mendadak atau stok menumpuk terlalu lama.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <HardHat size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Keamanan Kerja Berisiko Tinggi</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Sulit memantau kepatuhan APD dan zona bahaya di area pabrik yang luas.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">b
                <HardHat size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Kualitas Produk Tidak Konsisten</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Cacat produk baru ketahuan setelah barang sampai di gudang (QC lambat).</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Kerusakan Datang Tanpa Peringatan</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Operasional sering terganggu karena kerusakan alat yang tidak terprediksi sebelumnya.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Keputusan Optimasi Berdasarkan Asumsi</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Tanpa data real-time dan analisis berbasis IoT, keputusan operasional sering dibuat berdasarkan perkiraan dan pengalaman semata.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Tidak Ada prediksi Umur Pakai Alat</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Tanpa prediksi umur pakai alat yang akurat, penggantian menjadi tidak tepat waktu, biaya aset membengkak, dan risiko kerusakan fatal meningkat.</p>
            </div>
          </div>
        </div>  
      </section>

      {/* SECTION: PRODUCT SHOWCASE */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* GRID KIRI: VISUAL PRODUK & FLOATING BADGES */}
            <div className="relative flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 min-h-[500px] overflow-hidden group">
              {/* Background Glow - Diperbesar agar lebih dramatis */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-110 group-hover:scale-150 transition-transform duration-700"></div>
              
              <motion.div
                whileHover={{ scale: 1.1 }} // Sedikit diperbesar saat hover
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                /* 1. p-0: Menghilangkan semua padding agar gambar bisa sebesar mungkin.
                  2. scale-125: Teknik rahasia untuk memaksa gambar 'zoom in' melampaui batas container normal.
                */
                className="relative z-10 w-full h-full flex items-center justify-center p-0 scale-125"
              >
                <Image 
                  src="/Biotrix.png" 
                  alt="Manufindo Industrial IoT Gateway"
                  width={1200} 
                  height={1200}
                  priority 
                  /* Menggunakan object-cover jika ingin memenuhi layar, 
                    atau object-contain dengan scale besar agar detail hardware tidak terpotong.
                  */
                  className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </motion.div>

              {/* FLOATING BADGES - Disesuaikan posisinya agar tidak bertabrakan dengan gambar yang membesar */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-8 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Status</p>
                  <p className="text-xs font-bold text-slate-900">Real-time Active</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-8 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Security</p>
                  <p className="text-xs font-bold text-slate-900">Industrial Grade</p>
                </div>
              </motion.div>
            </div>

            {/* GRID KANAN: SPECS, RATING & PRICING */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                  <Zap size={14} fill="currentColor" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">New Release 2024</span>
                </div>
                <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                  Biotrix Smart Fingerprint Access<br /> 
                  <span className="text-blue-600">Series BX-125</span>
                </h2>
                
                {/* Rating & Social Proof */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={16} className="text-amber-400" fill="currentColor" />
                    ))}
                    <span className="ml-2 font-bold text-slate-900">4.9/5</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <p className="text-sm text-slate-500">Diterapkan di 100+ Lini Produksi</p>
                </div>
              </div>

              {/* Spesifikasi Singkat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Konektivitas</p>
                  <p className="text-sm font-semibold text-slate-800">Wi-Fi, LoRa, LTE</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Durabilitas</p>
                  <p className="text-sm font-semibold text-slate-800">IP65 Waterproof</p>
                </div>
              </div>

              {/* Client yang sudah pakai */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-400 italic">Trusted by industry leaders:</p>
                <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
                  {/* Gunakan inisial logo jika file gambar belum ada */}
                  <span className="font-black text-xl">MANUFACT</span>
                  <span className="font-black text-xl">LOGISTIC.CO</span>
                  <span className="font-black text-xl">SMARTLAB</span>
                </div>
              </div>

              {/* Harga & Tombol Aksi */}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Harga Mulai Dari</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">Rp 850.000</span>
                    <span className="text-slate-400 text-sm">/ Unit</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
                    <ShoppingCart size={20} />
                    Beli Sekarang
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)} // Memicu modal
                    className="flex-1 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                  > 
                    <Fingerprint size={20} />
                    Custom Fingerprint?
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-400">
                  *Tersedia diskon untuk pengadaan batch industri di atas 10 unit.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* GRID KIRI: VISUAL PRODUK & FLOATING BADGES */}
            

            {/* GRID KANAN: SPECS, RATING & PRICING */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
                  <Zap size={14} fill="currentColor" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">New Release 2024</span>
                </div>
                <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                  RoomPulse Monitoring System <br /> 
                  <span className="text-blue-600">Series RMS-010</span>
                </h2>
                
                {/* Rating & Social Proof */}
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={16} className="text-amber-400" fill="currentColor" />
                    ))}
                    <span className="ml-2 font-bold text-slate-900">4.9/5</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <p className="text-sm text-slate-500">Diterapkan di 100+ Lini Produksi</p>
                </div>
              </div>

              {/* Spesifikasi Singkat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Konektivitas</p>
                  <p className="text-sm font-semibold text-slate-800">Wi-Fi, LoRa, LTE</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Durabilitas</p>
                  <p className="text-sm font-semibold text-slate-800">IP65 Waterproof</p>
                </div>
              </div>

              {/* Client yang sudah pakai */}
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-400 italic">Trusted by industry leaders:</p>
                <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
                  {/* Gunakan inisial logo jika file gambar belum ada */}
                  <span className="font-black text-xl">MANUFACT</span>
                  <span className="font-black text-xl">LOGISTIC.CO</span>
                  <span className="font-black text-xl">SMARTLAB</span>
                </div>
              </div>

              {/* Harga & Tombol Aksi */}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Harga Mulai Dari</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">Rp 2.500.000</span>
                    <span className="text-slate-400 text-sm">/ Unit</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
                    <ShoppingCart size={20} />
                    Beli Sekarang
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)} // Memicu modal
                    className="flex-1 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Cpu size={20} />
                    Custom Sensor?
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-400">
                  *Tersedia diskon untuk pengadaan batch industri di atas 10 unit.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 min-h-[500px] overflow-hidden group">
              {/* Background Glow - Diperbesar agar lebih dramatis */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-110 group-hover:scale-150 transition-transform duration-700"></div>
              
              <motion.div
                whileHover={{ scale: 1.1 }} // Sedikit diperbesar saat hover
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                /* 1. p-0: Menghilangkan semua padding agar gambar bisa sebesar mungkin.
                  2. scale-125: Teknik rahasia untuk memaksa gambar 'zoom in' melampaui batas container normal.
                */
                className="relative z-10 w-full h-full flex items-center justify-center p-0 scale-125"
              >
                <Image 
                  src="/RoomPulse.png" 
                  alt="Manufindo Industrial IoT Gateway"
                  width={1200} 
                  height={1200}
                  priority 
                  /* Menggunakan object-cover jika ingin memenuhi layar, 
                    atau object-contain dengan scale besar agar detail hardware tidak terpotong.
                  */
                  className="w-[90%] h-[90%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </motion.div>

              {/* FLOATING BADGES - Disesuaikan posisinya agar tidak bertabrakan dengan gambar yang membesar */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-8 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Status</p>
                  <p className="text-xs font-bold text-slate-900">Real-time Active</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-8 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Security</p>
                  <p className="text-xs font-bold text-slate-900">Industrial Grade</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <DigitalOrbitFooter />

      {/* ANCHOR: Modal Custom Sensor */}
      {/* MODAL SECTION */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay Gelap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999]"
            />

            {/* Konten Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-lg h-fit bg-white rounded-[2.5rem] shadow-2xl z-[1000] overflow-hidden border border-slate-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Custom IoT Solution</h3>
                    <p className="text-sm text-slate-500">Diskusikan kebutuhan spesifik hardware Anda.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nama Lengkap</label>
                      <input id="nama_user" type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Perusahaan</label>
                      <input id="email_user" type="email" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="name@company.com" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Rencana Pengembangan</label>
                    <textarea id="rencana_dev" rows={4} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jelaskan sensor atau sistem yang ingin Anda kembangkan..."></textarea>
                  </div>

                  <button 
                    type="button" 
                    onClick={handleEmailClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    Kirim Konsultasi Gratis
                    <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
    
    
  );
}