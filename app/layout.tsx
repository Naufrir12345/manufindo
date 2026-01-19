import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import IntroLoader from "./components/IntroLoader"; // Import Loader Baru

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manufindo Cipta Nusantara | AI & IoT Solutions",
  description: "Transformasi industri dan UMKM dengan solusi AI dan IoT cerdas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Loader muncul paling atas */}
        <IntroLoader />
        
        <Navbar />
        
        {/* Tambahkan sedikit transisi pada main content agar tidak kaget */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}