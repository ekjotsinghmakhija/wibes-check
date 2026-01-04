"use client";
import useSWR from "swr";
import { MapPin, Server, Globe, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function IpGeoCard({ domain }: { domain: string }) {
  const { data, error, isLoading } = useSWR(`/api/ip-geo?domain=${domain}`, fetcher);

  if (isLoading) return <div className="p-6 text-slate-500 flex gap-2"><Loader2 className="animate-spin w-4 h-4"/> Locating server...</div>;
  if (error) return <div className="p-6 text-red-400">Location data unavailable</div>;

  return (
    <div className="p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-orange-400" />
        <h3 className="font-semibold text-white">Server Location</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-indigo-500/10 rounded text-indigo-400">
                <Globe className="w-4 h-4" />
            </div>
            <div>
                <div className="text-sm text-slate-400">IP Address</div>
                <div className="text-white font-mono text-sm">{data.ip || "N/A"}</div>
            </div>
        </div>

        <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-emerald-500/10 rounded text-emerald-400">
                <MapPin className="w-4 h-4" />
            </div>
            <div>
                <div className="text-sm text-slate-400">Location</div>
                <div className="text-white text-sm">
                    {data.city}, {data.regionName} ({data.countryCode})
                </div>
            </div>
        </div>

        <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-purple-500/10 rounded text-purple-400">
                <Server className="w-4 h-4" />
            </div>
            <div>
                <div className="text-sm text-slate-400">ISP / Organization</div>
                <div className="text-white text-sm">{data.isp}</div>
                <div className="text-xs text-slate-500">{data.as}</div>
            </div>
        </div>
      </div>
    </div>
  );
}
