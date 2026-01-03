"use client";
import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export function HeadersCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/headers?domain=${domain}`).then(r => r.json()).then(setData);
  }, [domain]);

  if (!data) return <div className="p-6 h-full animate-pulse bg-white/5" />;

  const check = (key: string) => !!data.headers?.[key.toLowerCase()];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-200">Headers</h3>
        <Shield className="w-4 h-4 text-indigo-400" />
      </div>
      <div className="space-y-2 text-xs">
        {['Strict-Transport-Security', 'Content-Security-Policy', 'X-Frame-Options', 'Referrer-Policy'].map(h => (
          <div key={h} className="flex justify-between items-center">
            <span className="text-gray-400 truncate max-w-[120px]">{h}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${check(h) ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              {check(h) ? "Active" : "Missing"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
