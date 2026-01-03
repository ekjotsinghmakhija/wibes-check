"use client";
import { useEffect, useState } from "react";
import { BrickWall } from "lucide-react";

export function FirewallCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/firewall?domain=${domain}`).then(r => r.json()).then(setData);
  }, [domain]);

  if (!data) return null;

  return (
    <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Firewall</h3>
        <div className="p-2 rounded-lg bg-white/5 text-orange-400">
          <BrickWall className="w-5 h-5" />
        </div>
      </div>
      <div className="text-sm font-mono text-gray-300">
        {data.waf}
      </div>
    </div>
  );
}
