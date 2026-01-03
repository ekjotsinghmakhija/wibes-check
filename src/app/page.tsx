/* FILE: src/app/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import { Hero } from "@/components/homepage/Hero";
import { ScannerInput } from "@/components/homepage/ScannerInput";
import { Features } from "@/components/homepage/Features";
import { Footer } from "@/components/layout/Footer"; // Import the new footer

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#050505] to-black" />
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-32 px-4">
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <ScannerInput />
        </motion.div>

        <Features />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
