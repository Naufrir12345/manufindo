"use client";
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Static imports for above-the-fold content
import HeroSection from './components/HeroSection';

// Dynamic imports for below-the-fold content (lazy loaded)
const IoTImplementation = dynamic(() => import('./components/IoTImplementation'), {
  loading: () => <div className="h-96 bg-slate-50 animate-pulse rounded-3xl" />,
});

const ClientLogos = dynamic(() => import('./components/ClientLogos'), {
  loading: () => <div className="h-48 bg-white animate-pulse" />,
});

const StatsSection = dynamic(() => import('./components/StatsSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const ProblemsSection = dynamic(() => import('./components/ProblemsSection'), {
  loading: () => <div className="h-screen bg-white animate-pulse" />,
});

const ProductShowcase = dynamic(() => import('./components/ProductShowcase'), {
  loading: () => <div className="h-screen bg-white animate-pulse" />,
});

const DigitalOrbitFooter = dynamic(() => import('./components/DigitalOrbitFooter'), {
  loading: () => <div className="h-96 bg-slate-900 animate-pulse" />,
});

// National Reach Section (kept inline as it's simple)
function NationalReachSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-slate-900">National Reach</h2>
          <p className="text-slate-500 mt-2">Connecting industries across the archipelago.</p>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center group overflow-hidden shadow-sm">
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
  );
}

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900">
      {/* Above the fold - loaded immediately */}
      <HeroSection />

      {/* Below the fold - lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <IoTImplementation />
      </Suspense>

      <Suspense fallback={<div className="h-48 bg-white animate-pulse" />}>
        <ClientLogos />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <NationalReachSection />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-white animate-pulse" />}>
        <ProblemsSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-white animate-pulse" />}>
        {/* <ProductShowcase /> */}
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-slate-900 animate-pulse" />}>
        <DigitalOrbitFooter />
      </Suspense>
    </main>
  );
}