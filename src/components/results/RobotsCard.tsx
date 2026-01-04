"use client";
import { useEffect, useState } from "react";
import { Bot, FileText, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export function RobotsCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/robots?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return null; // Optional: Show nothing if loading, or use Skeleton

  if (!data?.found) return (
     <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 h-full flex flex-col opacity-50">
        <div className="flex items-center justify-between mb-6"><h3 className="font-medium text-gray-200">Crawling Rules</h3><Bot className="w-5 h-5" /></div>
        <div className="text-sm">No robots.txt found.</div>
     </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Crawling Rules</h3>
        <div className="p-2 rounded-lg bg-white/5 text-cyan-400"><Bot className="w-5 h-5" /></div>
      </div>

      <div className="space-y-2 font-mono text-xs">
         {data.rules.map((rule: any, i: number) => (
             <div key={i} className="flex space-x-2 border-b border-white/5 pb-1 last:border-0">
                 <span className={`uppercase font-semibold ${rule.type === 'Disallow' ? 'text-red-400' : rule.type === 'Allow' ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {rule.type}:
                 </span>
                 <span className="text-gray-300 truncate">{rule.value}</span>
             </div>
         ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-500 flex items-center gap-2">
         <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Standard /robots.txt detected
      </div>
    </motion.div>
  );
}
