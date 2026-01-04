"use client";
import { useEffect, useState } from "react";
import { Mail, Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function MailCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/mail?domain=${domain}`).then(r => r.json()).then(setData);
  }, [domain]);

  if (!data) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Email Security</h3>
        <div className="p-2 rounded-lg bg-white/5 text-yellow-400"><Mail className="w-5 h-5" /></div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">SPF Record</span>
          {data.spf ? <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded">Active</span> : <span className="text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded">Missing</span>}
        </div>
        {data.spf && <div className="text-xs text-gray-500 font-mono bg-black/20 p-2 rounded break-all">{data.spf}</div>}

        <div className="flex justify-between items-center">
          <span className="text-gray-400">DMARC Record</span>
          {data.dmarc ? <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded">Active</span> : <span className="text-gray-500 text-xs bg-white/5 px-2 py-1 rounded">Missing</span>}
        </div>
        {data.dmarc && <div className="text-xs text-gray-500 font-mono bg-black/20 p-2 rounded break-all">{data.dmarc}</div>}
      </div>
    </motion.div>
  );
}
