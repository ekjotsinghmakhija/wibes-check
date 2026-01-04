"use client";
import { useEffect, useState } from "react";
import { Share2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

export function SocialCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/social?domain=${domain}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [domain]);

  if (loading) return <div className="p-6 h-full flex flex-col animate-pulse"><div className="h-4 bg-white/10 rounded w-1/2 mb-4" /><div className="flex-1 bg-white/5 rounded" /></div>;
  if (!data || data.error) return null;

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Social & SEO</h3>
        <Share2 className="w-5 h-5 text-pink-400" />
      </div>

      <div className="space-y-4 flex-1">
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/20 h-32 relative group">
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.image} alt="Social Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon className="w-8 h-8" /></div>
          )}
        </div>
        <div>
          <div className="font-medium text-white truncate">{data.title || "No Title"}</div>
          <div className="text-xs text-gray-400 mt-1 line-clamp-2">{data.description || "No description found."}</div>
        </div>
      </div>
    </div>
  );
}
