/* FILE: src/components/homepage/Hero.tsx */
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
  return (
    <div className="w-full max-w-4xl text-center space-y-8 mb-12 flex flex-col items-center px-4">

      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Logo className="w-20 h-20 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(91,77,255,0.5)]" />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]"
      >
        <Sparkles className="w-3 h-3" />
        <span>Wibes Intelligence Engine </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Adjusted Responsive Text Sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
          Scan any <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 animate-gradient-x text-glow">
            Web Infrastructure.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
          Instantly reveal DNS records, server locations, SSL chains, and security headers.
          <span className="block mt-2 text-slate-200">The developer-first OSINT tool.</span>
        </p>
      </motion.div>
    </div>
  );
}
