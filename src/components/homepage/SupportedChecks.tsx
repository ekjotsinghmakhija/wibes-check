"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const CHECKS = [
  "Archive History", "Block List Check", "Carbon Footprint", "Cookies",
  "DNS Server", "DNS Records", "DNSSEC", "Site Features",
  "Firewall Types", "Get IP Address", "Headers", "HSTS",
  "HTTP Security", "Linked Pages", "Mail Config", "Open Ports",
  "Quality Check", "Global Rank", "Redirects", "Robots.txt",
  "Screenshot", "Security.txt", "Sitemap", "Social Tags",
  "SSL Certificate", "Uptime Status", "Tech Stack", "Known Threats",
  "TLS Version", "Trace Route", "TXT Records", "Whois Lookup"
];

export function SupportedChecks() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Over 30+ Supported Checks
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Analyze key website information in an instant with our comprehensive suite of scanners.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CHECKS.map((check, i) => (
          <motion.div
            key={check}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">
              {check}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
