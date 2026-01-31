"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SimulationGate({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // 1. Tampilan saat loading session
    if (status === "loading") {
        return (
            <div className="h-[500px] w-full flex items-center justify-center bg-slate-900 rounded-[3rem]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    // 2. Tampilan jika BELUM login (Placeholder agar tidak lag)
    if (!session) {
        return (
            <div className="relative h-[500px] w-full bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center p-8 border border-white/10">
                <div className="text-center z-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Fitur Eksklusif Mitra</h2>
                    <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                        Silakan login untuk mengakses simulasi interaktif 3D Orbit Platform.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Login untuk Mengakses
                    </button>
                </div>

                {/* Efek visual background agar tetap cantik tapi ringan */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
            </div>
        );
    }

    // 3. Tampilkan konten asli jika SUDAH login
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}