"use client";
import { useEffect, useState } from "react";
import { Layers } from "lucide-react";

export function TechStackCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tech-stack?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return <div className="p-6 h-full animate-pulse"><div className="h-full bg-white/5 rounded" /></div>;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 text-gray-200 font-medium">
        <Layers className="w-4 h-4 text-cyan-400" /> Tech Stack
      </div>
      <div className="flex flex-wrap gap-2 content-start">
        {data?.stack?.length > 0 ? (
          data.stack.map((tech: any, i: number) => (
            <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-300 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              {tech.name}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No tech detected</span>
        )}
      </div>
    </div>
  );
}
