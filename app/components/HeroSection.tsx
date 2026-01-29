"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Smartphone, Factory, BrainCircuit } from 'lucide-react';
import { AuroraBackground } from './AuroraTexture';

export default function HeroSection() {
    return (
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-6 lg:px-12">
            <AuroraBackground />
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 uppercase-none">
                    <div className="relative inline-block px-4 py-1.5 rounded-full bg-white border border-blue-100 overflow-hidden group">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="animate-border-beam absolute top-0 left-0 w-[40px] h-[2px] bg-gradient-to-r from-transparent via-blue-50 to-transparent blur-[1px]"></div>
                        </div>
                        <span className="relative z-10 text-blue-600 text-[10px] md:text-sm font-bold tracking-[0.2em]">
                            BEYOND THE LINE. INTO THE DIGITAL ORBIT.
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                        Empowering smarter decisions <br className="hidden md:block" />
                        through <span className="text-blue-600 font-medium">connected technology.</span>
                    </h1>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-light tracking-wide">
                        Our IoT platform transforms real-time data into actionable insights—
                        <span className="font-medium text-slate-800 italic">secure, scalable, and reliable.</span>
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="flex-1 sm:flex-none justify-center bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
                            Start Exploring <Smartphone size={20} />
                        </button>
                        <button className="flex-1 sm:flex-none justify-center bg-white border border-slate-200 hover:border-slate-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="relative h-[400px] lg:h-[500px] bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner flex items-center justify-center p-6">
                    <div className="relative flex flex-col items-center justify-between h-full py-12 z-10 w-full">

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

                        {/* FLOW LINE 1 */}
                        <div className="relative h-24 w-[2px] bg-slate-200 overflow-hidden">
                            <motion.div
                                animate={{ top: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full animate-pulse"></div>
                            <div className="relative w-24 h-24 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200 flex items-center justify-center text-white z-10">
                                <Cloud size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
                            </div>
                            <span className="absolute -right-20 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hidden md:block">AI Processing</span>
                        </motion.div>

                        {/* FLOW LINE 2 */}
                        <div className="relative h-24 w-[2px] bg-slate-200 overflow-hidden">
                            <motion.div
                                animate={{ top: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                                className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                            />
                        </div>

                        {/* STEP 3: DASHBOARD */}
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

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>

                    {/* Bottom Cards */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] z-20">
                        <div className="grid grid-cols-3 gap-3">

                            <div className="bg-white/80 backdrop-blur-md p-2 md:p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-200">
                                    <Cpu size={14} className="md:w-4 md:h-4" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-[8px] md:text-xs uppercase tracking-tighter">AI Integration</h4>
                                <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Otomasi cerdas produksi.</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md p-2 md:p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-cyan-200">
                                    <Factory size={14} className="md:w-4 md:h-4" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-[8px] md:text-xs uppercase tracking-tighter">Smart Factory</h4>
                                <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Real-time monitoring.</p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-md p-2 md:p-4 rounded-2xl shadow-xl shadow-blue-500/5 border border-white flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg shadow-indigo-200">
                                    <BrainCircuit size={14} className="md:w-4 md:h-4" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-[8px] md:text-xs uppercase tracking-tighter">Data Analytics</h4>
                                <p className="text-[9px] text-slate-500 leading-tight mt-1 hidden md:block">Prediksi akurat.</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
