"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { ProductModel } from './ProductModel';

interface Employee {
    nama: string;
    role: string;
    gajiPokok: number;
    potonganTerlambat: number;
    bonusTepatWaktu: number;
    shift: string;
}

interface LogResult {
    id: number;
    nama: string;
    role: string;
    status: string;
    waktuTap: string;
    nominalGaji: number;
    shift: string;
}

interface SimulationCanvasProps {
    isPowerOn: boolean;
    setIsPowerOn: (val: boolean) => void;
    tempConfig: { nama: string; role: string } | null;
    batasTapIn: string;
    employeeSettings: Employee[];
    setResults: React.Dispatch<React.SetStateAction<LogResult[]>>;
    setTempConfig: (val: { nama: string; role: string } | null) => void;
}

export default function SimulationCanvas({
    isPowerOn,
    setIsPowerOn,
    tempConfig,
    batasTapIn,
    employeeSettings,
    setResults,
    setTempConfig
}: SimulationCanvasProps) {
    return (
        <div className="relative w-full h-full bg-[#f0f0f0] rounded-[32px] overflow-hidden shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] border border-slate-200">
            <div className="absolute top-8 left-8 z-10">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Live Preview</p>
                <h3 className="text-xl font-black text-slate-800 tracking-tighter">SIMULATION_V2.0</h3>
            </div>

            <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <ProductModel
                            isPowerOn={isPowerOn}
                            setIsPowerOn={setIsPowerOn}
                            onFingerSuccess={() => {
                                if (!tempConfig) {
                                    alert("Silahkan klik Save Configuration di panel kiri terlebih dahulu!");
                                    return;
                                }

                                const sekarang = new Date();
                                const jamSekarang = sekarang.getHours();
                                const menitSekarang = sekarang.getMinutes();

                                const [jamBatas, menitBatas] = batasTapIn.split(':').map(Number);

                                const isTerlambat = jamSekarang > jamBatas || (jamSekarang === jamBatas && menitSekarang > menitBatas);
                                const statusWaktu = isTerlambat ? "TERLAMBAT" : "TEPAT WAKTU";

                                const userSetting = employeeSettings.find(emp => emp.nama === tempConfig.nama) || {
                                    gajiPokok: 0,
                                    potonganTerlambat: 0,
                                    bonusTepatWaktu: 0,
                                    shift: "Default Shift"
                                };

                                let gajiHariIni = userSetting.gajiPokok > 0 ? userSetting.gajiPokok / 30 : 0;

                                if (isTerlambat) {
                                    gajiHariIni -= userSetting.potonganTerlambat;
                                } else {
                                    gajiHariIni += userSetting.bonusTepatWaktu;
                                }

                                const newData = {
                                    id: Date.now(),
                                    nama: tempConfig.nama,
                                    role: tempConfig.role,
                                    status: statusWaktu,
                                    waktuTap: `${jamSekarang.toString().padStart(2, '0')}:${menitSekarang.toString().padStart(2, '0')}`,
                                    nominalGaji: gajiHariIni,
                                    shift: userSetting.shift || "Default Shift"
                                };

                                setResults(prev => [newData, ...prev]);
                                setTempConfig(null);

                                alert(`Absen Berhasil! \nNama: ${newData.nama} \nStatus: ${statusWaktu} \nEstimasi Gaji Hari Ini: Rp ${gajiHariIni.toLocaleString()}`);
                            }}
                        />
                    </Stage>
                </Suspense>

                <OrbitControls
                    makeDefault
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}
