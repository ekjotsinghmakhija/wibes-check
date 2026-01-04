"use client";
import useSWR from "swr";
import { BarChart3, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RankCard({ domain }: { domain: string }) {
  const { data, isLoading } = useSWR(`/api/rank?domain=${domain}`, fetcher);

  return (
    <div className="p-6 h-full flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold text-white">Global Rank</h3>
      </div>

      {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
      ) : (
          <div>
            <div className="text-xl font-bold text-white tracking-tight">
                {data?.rank || "N/A"}
            </div>
            <div className="text-xs text-slate-500 mt-1">Source: {data?.provider}</div>
          </div>
      )}
    </div>
  );
}
