"use client";
import useSWR from "swr";
import { History, ExternalLink, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ArchivesCard({ domain }: { domain: string }) {
  const { data, isLoading } = useSWR(`/api/archives?domain=${domain}`, fetcher);

  if (isLoading) return <div className="p-6 text-slate-500 flex gap-2"><Loader2 className="animate-spin w-4 h-4"/> Fetching history...</div>;

  const snapshots = data?.snapshots || [];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold text-white">Archive History</h3>
      </div>

      <div className="space-y-2">
        {snapshots.length === 0 ? (
            <div className="text-sm text-slate-500">No wayback history found.</div>
        ) : (
            snapshots.slice(0, 5).map((snap: any, i: number) => (
                <a
                  key={i}
                  href={snap.viewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group"
                >
                    <div className="text-xs font-mono text-slate-300">
                        {snap.timestamp.substring(0,4)}-{snap.timestamp.substring(4,6)}-{snap.timestamp.substring(6,8)}
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
                </a>
            ))
        )}
      </div>
    </div>
  );
}
