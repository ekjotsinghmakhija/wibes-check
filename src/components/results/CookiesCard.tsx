"use client";
import useSWR from "swr";
import { Cookie, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CookiesCard({ domain }: { domain: string }) {
  const { data, error, isLoading } = useSWR(`/api/cookies?domain=${domain}`, fetcher);

  if (isLoading) return <div className="p-6 text-slate-500 flex gap-2"><Loader2 className="animate-spin w-4 h-4"/> Scanning cookies...</div>;

  const count = data?.count || 0;
  const cookies = data?.cookies || [];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">Cookies</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">{count} Found</span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[200px] custom-scrollbar space-y-2">
         {count === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                 <CheckCircle className="w-8 h-8 mb-2 opacity-20" />
                 No cookies detected
             </div>
         ) : (
             cookies.map((c: any, i: number) => (
                 <div key={i} className="p-3 rounded bg-white/5 border border-white/5 text-xs break-all">
                     <span className="text-indigo-300 font-bold">{c.name}</span>
                     <span className="text-slate-500 mx-1">=</span>
                     <span className="text-slate-300">{c.value}</span>
                 </div>
             ))
         )}
      </div>
    </div>
  );
}
