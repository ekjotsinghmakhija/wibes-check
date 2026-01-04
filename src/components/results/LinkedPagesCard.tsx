"use client";

import { useState } from "react";
import useSWR from "swr";
import { Link2, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LinkedPagesCard({ domain }: { domain: string }) {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');

  const { data, error, isLoading } = useSWR(
    `/api/linked-pages?domain=${domain}`,
    fetcher
  );

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-red-400 space-y-2 h-full min-h-[200px]">
        <AlertCircle className="w-8 h-8" />
        <p className="text-sm font-medium">Failed to crawl pages</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center space-y-4 h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-500 animate-pulse">Crawling site links...</p>
      </div>
    );
  }

  const internalLinks = data?.internal || [];
  const externalLinks = data?.external || [];
  const displayList = activeTab === 'internal' ? internalLinks : externalLinks;

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      {/* Header: Wraps on small screens */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base md:text-lg font-semibold text-white">Linked Pages</h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 self-start sm:self-auto w-full sm:w-auto">
          <TabButton
             active={activeTab === 'internal'}
             onClick={() => setActiveTab('internal')}
             label="Internal"
             count={internalLinks.length}
             color="indigo"
          />
          <TabButton
             active={activeTab === 'external'}
             onClick={() => setActiveTab('external')}
             label="External"
             count={externalLinks.length}
             color="emerald"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar pr-2 space-y-2">
        <AnimatePresence mode="wait">
          {displayList.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {displayList.map((link: string, i: number) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all"
                >
                  <span className="text-xs font-mono text-slate-300 truncate max-w-[85%] group-hover:text-indigo-300 transition-colors">
                    {link}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all hidden sm:block" />
                </a>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm mt-10">
              <p>No {activeTab} links found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2 justify-between text-[10px] uppercase tracking-wider text-slate-600 font-mono">
        <span>Total Scanned: {internalLinks.length + externalLinks.length}</span>
        <span className="hidden sm:inline">{activeTab === 'internal' ? 'Site Architecture' : 'Outbound Connections'}</span>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, count, color }: any) {
    return (
        <button
            onClick={onClick}
            className={`
              flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${active
                ? `${color === 'indigo' ? 'bg-indigo-500 shadow-indigo-500/20' : 'bg-emerald-500 shadow-emerald-500/20'} text-white shadow-lg`
                : 'text-slate-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <span>{label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-black/20 text-white' : 'bg-white/10 text-slate-300'}`}>
              {count}
            </span>
          </button>
    )
}
