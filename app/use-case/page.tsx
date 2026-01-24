"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import UseCase from '../components/UseCase';
import DigitalOrbitFooter from '../components/DigitalOrbitFooter';

export default function UseCasePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Menampilkan Navbar di bagian atas */}
            <Navbar />

            {/* Memberikan padding top (pt-24) agar konten tidak tertutup Navbar yang fixed/sticky */}
            <main className="pt-24">
                <UseCase />
            </main>

            {/* Menampilkan Footer di bagian bawah */}
            <DigitalOrbitFooter />
        </div>
    );
}