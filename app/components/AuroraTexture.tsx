"use client";
import React from "react";

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#f8fafc]">
        
      {/* Garis Gelombang 1 - Biru */}
      <div 
        className="absolute inset-0 opacity-30 animate-aurora-flow"
        style={{
          backgroundImage: `repeating-linear-gradient(
            110deg,
            #3b82f6 0%,
            #60a5fa 5%,
            transparent 10%,
            transparent 20%
          )`,
          filter: "blur(40px)",
          transform: "skewY(-5deg) scale(1.5)",
        }}
      />

      {/* Garis Gelombang 2 - Ungu (Arah berlawanan) */}
      <div 
        className="absolute inset-0 opacity-20 animate-aurora-flow"
        style={{
          backgroundImage: `repeating-linear-gradient(
            70deg,
            #a855f7 0%,
            transparent 15%,
            #6366f1 25%
          )`,
          filter: "blur(50px)",
          animationDirection: "reverse",
          animationDuration: "20s",
          transform: "skewY(5deg) scale(1.2)",
        }}
      />

      {/* Overlay untuk memperhalus transisi ke konten */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
    </div>
  );
};