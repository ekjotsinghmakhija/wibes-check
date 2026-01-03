/* FILE: src/components/homepage/ScannerInput.tsx */
"use client";

import { useState } from "react";
import { ArrowRight, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScannerInput() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent, overrideUrl?: string) => {
    e.preventDefault();
    const target = overrideUrl || url;
    if (!target) return;

    setIsLoading(true);
    // Simple regex to clean protocol
    const cleanDomain = target.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    router.push(`/check/${cleanDomain}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <div className="relative group">
        {/* Glowing Gradient Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl opacity-30 blur-md group-hover:opacity-60 transition duration-500" />

        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#0A0A0B]/90 backdrop-blur-xl rounded-xl border border-white/10 p-2 shadow-2xl overflow-hidden"
        >
          <div className="pl-4 pr-3 text-indigo-400">
            <Command className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="ekjot.me"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white h-12 text-lg font-medium placeholder:text-slate-600 font-mono"
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 h-12 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Scan <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>

      {/* Quick Suggestions */}
      <div className="flex justify-center gap-4 mt-6 text-xs font-mono text-slate-500">
        <span className="opacity-50">TRY:</span>
        {['ekjot.me', 'google.com', 'openai.com'].map((domain) => (
          <button
            key={domain}
            onClick={(e) => handleSubmit(e as any, domain)}
            className="hover:text-indigo-400 transition-colors border-b border-transparent hover:border-indigo-400/50"
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
}
