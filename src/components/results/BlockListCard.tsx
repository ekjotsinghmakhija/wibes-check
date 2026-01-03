"use client";
import { useEffect, useState } from "react";
import { ShieldCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

export function BlockListCard({ domain }: { domain: string }) {
  const [loading, setLoading] = useState(true);

  // Fake loading for visual consistency since the API is simulated
  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  if (loading) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Block Lists</h3>
        <div className="p-2 rounded-lg bg-white/5 text-emerald-400"><ShieldCheck className="w-5 h-5" /></div>
      </div>

      <div className="space-y-3">
         {['Google Safe Browsing', 'Norton Family', 'McAfee', 'Spamhaus'].map((name) => (
             <div key={name} className="flex justify-between items-center text-sm">
                <span className="text-gray-400">{name}</span>
                <span className="text-emerald-400 flex items-center gap-1 text-xs bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Check className="w-3 h-3" /> Safe
                </span>
             </div>
         ))}
      </div>
    </motion.div>
  );
}
