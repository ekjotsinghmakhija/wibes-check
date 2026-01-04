/* FILE: src/components/results/ScreenshotCard.tsx */
"use client";
import useSWR from "swr";
import { Image as ImageIcon, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ScreenshotCard({ domain }: { domain: string }) {
  const { data, isLoading, error } = useSWR(`/api/screenshot?domain=${domain}`, fetcher);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#0A0A0B] flex flex-col group">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
          <ImageIcon className="w-3 h-3 text-indigo-400" />
          <span className="text-xs font-mono text-white">Live Preview</span>
        </div>
      </div>

      {/* Image Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-slate-500">
             <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
             <span className="text-xs animate-pulse">Capturing snapshot...</span>
          </div>
        ) : error || imgError || !data?.url ? (
          <div className="flex flex-col items-center gap-2 text-slate-600">
            <ImageIcon className="w-10 h-10 opacity-20" />
            <span className="text-sm">Preview unavailable</span>
          </div>
        ) : (
          <img
            src={data.url}
            alt={`Screenshot of ${domain}`}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Action Button */}
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
