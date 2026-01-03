"use client";
import { useEffect, useState } from "react";
import { Lock, ShieldAlert, ShieldCheck } from "lucide-react";

export function DnsSecCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/dnssec?domain=${domain}`).then(r => r.json()).then(setData);
  }, [domain]);

  if (!data) return null;

  return (
    <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">DNSSEC</h3>
        <div className={`p-2 rounded-lg bg-white/5 ${data.secure ? "text-emerald-400" : "text-gray-500"}`}>
          {data.secure ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
        </div>
      </div>
      <div className="text-sm">
        {data.secure ? (
          <div className="text-emerald-400 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Signatures Present
          </div>
        ) : (
          <div className="text-gray-500">DNSSEC not enabled</div>
        )}
      </div>
    </div>
  );
}
