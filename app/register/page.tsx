"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal mendaftar");
            }

            alert("Registrasi Berhasil! Silakan masuk.");
            router.push("/login"); // Mengarahkan ke halaman login setelah sukses
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Daftar Akun</h2>
                <p className="text-center text-gray-500 mb-8">Bergabung dengan ekosistem 3D Orbit</p>

                {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none transition-all 
                                focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:text-blue-600 focus:bg-white"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none transition-all 
                                focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:text-blue-600 focus:bg-white"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none transition-all 
                                focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:text-blue-600 focus:bg-white"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-950 transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Memproses..." : "Daftar Sekarang"}
                    </button>
                </form>
            </div>
        </div>
    );
}