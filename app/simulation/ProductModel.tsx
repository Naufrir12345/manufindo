import React, { useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

interface ProductModelProps {
  isPowerOn: boolean;
  setIsPowerOn: (value: boolean) => void;
  onFingerSuccess: () => void;
}

export function ProductModel({ setIsPowerOn, isPowerOn, onFingerSuccess }: ProductModelProps) {
  const { scene } = useGLTF('/models/finger.glb');
  const [isTapping, setIsTapping] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // LOGIKA HOLD FINGERPRINT (2 DETIK)
  const handleFingerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!isPowerOn) return;

    setIsTapping(true);
    let currentProgress = 0;

    timerRef.current = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTapping(false);
        setProgress(0);

        // TRIGGER SIMPAN KE TABEL DISINI
        onFingerSuccess();

        // Opsional: Efek suara atau alert sukses
        console.log("Fingerprint Valid");
      }
    }, 100); // 100ms * 20 kali = 2 detik
  };

  const handleFingerUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTapping(false);
    setProgress(0);
  };

  return (
    /* Rotasi diubah menjadi 0 agar menghadap lurus ke depan, atau sesuaikan sedikit */
    <group scale={2.5} rotation={[0, 0, 0]}>

      {/* 1. MODEL UTAMA */}
      <primitive object={scene} />

      {/* 2. TOMBOL LAMPU HIJAU - Posisi Z ditambah ke 0.25 */}
      <mesh
        position={[1.9, 0.6, 1]}
        onClick={() => setIsPowerOn(true)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={isPowerOn ? "#22c55e" : "#052e16"}
          emissive={isPowerOn ? "#22c55e" : "#000"}
          emissiveIntensity={isPowerOn ? 2 : 0}
        />
      </mesh>

      {/* 3. TOMBOL LAMPU MERAH - Posisi Z ditambah ke 0.25 */}
      <mesh
        position={[1.9, 0.4, 1]}
        onClick={() => setIsPowerOn(false)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={!isPowerOn ? "#ef4444" : "#450a0a"}
          emissive={!isPowerOn ? "#ef4444" : "#000"}
          emissiveIntensity={!isPowerOn ? 2 : 0}
        />
      </mesh>

      {/* 4. SENSOR FINGERPRINT - Posisi Z ditambah ke 0.25 */}
      <mesh
        // Geser sedikit ke kiri (0.15) dan jauhkan ke depan (0.35)
        position={[1.32, -0.35, 1.1]}
        onPointerDown={handleFingerDown}
        onPointerUp={handleFingerUp}
        onPointerOut={handleFingerUp}
      >
        {/* Buat box sedikit lebih besar agar gampang di-tap */}
        <boxGeometry args={[0.6, 0.7, 0.05]} />
        <meshStandardMaterial
          color={isTapping ? "#3b82f6" : "green"} // Ubah ke "red" sementara untuk TESTING
          transparent
          opacity={isTapping ? 0.5 : 0.2} // Ubah ke 0.2 sementara untuk melihat posisinya
        />

        {/* Status Bar Progress */}
        {isTapping && (
          <mesh position={[0, 0.2, 0.02]}>
            <boxGeometry args={[(progress / 100) * 0.2, 0.03, 0.01]} />
            <meshBasicMaterial color="#60a5fa" />
          </mesh>
        )}
      </mesh>
    </group>
  );
}