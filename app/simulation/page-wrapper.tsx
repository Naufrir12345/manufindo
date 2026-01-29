"use client";

import React, { useState, Suspense, lazy } from 'react';

const SimulationCanvas = lazy(() => import('./SimulationCanvas'));

interface LogResult {
    id: number;
    nama: string;
    role: string;
    status: string;
    waktuTap: string;
    nominalGaji: number;
    shift: string;
}

interface Employee {
    nama: string;
    role: string;
    gajiPokok: number;
    potonganTerlambat: number;
    bonusTepatWaktu: number;
    shift: string;
}

export default function PageWrapper() {
    const [isPowerOn, setIsPowerOn] = useState(false);
    const [tempConfig, setTempConfig] = useState<{ nama: string; role: string } | null>(null);
    const [batasTapIn, setBatasTapIn] = useState("08:00");
    const [results, setResults] = useState<LogResult[]>([]);
    const [employeeSettings] = useState<Employee[]>([
        {
            nama: "Adhi",
            role: "Staff",
            gajiPokok: 5000000,
            potonganTerlambat: 50000,
            bonusTepatWaktu: 25000,
            shift: "Shift 1 (08:00 - 16:00)"
        }
    ]);

    return (
        <div className="w-full h-full min-h-[600px]">
            <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                <SimulationCanvas
                    isPowerOn={isPowerOn}
                    setIsPowerOn={setIsPowerOn}
                    tempConfig={tempConfig}
                    batasTapIn={batasTapIn}
                    employeeSettings={employeeSettings}
                    setResults={setResults}
                    setTempConfig={setTempConfig}
                />
            </Suspense>
        </div>
    );
}
