"use client";
import useSWR from "swr";
import { Activity, Wifi, WifiOff, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ServerStatusCard({ domain }: { domain: string }) {
  const { data, error, isLoading } = useSWR(`/api/status?domain=${domain}`, fetcher);

  if (isLoading) return <div className="p-6 flex items-center gap-2 text-slate-500"><Loader2 className="animate-spin w-5 h-5" /> Checking status...</div>;
  if (error || !data) return <div className="p-6 text-red-400">Status Check Failed</div>;

  return (
    <div className="p-6 h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h3 className="font-semibold text-white">Server Status</h3>
      </div>

      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${data.online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {data.online ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{data.online ? "Online" : "Offline"}</div>
          <div className="text-xs font-mono text-slate-400">
             Response Time: <span className="text-indigo-300">{data.time}ms</span>
          </div>
          <div className="text-xs font-mono text-slate-500 mt-1">Code: {data.status}</div>
        </div>
      </div>
    </div>
  );
}
