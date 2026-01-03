"use client";

import { motion } from "framer-motion";
import { Github, Rocket, Code2, ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative w-full border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-purple-600/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Ready to get started?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Join thousands of developers using Wibes Check to secure and analyze their web infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://github.com/ekjotsinghmakhija/wibes-check"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/10 text-white font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5 text-purple-400" />
            <span>Deploy your Own</span>
          </a>

          <a
            href="/api"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Code2 className="w-5 h-5 text-blue-400" />
            <span>Use the API</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
