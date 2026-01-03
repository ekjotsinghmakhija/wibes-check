"use client";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export function CarbonCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/carbon?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return <div className="p-6 h-full animate-pulse"><div className="h-full bg-white/5 rounded" /></div>;

  const grams = data?.statistics?.co2?.grid?.grams?.toFixed(2) || "0.00";
  const cleanerThan = data?.cleanerThan ? (data.cleanerThan * 100).toFixed(0) : "0";

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <div className="mb-4 p-3 rounded-full bg-emerald-500/10 text-emerald-400">
        <Leaf className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold text-white">{grams}g</div>
      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">CO2 per visit</div>
      <div className="mt-3 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
        Cleaner than {cleanerThan}%
      </div>
    </div>
  );
}
