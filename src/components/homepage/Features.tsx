/* FILE: src/components/homepage/Features.tsx */
import {
  Globe, Shield, Server, Lock, Activity,
  Layers, FileText, ScanEye, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Features() {
  return (
    <div className="w-full max-w-7xl mt-24 mb-20">
      <div className="text-center mb-12 space-y-2">
         <h2 className="text-2xl font-semibold text-white">Surveillance Modules</h2>
         <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <FeatureTile
          icon={<Globe className="w-5 h-5 text-blue-400" />}
          title="Global DNS"
          desc="Resolve records across multiple regions to check propagation."
          color="bg-blue-500/10 border-blue-500/20"
        />
        <FeatureTile
          icon={<Lock className="w-5 h-5 text-emerald-400" />}
          title="SSL Inspection"
          desc="Deep analysis of certificate chains and handshake security."
          color="bg-emerald-500/10 border-emerald-500/20"
        />
        <FeatureTile
          icon={<Server className="w-5 h-5 text-orange-400" />}
          title="Server Recon"
          desc="Pinpoint hosting providers, physical locations and IP info."
          color="bg-orange-500/10 border-orange-500/20"
        />
        <FeatureTile
          icon={<Shield className="w-5 h-5 text-purple-400" />}
          title="Headers & WAF"
          desc="Analyze security headers and detect active firewalls."
          color="bg-purple-500/10 border-purple-500/20"
        />
        <FeatureTile
          icon={<Layers className="w-5 h-5 text-cyan-400" />}
          title="Tech Stack"
          desc="Fingerprint frameworks, CMS, and third-party tools."
          color="bg-cyan-500/10 border-cyan-500/20"
        />
        <FeatureTile
          icon={<Activity className="w-5 h-5 text-yellow-400" />}
          title="Performance"
          desc="Carbon footprint estimation and response time metrics."
          color="bg-yellow-500/10 border-yellow-500/20"
        />
        <FeatureTile
          icon={<FileText className="w-5 h-5 text-indigo-400" />}
          title="SEO & Bots"
          desc="Parse Robots.txt and Sitemaps for crawling rules."
          color="bg-indigo-500/10 border-indigo-500/20"
        />
        <FeatureTile
          icon={<ScanEye className="w-5 h-5 text-pink-400" />}
          title="Whois Data"
          desc="Domain registration details and ownership history."
          color="bg-pink-500/10 border-pink-500/20"
        />
      </div>

      {/* About Button Route */}
      <div className="flex justify-center">
        <Link
          href="/about"
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all text-sm font-medium text-slate-300 hover:text-white"
        >
          <span>System Documentation & Capabilities</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-indigo-400" />
        </Link>
      </div>
    </div>
  );
}

function FeatureTile({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
  return (
    <SpotlightCard className="h-full bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
      <div className="p-6 h-full flex flex-col">
        <div className={`mb-4 p-2.5 w-fit rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </SpotlightCard>
  )
}
