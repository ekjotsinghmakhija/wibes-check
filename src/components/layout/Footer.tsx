/* FILE: src/components/layout/Footer.tsx */
import { Github, FileText, Shield, Book, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-[#020202] pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Row: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-xs font-medium text-slate-400">
          <Link href="/about#intro" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
            Introduction
          </Link>
          <Link href="/about#modules" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
            Intelligence Modules
          </Link>
          <Link href="/about#resources" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
            External Resources
          </Link>
          <Link href="/about#legal" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
            Legal & Privacy
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-8" />

        {/* Bottom Row: Status & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">

          {/* Left: System Status */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="tracking-wider">SYSTEM OPERATIONAL</span>
          </div>

          {/* Right: License & Credits */}
          <div className="flex flex-wrap justify-center gap-1 text-slate-500">
            <a
              href="https://github.com/ekjotsinghmakhija/wibes-check"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]"
            >
              Wibes Check
            </a>
            <span>is licensed under</span>
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]"
            >
              MIT
            </a>
            <span>-</span>
            <span>©</span>
            <a
              href="https://ekjot.me"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]"
            >
              Ekjot Singh
            </a>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
