"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export function DnsCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/dns?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return <div className="p-6 h-full animate-pulse bg-white/5" />;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-200">DNS Records</h3>
        <Globe className="w-4 h-4 text-blue-400" />
      </div>
      <div className="space-y-3 text-xs font-mono text-gray-400 overflow-y-auto max-h-[200px] scrollbar-hide">
        {data?.a?.map((ip: string, i: number) => (
          <div key={i} className="flex justify-between border-b border-white/5 pb-1">
            <span>A</span> <span className="text-gray-300">{ip}</span>
          </div>
        ))}
        {data?.mx?.map((mx: any, i: number) => (
          <div key={i} className="flex justify-between border-b border-white/5 pb-1">
            <span>MX</span> <span className="text-gray-300 truncate max-w-[150px]">{mx.exchange}</span>
          </div>
        ))}
        {data?.ns?.map((ns: string, i: number) => (
          <div key={i} className="flex justify-between border-b border-white/5 pb-1">
            <span>NS</span> <span className="text-gray-300 truncate max-w-[150px]">{ns}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
