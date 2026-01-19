"use client";
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { ProductModel } from './ProductModel';

interface Employee {
    nama: string;
    role: string;
    gajiPokok: number;
    potonganTerlambat: number;
    bonusTepatWaktu: number;
    shift: string;
  }

export default function SimulationPage() {
  // State untuk menghubungkan Form (Kiri) ke Model 3D (Kanan)
  const [status, setStatus] = useState("idle");
  const [power, setPower] = useState(0);
  const [isPowerOn, setIsPowerOn] = useState(false); // State baru untuk mesin
  const [perusahaan, setPerusahaan] = useState("");
  const [userName, setUserName] = useState("");
  const [tapIn, setTapIn] = useState("");
  const [tapOut, setTapOut] = useState("");
  const [role, setRole] = useState("Staff");
  const [karyawan, setKaryawan] = useState([{ id: 1, nama: "" }]);
  const [results, setResults] = useState<any[]>([]); // Untuk tabel hasil
  const [tempConfig, setTempConfig] = useState<any>(null);
  const [batasTapIn, setBatasTapIn] = useState("08:00");
  const [gajiPokok, setGajiPokok] = useState<number>(0);
  const [potongan, setPotongan] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [shiftHr, setShiftHr] = useState<string>("Shift 1 (08:00 - 16:00)");

  const [employeeSettings, setEmployeeSettings] = useState<Employee[]>([
    { 
      nama: "Adhi", 
      role: "Staff", 
      gajiPokok: 5000000, 
      potonganTerlambat: 50000, 
      bonusTepatWaktu: 25000,
      shift: "Shift 1 (08:00 - 16:00)"
    }
  ]);
  const [selectedUserFilter, setSelectedUserFilter] = useState("All");

  const handleSave = (e: any) => {
  if (e) e.preventDefault();
  
  if (!userName.trim()) {
    alert("Silahkan isi Nama User terlebih dahulu!");
    return;
  }

  // Simpan ke penampung, JANGAN masukkan ke results dahulu
  setTempConfig({
    nama: userName,
    role: role,
  });

  alert("Konfigurasi Terkunci. Silahkan tap pada mesin finger untuk absen.");
};

  const tambahKaryawan = () => {
    setKaryawan([...karyawan, { id: Date.now(), nama: "" }]);
  };

  const handleAddEmployee = () => {
    const newEmp: Employee = {
      nama: userName,
      role: "Staff",
      gajiPokok,
      potonganTerlambat: potongan,
      bonusTepatWaktu: bonus,
      shift: shiftHr
    };
    setEmployeeSettings([...employeeSettings, newEmp]);
    alert(`Karyawan ${userName} berhasil didaftarkan!`);
  };
  
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 h-screen bg-slate-50">
      
      {/* SEBELAH KIRI: Form Input */}
      <div className={`p-8 flex flex-col h-screen overflow-y-auto bg-white border-r border-slate-200 transition-all duration-500 ${
        !isPowerOn ? 'opacity-40 grayscale' : 'opacity-100'
      }`}>
        <h2 className="text-2xl font-bold mb-8 text-slate-800">Configuration Panel</h2>
        
        <div className="space-y-6">
          {/* Input Dasar */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Perusahaan & User</label>
            {/* Tambahkan atribut disabled={!isPowerOn} pada setiap input agar lebih aman */}
            <input 
              disabled={!isPowerOn} 
              className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl mb-3 disabled:cursor-not-allowed" 
              placeholder="Nama Perusahaan" 
            />
            <input 
              type="text"
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Nama User"
              className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl mb-3"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Role User</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Staff">Staff (Simulasi Finger)</option>
              <option value="HR">HR (Kelola Karyawan)</option>
            </select>
          </div>

          {/* Input Karyawan (Hanya jika HR) */}
          {role === "HR" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-800 mb-3 uppercase">HR Payroll Settings</h3>
              
              <div className="space-y-3">
                <input 
                  type="number" 
                  placeholder="Gaji Pokok (Rp)" 
                  className="w-full p-2 rounded-lg border border-blue-200 text-slate-900"
                  onChange={(e) => setGajiPokok(Number(e.target.value))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Potongan (Terlambat)" className="p-2 rounded-lg border border-blue-200 text-slate-900" />
                  <input type="number" placeholder="Bonus (Tepat Waktu)" className="p-2 rounded-lg border border-blue-200 text-slate-900" />
                </div>

                {/* Setting Shift (3 Opsi) */}
                <select className="w-full p-2 rounded-lg border border-blue-200 text-slate-900">
                  <option>Shift 1 (08:00 - 16:00)</option>
                  <option>Shift 2 (16:00 - 00:00)</option>
                  <option>Shift 3 (00:00 - 08:00)</option>
                </select>
                <button onClick={handleAddEmployee} className="w-full py-2 bg-blue-800 text-white rounded-lg text-xs font-bold">Register Employee</button>
              </div>
            </div>
          )}

          {/* Batas Waktu */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Batas Tap In</label>
              <input type="time" 
                          value={batasTapIn}
                          onChange={(e) => setBatasTapIn(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Batas Tap Out</label>
              <input type="time" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" />
            </div>
          </div>

          <button 
            onClick={handleSave} 
            disabled={!isPowerOn} // Tombol mati jika mesin Power Off
            className={`w-full py-4 rounded-2xl font-bold ${
              !isPowerOn ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Save Configuration
          </button>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Real-time Log</h2>
            
            <select 
              value={selectedUserFilter}
              onChange={(e) => setSelectedUserFilter(e.target.value)}
              className="p-2 bg-white border rounded-lg text-xs"
            >
              <option value="All">Semua Karyawan</option>
              {employeeSettings.map((emp, index) => (
                <option key={index} value={emp.nama}>
                  {emp.nama}
                </option>
              ))}
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase">
                <th className="p-3">Nama</th>
                <th className="p-3">Status</th>
                <th className="p-3">Gaji Hari Ini</th>
              </tr>
            </thead>
            <tbody>
              {results
                .filter(res => selectedUserFilter === "All" || res.nama === selectedUserFilter)
                .map((res) => (
                  <tr key={res.id} className="border-t">
                    <td className="p-3">{res.nama}</td>
                    <td className="p-3">
                      <span className={res.status === "TERLAMBAT" ? "text-red-500" : "text-green-500"}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-blue-600">
                      Rp {res.nominalGaji.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Total Gaji Kumulatif untuk Filter yang dipilih */}
          {selectedUserFilter !== "All" && (
            <div className="mt-4 p-3 bg-slate-900 text-white rounded-xl flex justify-between">
              <span>Total Gaji Diterima ({selectedUserFilter}):</span>
              <span className="font-bold text-green-400">
                Rp {results
                  .filter(r => r.nama === selectedUserFilter)
                  .reduce((acc, curr) => acc + curr.nominalGaji, 0)
                  .toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <hr className="my-10 border-slate-100" />

        {/* TABEL HASIL */}
        <div className="mt-auto">
          <h3 className="font-bold text-slate-800 mb-4">Real-time Log</h3>
          <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.length > 0 ? (
                  results.map((res) => (
                    <tr key={res.id}>
                      <td className="p-3 font-medium text-slate-700">{res.nama}</td>
                      <td className="p-3 text-slate-500">{res.role}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                          res.status === "TERLAMBAT" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-green-100 text-green-600"
                        }`}>
                          {res.status}
                        </span>
                      </td>
                    </tr> // <--- Pastikan ditutup dengan </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-slate-400">
                      Belum ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-8 h-screen bg-slate-50">
        <div className="relative w-full h-full bg-[#f0f0f0] rounded-[32px] overflow-hidden shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] border border-slate-200">
          <div className="absolute top-8 left-8 z-10">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Live Preview</p>
            <h3 className="text-xl font-black text-slate-800 tracking-tighter">SIMULATION_V2.0</h3>
          </div>

          <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
            {/* 1. Gunakan Suspense untuk menangani loading model 3D */}
            <Suspense fallback={null}>
              {/* 2. Stage memberikan pencahayaan otomatis yang bagus */}
              <Stage environment="city" intensity={0.5}>
                {/* 3. Panggil ProductModel CUKUP SATU KALI dengan semua props lengkap */}
                <ProductModel 
                  status={status} 
                  power={power} 
                  isPowerOn={isPowerOn} 
                  setIsPowerOn={setIsPowerOn}
                  // Tambahkan prop baru ini
                  onFingerSuccess={() => {
                    // 1. Validasi: Apakah konfigurasi sudah disimpan?
                    if (!tempConfig) {
                      alert("Silahkan klik Save Configuration di panel kiri terlebih dahulu!");
                      return;
                    }

                    // 2. LOGIKA WAKTU
                    const sekarang = new Date();
                    const jamSekarang = sekarang.getHours();
                    const menitSekarang = sekarang.getMinutes();

                    // Ambil jam dan menit dari batasTapIn (format "HH:mm")
                    const [jamBatas, menitBatas] = batasTapIn.split(':').map(Number);

                    // Tentukan Status Terlambat
                    const isTerlambat = jamSekarang > jamBatas || (jamSekarang === jamBatas && menitSekarang > menitBatas);
                    const statusWaktu = isTerlambat ? "TERLAMBAT" : "TEPAT WAKTU";

                    // 3. LOGIKA PAYROLL (Khusus jika ada data di employeeSettings)
                    // Mencari data karyawan di "database" employeeSettings berdasarkan nama yang diinput
                    const userSetting = employeeSettings.find(emp => emp.nama === tempConfig.nama) || { 
                      gajiPokok: 0, 
                      potonganTerlambat: 0, 
                      bonusTepatWaktu: 0,
                      shift: "Default Shift"
                    };

                    // Kalkulasi Gaji Harian (Contoh: Gaji Pokok / 30 hari)
                    let gajiHariIni = userSetting.gajiPokok > 0 ? userSetting.gajiPokok / 30 : 0;

                    if (isTerlambat) {
                      gajiHariIni -= userSetting.potonganTerlambat;
                    } else {
                      gajiHariIni += userSetting.bonusTepatWaktu;
                    }

                    // 4. BUAT OBJEK DATA BARU
                    const newData = {
                      id: Date.now(),
                      nama: tempConfig.nama,
                      role: tempConfig.role,
                      status: statusWaktu,
                      waktuTap: `${jamSekarang.toString().padStart(2, '0')}:${menitSekarang.toString().padStart(2, '0')}`,
                      nominalGaji: gajiHariIni, // Data gaji masuk ke log
                      shift: userSetting.shift || "Default Shift"
                    };

                    // 5. UPDATE STATE & RESET
                    setResults(prev => [newData, ...prev]);
                    setTempConfig(null); // Reset temp agar tidak bisa tap dua kali dengan data yang sama
                    
                    alert(`Absen Berhasil! \nNama: ${newData.nama} \nStatus: ${statusWaktu} \nEstimasi Gaji Hari Ini: Rp ${gajiHariIni.toLocaleString()}`);
                  }}
                />
              </Stage>
            </Suspense>

            {/* 4. OrbitControls untuk kontrol kamera (zoom/rotate) */}
            <OrbitControls 
              makeDefault 
              minPolarAngle={Math.PI/3} 
              maxPolarAngle={Math.PI/2} 
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

