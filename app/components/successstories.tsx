"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, TrendingUp, Award, Clock } from 'lucide-react';

// Data kisah sukses Anda
const successStoriesData = [
  {
    id: 1,
    image: "/success-story-1.jpg", // Ganti dengan path foto pertama Anda
    clientLogo: "/client-logo-1.png", // Opsional: Logo klien jika ada
    clientName: "PT. Maju Bersama",
    industry: "Manufaktur Otomotif",
    title: "Meningkatkan Efisiensi Produksi 30%",
    challenge: "PT. Maju Bersama menghadapi tantangan dalam memantau lini produksi secara real-time, menyebabkan bottleneck dan sulitnya identifikasi masalah.",
    solution: "Manufindo mengimplementasikan Smart Ops System yang terintegrasi penuh, dengan sensor IoT pada setiap mesin untuk pengumpulan data otomatis.",
    results: [
      { icon: TrendingUp, text: "Peningkatan efisiensi produksi hingga 30%." },
      { icon: Clock, text: "Penurunan downtime mesin sebesar 25%." },
      { icon: Award, text: "Akurasi data inventaris mencapai 99%." },
    ],
    testimonial: "Solusi Manufindo benar-benar mengubah cara kami bekerja. Data yang akurat membuat keputusan kami jauh lebih cepat dan tepat!",
    personName: "Budi Santoso",
    personTitle: "Operations Manager, PT. Maju Bersama"
  },
  {
    id: 2,
    image: "/success-story-2.jpg", // Ganti dengan path foto kedua Anda
    clientLogo: "/client-logo-2.png",
    clientName: "PT. Logistik Cepat",
    industry: "Logistik & Distribusi",
    title: "Optimalisasi Rute Pengiriman, Hemat Biaya 15%",
    challenge: "PT. Logistik Cepat kesulitan dalam menentukan rute pengiriman yang paling efisien, seringkali memakan waktu dan biaya bahan bakar yang tinggi.",
    solution: "Kami memasang Biotrix Fingerprint, sistem pelacakan armada berbasis IoT dengan optimasi rute AI, yang memantau kondisi jalan dan lalu lintas secara real-time.",
    results: [
      { icon: TrendingUp, text: "Penghematan biaya operasional armada hingga 15%." },
      { icon: Clock, text: "Waktu pengiriman rata-rata lebih cepat 20%." },
      { icon: Award, text: "Transparansi dan keamanan aset di setiap perjalanan." },
    ],
    testimonial: "Investasi di Manufindo sangat berharga. Kami kini bisa mengirim lebih banyak dalam waktu lebih singkat dengan biaya lebih rendah. Sangat direkomendasikan!",
    personName: "Citra Dewi",
    personTitle: "Logistics Director, PT. Logistik Cepat"
  },
  {
    id: 3,
    image: "/success-story-3.jpg", // Ganti dengan path foto ketiga Anda
    clientLogo: "/client-logo-3.png",
    clientName: "PT. Global Talenta",
    industry: "Human Capital & Rekrutmen",
    title: "Transformasi Proses Rekrutmen dengan AI",
    challenge: "Proses seleksi CV yang manual dan memakan waktu berbulan-bulan, seringkali membuat PT. Global Talenta kehilangan talenta terbaik.",
    solution: "Manufindo menghadirkan Orbit Talent, platform AI Scoring untuk CV yang otomatis menyaring dan meranking kandidat sesuai kriteria yang dibutuhkan perusahaan.",
    results: [
      { icon: TrendingUp, text: "Proses screening CV lebih cepat 80%." },
      { icon: Clock, text: "Akurasi seleksi kandidat meningkat 40%." },
      { icon: Award, text: "Menghemat ribuan jam kerja tim HR." },
    ],
    testimonial: "Orbit Talent adalah game-changer. Kami sekarang bisa fokus pada wawancara kandidat terbaik, bukan lagi menumpuk CV. Ini adalah masa depan rekrutmen!",
    personName: "Dani Permana",
    personTitle: "HR Manager, PT. Global Talenta"
  },
];

const SuccessStories = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-black uppercase tracking-[0.4em] mb-4"
          >
            OUR IMPACT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6"
          >
            Kisah Sukses <span className="text-blue-600">Pelanggan Kami.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Transformasi nyata melalui kemitraan strategis. Lihat bagaimana solusi IoT kami mengorbitkan efisiensi bisnis.
          </motion.p>
        </div>

        {/* Grid Kisah Sukses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {successStoriesData.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Foto dengan klien */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={story.image}
                  alt={`Kisah Sukses dengan ${story.clientName}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {story.clientLogo && (
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-xl shadow-lg">
                    <Image src={story.clientLogo} alt={`${story.clientName} Logo`} width={60} height={20} className="object-contain" />
                  </div>
                )}
              </div>

              {/* Konten Kisah */}
              <h3 className="text-2xl font-bold mb-3 text-slate-900 leading-tight">
                {story.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" /> {story.clientName} ({story.industry})
              </p>

              <div className="text-sm text-slate-600 space-y-3 mb-6 flex-grow">
                <p className="font-semibold text-slate-700">Tantangan:</p>
                <p>{story.challenge}</p>
                <p className="font-semibold text-slate-700">Solusi Manufindo:</p>
                <p>{story.solution}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl space-y-2 mt-auto">
                <p className="text-slate-700 font-bold text-sm">Hasil Utama:</p>
                {story.results.map((result, i) => (
                  <p key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <result.icon size={18} className="text-emerald-500" /> {result.text}
                  </p>
                ))}
              </div>

              <blockquote className="italic text-slate-700 mt-6 border-l-4 border-blue-500 pl-4">
                &quot;{story.testimonial}&quot;
                <p className="mt-2 text-sm font-semibold text-slate-800">- {story.personName}, <span className="text-slate-500">{story.personTitle}</span></p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Orbit Effect */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default SuccessStories;