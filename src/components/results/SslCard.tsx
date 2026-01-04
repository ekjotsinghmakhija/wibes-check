"use client";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, AlertTriangle } from "lucide-react";

export function SslCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ssl?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return <div className="p-6 h-full animate-pulse bg-white/5" />;

  const validTo = data?.cert?.valid_to ? new Date(data.cert.valid_to) : new Date();
  const daysLeft = Math.ceil((validTo.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const secure = data?.authorized;

  return (
    <div className="p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-200">SSL Cert</h3>
        {secure ? <Lock className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
      </div>

      <div className="text-center py-2">
        <div className={`text-sm font-medium ${secure ? "text-emerald-400" : "text-red-400"}`}>
          {secure ? "Valid & Secure" : "Insecure / Expired"}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Issuer: {data?.cert?.issuer?.O || "Unknown"}
        </div>
      </div>

      <div className="mt-4 bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full ${daysLeft > 30 ? "bg-emerald-500" : "bg-orange-500"}`}
          style={{ width: `${Math.min(100, (daysLeft/90)*100)}%` }}
        />
      </div>
      <div className="text-[10px] text-right text-gray-500 mt-1">{daysLeft} days left</div>
    </div>
  );
}
