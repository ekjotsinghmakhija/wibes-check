"use client";
import useSWR from "swr";
import { FileText, Link as LinkIcon, Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SitemapCard({ domain }: { domain: string }) {
  const { data, isLoading } = useSWR(`/api/sitemap?domain=${domain}`, fetcher);

  if (isLoading) return <div className="p-6 text-slate-500 flex gap-2"><Loader2 className="animate-spin w-4 h-4"/> Reading sitemap...</div>;

  const urls = data?.urls || [];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Sitemap Entries</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">{data?.count || 0} URLs</span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[200px] custom-scrollbar space-y-1">
         {urls.length === 0 ? (
             <div className="text-sm text-slate-500 italic">No sitemap.xml found</div>
         ) : (
             urls.map((url: string, i: number) => (
                 <a key={i} href={url} target="_blank" className="block text-xs text-slate-400 hover:text-indigo-400 truncate py-1 border-b border-white/5 last:border-0">
                     {url}
                 </a>
             ))
         )}
      </div>
    </div>
  );
}
