"use client";

import { useEffect, useState } from "react";
import { Shield, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function SecurityCard({ domain }: { domain: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/security-txt?domain=${domain}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [domain]);

  const cardStyle = "p-6 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-colors h-full flex flex-col";

  if (loading) {
    return (
      <div className={cardStyle}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium text-gray-200">Security Policy</h3>
          <Shield className="w-5 h-5 text-blue-400 opacity-50" />
        </div>
        <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
      </div>
    );
  }

  const found = data?.found;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={cardStyle}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-gray-200">Security Policy</h3>
        <div className={`p-2 rounded-lg bg-white/5 ${found ? "text-blue-400" : "text-gray-500"}`}>
          <Shield className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          {found ? (
            <div className="flex items-start space-x-3 mb-4">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-white font-medium">security.txt found</div>
                <div className="text-sm text-gray-400 mt-1 line-clamp-3 font-mono text-xs opacity-70">
                  {data.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-400 mb-4">
              No <code className="bg-white/10 px-1 py-0.5 rounded text-white">security.txt</code> file found on this domain.
            </div>
          )}
        </div>

        {found && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 mt-auto"
          >
            <span>View Full Policy</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
