"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Sprout, Dog, Home, CheckCircle2, AlertCircle, Cpu, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import ProjectTimeline from './ProjectTimeline';

const cases = [
    {
        id: "manufacturing",
        title: "Smart Manufacturing",
        icon: Factory,
        color: "blue",
        image: "/manufacturing.png",
        description: "Digitalisasi lini produksi untuk efisiensi mutlak dan pengurangan downtime.",
        benefits: ["OEE Monitoring Real-time", "Predictive Maintenance", "Pencatatan Produksi Otomatis"],
        challenges: [
            {
                problem: "Downtime mesin mendadak yang menghentikan seluruh jalur produksi.",
                solution: "AI Predictive Maintenance memprediksi kerusakan komponen sebelum terjadi."
            },
            {
                problem: "Data produksi manual yang sering tidak akurat (human error).",
                solution: "Sensor IoT mencatat setiap output secara real-time langsung ke cloud."
            }
        ],
        workflow: [
            { step: "01", label: "Edge Sensing", detail: "Sensor IoT dipasang pada mesin produksi untuk menangkap getaran, suhu, dan siklus OEE." },
            { step: "02", label: "Data Gateway", detail: "Data dikirim secara enkripsi ke gateway lokal Manufindo untuk pemrosesan awal." },
            { step: "03", label: "AI Analysis", detail: "Cloud AI menganalisis pola anomali untuk memprediksi potensi kerusakan mesin." },
            { step: "04", label: "Actionable Insights", detail: "Dashboard menampilkan laporan real-time dan notifikasi jadwal maintenance ke tim teknis." }
        ],
        timeline: [
            { sprint: "Sprint 1", week: "Week 1-2", deliverable: "Site Assessment & Sensor Installation", description: "Survey lokasi pabrik, identifikasi titik kritis mesin, instalasi sensor IoT pada lini produksi utama.", status: "completed" as const },
            { sprint: "Sprint 2", week: "Week 3-4", deliverable: "Gateway Setup & Data Integration", description: "Konfigurasi data gateway lokal, testing koneksi sensor ke cloud, validasi akurasi data real-time.", status: "completed" as const },
            { sprint: "Sprint 3", week: "Week 5-6", deliverable: "AI Model Training & Dashboard Development", description: "Training model AI dengan data historis, development dashboard monitoring OEE dan predictive maintenance.", status: "in-progress" as const },
            { sprint: "Sprint 4", week: "Week 7-8", deliverable: "UAT & Go-Live", description: "User acceptance testing dengan tim produksi, fine-tuning alert threshold, deployment production dan training operator.", status: "upcoming" as const }
        ]
    },
    {
        id: "agriculture",
        title: "Precision Agriculture",
        icon: Sprout,
        color: "emerald",
        image: "/agriculture.png",
        description: "Sistem irigasi dan pemantauan nutrisi tanah otomatis berbasis sensor.",
        benefits: ["Optimasi Penggunaan Air", "Monitoring pH Tanah", "Prediksi Masa Panen"],
        challenges: [
            {
                problem: "Pemborosan air dan pupuk karena jadwal penyiraman yang kaku.",
                solution: "AI Irrigation menyesuaikan debit air berdasarkan kelembaban tanah dan cuaca."
            },
            {
                problem: "Gagal panen akibat serangan hama yang terlambat terdeteksi.",
                solution: "Computer Vision pada drone mendeteksi gejala penyakit tanaman sejak dini."
            }
        ],
        workflow: [
            { step: "01", label: "Soil Monitoring", detail: "Probe sensor ditanam di area lahan untuk mengukur NPK, pH, dan kelembaban tanah." },
            { step: "02", label: "Weather Sync", detail: "Sistem menyinkronkan data tanah dengan ramalan cuaca BMKG melalui satelit." },
            { step: "03", label: "Auto Irrigation", detail: "AI menginstruksikan katup air otomatis untuk menyiram sesuai kebutuhan presisi tanaman." },
            { step: "04", label: "Yield Prediction", detail: "Petani menerima estimasi masa panen dan anjuran pemupukan via aplikasi." }
        ],
        timeline: [
            { sprint: "Sprint 1", week: "Week 1-2", deliverable: "Land Surveying & Soil Analysis", description: "Analisis karakteristik lahan, pengukuran pH dan NPK baseline, penentuan titik sensor optimal.", status: "completed" as const },
            { sprint: "Sprint 2", week: "Week 3-4", deliverable: "Sensor Deployment & Irrigation Setup", description: "Instalasi probe sensor tanah, pemasangan katup otomatis, integrasi weather API BMKG.", status: "completed" as const },
            { sprint: "Sprint 3", week: "Week 5-6", deliverable: "AI Calibration & Mobile App Launch", description: "Kalibrasi AI irrigation model dengan data lokal, deployment aplikasi mobile untuk monitoring petani.", status: "in-progress" as const },
            { sprint: "Sprint 4", week: "Week 7-8", deliverable: "Pilot Testing & Optimization", description: "Testing irigasi otomatis pada plot uji coba, adjustment parameter AI, training petani end-user.", status: "upcoming" as const }
        ]
    },
    {
        id: "livestock",
        title: "Livestock Management",
        icon: Dog,
        color: "orange",
        image: "/livestock.png",
        description: "Pemantauan kesehatan dan lingkungan ternak untuk hasil pangan berkualitas.",
        benefits: ["Ammonia Level Monitoring", "Automatic Feeding System", "Health Tracking"],
        challenges: [
            {
                problem: "Tingginya angka kematian ternak akibat kualitas udara (Amonia) buruk.",
                solution: "Sensor Gas otomatis menyalakan ventilasi jika kadar amonia melewati batas."
            },
            {
                problem: "Pertumbuhan ternak tidak merata karena distribusi pakan manual.",
                solution: "Smart Feeding System menjamin jadwal dan takaran pakan presisi."
            }
        ],
        workflow: [
            { step: "01", label: "Environment Scan", detail: "Sensor udara memantau kadar Amonia (NH3), kelembaban, dan suhu di dalam kandang." },
            { step: "02", label: "Smart Ventilation", detail: "Kipas ventilasi otomatis aktif jika kualitas udara menurun di bawah ambang batas aman." },
            { step: "03", label: "Feeding Automation", detail: "Mesin pakan otomatis mengeluarkan takaran berdasarkan usia dan berat rata-rata ternak." },
            { step: "04", label: "Health Log", detail: "Sistem mencatat riwayat kesehatan kolektif untuk mencegah penyebaran wabah." }
        ],
        timeline: [
            { sprint: "Sprint 1", week: "Week 1-2", deliverable: "Livestock Facility Audit", description: "Inspeksi kandang, pengukuran baseline ammonia level, identifikasi hotspot ventilasi buruk.", status: "completed" as const },
            { sprint: "Sprint 2", week: "Week 3-4", deliverable: "Air Quality & Feeding System Install", description: "Pasang sensor gas NH3 dan humidity, instalasi smart feeder otomatis, integrasi ventilasi controller.", status: "completed" as const },
            { sprint: "Sprint 3", week: "Week 5-6", deliverable: "Health Tracking Dashboard", description: "Development dashboard monitoring real-time kondisi kandang, input data kesehatan ternak manual.", status: "in-progress" as const },
            { sprint: "Sprint 4", week: "Week 7-8", deliverable: "Full Automation & Training", description: "Aktivasi sistem feeding/ventilation automation, pelatihan peternak untuk menggunakan dashboard.", status: "upcoming" as const }
        ]
    },
    {
        id: "housing",
        title: "Smart Housing",
        icon: Home,
        color: "indigo",
        image: "/smarthome.png",
        description: "Integrasi keamanan dan manajemen energi untuk hunian modern.",
        benefits: ["Smart Lighting & HVAC", "Akses Kontrol Biometrik", "Pendeteksi Kebocoran Gas"],
        challenges: [
            {
                problem: "Tagihan listrik membengkak akibat pemborosan AC dan lampu.",
                solution: "AI Energy Manager mematikan perangkat di ruangan kosong secara otomatis."
            },
            {
                problem: "Resiko pencurian dan kebocoran gas saat rumah ditinggal pergi.",
                solution: "Sistem keamanan terintegrasi dengan notifikasi instan ke smartphone."
            }
        ],
        workflow: [
            { step: "01", label: "Home Network", detail: "Integrasi smart lock, CCTV, dan panel listrik ke dalam satu pusat kontrol IoT." },
            { step: "02", label: "User Profiling", detail: "AI mempelajari kebiasaan penghuni rumah dalam penggunaan energi (Lampu/AC)." },
            { step: "03", label: "Security Alert", detail: "Enkripsi data dua arah memberikan notifikasi instan jika terdeteksi aktivitas mencurigakan." },
            { step: "04", label: "Energy Saving", detail: "Sistem mengoptimalkan pemakaian listrik secara otomatis saat rumah dalam keadaan kosong." }
        ],
        timeline: [
            { sprint: "Sprint 1", week: "Week 1-2", deliverable: "Smart Home Assessment", description: "Survey rumah, identifikasi perangkat yang akan diintegrasikan, desain network topology IoT.", status: "completed" as const },
            { sprint: "Sprint 2", week: "Week 3-4", deliverable: "IoT Device Installation", description: "Instalasi smart lock biometric, smart plug untuk AC/lampu, CCTV terintegrasi, gas leak detector.", status: "completed" as const },
            { sprint: "Sprint 3", week: "Week 5-6", deliverable: "AI Learning & Mobile Control", description: "AI mulai learning pattern penghuni, setup mobile app untuk remote control, test automation rules.", status: "in-progress" as const },
            { sprint: "Sprint 4", week: "Week 7-8", deliverable: "Full Automation & Handover", description: "Aktivasi auto energy saving mode, integrasi notifikasi security alert ke smartphone, user training.", status: "upcoming" as const }
        ]
    }
];

export default function UseCase() {
    const [activeTab, setActiveTab] = useState(cases[0]);

    return (
        <section className="bg-white py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-blue-600 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block"
                    >
                        Digital Solutions
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                        IoT for Every <span className="text-blue-600 italic">Industry.</span>
                    </h1>
                </div>

                {/* Tab Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {cases.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500 border-2 font-bold text-sm ${activeTab.id === item.id
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.title}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid lg:grid-cols-2 gap-12 items-center mb-24"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 border border-dashed border-slate-200 rounded-[3rem] animate-[spin_30s_linear_infinity] pointer-events-none" />
                            <div className="relative h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                                <Image
                                    src={activeTab.image}
                                    alt={activeTab.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{activeTab.title}</h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">{activeTab.description}</p>
                            <div className="grid gap-4">
                                {activeTab.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="bg-blue-600 rounded-lg p-2 text-white">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span className="font-bold text-slate-800">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* --- BAGIAN BARU: CHALLENGES & AI SOLUTIONS --- */}
                <div className="mt-20 border-t border-slate-100 pt-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-3xl font-black text-slate-900 mb-4">
                                Overcoming Industry <span className="text-blue-600">Pain Points.</span>
                            </h3>
                            <p className="text-slate-500 font-medium">
                                Kami mengidentifikasi masalah kritis dan menyelesaikannya dengan kombinasi AI & IoT.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Cpu size={14} /> AI + IoT Integration
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tambahkan pengecekan safety dengan "?" agar tidak error jika data kosong */}
                        {activeTab.challenges?.map((item, idx) => (
                            <motion.div
                                key={`${activeTab.id}-challenge-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group relative bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1 text-red-500"><AlertCircle size={24} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Common Problem</p>
                                            <p className="text-slate-700 font-bold leading-relaxed">{item.problem}</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-200 w-full" />
                                    <div className="flex gap-4">
                                        <div className="mt-1 text-emerald-500"><ShieldCheck size={24} /></div>
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Manufindo Solution</p>
                                            <p className="text-slate-900 font-black leading-relaxed">{item.solution}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-32 pb-10">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">
                            The <span className="text-blue-600">Manufindo</span> Way.
                        </h3>
                        <p className="text-slate-500 font-medium italic text-sm">Bagaimana teknologi kami bekerja khusus untuk sektor {activeTab.title}</p>
                    </div>

                    <div className="relative">
                        {/* Garis penghubung (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

                        <div className="grid md:grid-cols-4 gap-8">
                            {activeTab.workflow?.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-blue-600 font-black text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-200">
                                        {step.step}
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 mb-2">{step.label}</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                                        {step.detail}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PROJECT TIMELINE SECTION */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`timeline-${activeTab.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {activeTab.timeline && (
                            <ProjectTimeline
                                timeline={activeTab.timeline}
                                useCaseTitle={activeTab.title}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}