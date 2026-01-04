"use client";
import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

export function RedirectsCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/redirects?domain=${domain}`).then(r => r.json()).then(setData);
  }, [domain]);

  if (!data) return null;

  return (
    <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Redirects</h3>
        <div className="p-2 rounded-lg bg-white/5 text-blue-400">
          <ArrowRightLeft className="w-5 h-5" />
        </div>
      </div>
      <div className="space-y-2 text-xs font-mono">
        {data.redirects?.map((r: any, i: number) => (
            <div key={i} className="flex gap-2">
                <span className="text-gray-500">{r.status}</span>
                <span className="text-gray-300 truncate max-w-[200px]">{r.url}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
