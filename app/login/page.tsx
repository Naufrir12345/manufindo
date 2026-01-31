"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/simulation");
            router.refresh();
        } else {
            alert("Login Gagal! Periksa kembali email dan password Anda.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 font-medium">Masuk untuk akses simulasi 3D Orbit</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-slate-500">
                    Belum punya akun? <a href="/register" className="text-blue-600 font-bold">Daftar Mitra</a>
                </p>
            </div>
        </div>
    );
}