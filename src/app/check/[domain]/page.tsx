/* FILE: src/app/check/[domain]/page.tsx */
import Link from "next/link";
import {
  ArrowLeft, ShieldCheck, Server, Globe,
  Lock, LayoutDashboard
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/ui/Logo";

// --- Import All Cards ---
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScreenshotCard } from "@/components/results/ScreenshotCard";
import { SocialCard } from "@/components/results/SocialCard";
import { CarbonCard } from "@/components/results/CarbonCard";
import { SslCard } from "@/components/results/SslCard";
import { HeadersCard } from "@/components/results/HeadersCard";
import { DnsSecCard } from "@/components/results/DnsSecCard";
import { FirewallCard } from "@/components/results/FirewallCard";
import { DnsCard } from "@/components/results/DnsCard";
import { TechStackCard } from "@/components/results/TechStackCard";
import { RedirectsCard } from "@/components/results/RedirectsCard";
import { MailCard } from "@/components/results/MailCard";
import { LinkedPagesCard } from "@/components/results/LinkedPagesCard";
import { RobotsCard } from "@/components/results/RobotsCard";
import { SecurityCard } from "@/components/results/SecurityCard";
import { BlockListCard } from "@/components/results/BlockListCard";
import { ServerStatusCard } from "@/components/results/ServerStatusCard";
import { IpGeoCard } from "@/components/results/IpGeoCard";
import { CookiesCard } from "@/components/results/CookiesCard";
import { ArchivesCard } from "@/components/results/ArchivesCard";
import { SitemapCard } from "@/components/results/SitemapCard";
import { RankCard } from "@/components/results/RankCard";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);

  return (
    <div className="min-h-screen bg-[#020202] text-[#EDEDED] font-sans selection:bg-indigo-500/30 flex flex-col">

      {/* --- Main Layout --- */}
      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto min-h-screen w-full flex-1">

        {/* --- Sidebar (Desktop: Sticky, Mobile: Header) --- */}
        <aside className="w-full lg:w-64 lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#020202] z-40 flex flex-col">
          <div className="p-4 lg:p-6 bg-[#020202]/95 backdrop-blur">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
               <Logo className="w-8 h-8" />
               <span className="font-bold text-white tracking-tight text-lg">Wibes Check</span>
            </div>

            <h1 className="text-xl font-bold text-white break-all leading-tight">{decodedDomain}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-xs font-mono text-emerald-500 font-medium">Live Analysis</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-col gap-1 px-4 lg:px-6 pb-6 overflow-y-auto">
             <NavLink href="#overview" icon={<LayoutDashboard className="w-4 h-4"/>} label="Overview" />
             <NavLink href="#security" icon={<ShieldCheck className="w-4 h-4"/>} label="Security" />
             <NavLink href="#infrastructure" icon={<Server className="w-4 h-4"/>} label="Infrastructure" />
             <NavLink href="#seo" icon={<Globe className="w-4 h-4"/>} label="Content & SEO" />
          </nav>

          {/* Mobile Nav (Sticky Top Bar) */}
          <div className="lg:hidden sticky top-0 z-50 bg-[#020202]/90 backdrop-blur-md border-b border-white/10 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-2 p-2 min-w-max">
               <MobileNavLink href="#overview" label="Overview" />
               <MobileNavLink href="#security" label="Security" />
               <MobileNavLink href="#infrastructure" label="Infrastructure" />
               <MobileNavLink href="#seo" label="SEO" />
            </nav>
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 p-3 md:p-6 lg:p-8 space-y-12 pb-24">

          {/* 1. OVERVIEW */}
          <section id="overview" className="scroll-mt-32 lg:scroll-mt-8 space-y-6">
            <SectionHeader title="Overview" subtitle="High-level summary of the target" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {/* Screenshot: Full width on mobile, 2 cols on desktop */}
              <div className="md:col-span-2 min-h-[250px] aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden relative group">
                <ScreenshotCard domain={decodedDomain} />
              </div>

              {/* Stats: Stack vertical on mobile */}
              <div className="grid grid-cols-1 gap-4">
                 <SpotlightCard className="h-auto">
                    <ServerStatusCard domain={decodedDomain} />
                 </SpotlightCard>

                 <SpotlightCard className="h-auto">
                    <RankCard domain={decodedDomain} />
                 </SpotlightCard>

                 <SpotlightCard className="h-auto">
                    <CarbonCard domain={decodedDomain} />
                 </SpotlightCard>
              </div>
            </div>

            <div className="w-full">
              <SpotlightCard>
                <TechStackCard domain={decodedDomain} />
              </SpotlightCard>
            </div>
          </section>

          {/* 2. SECURITY */}
          <section id="security" className="scroll-mt-32 lg:scroll-mt-8 space-y-6">
             <SectionHeader title="Security Intelligence" subtitle="Vulnerability analysis and configuration" />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <SpotlightCard><SslCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><HeadersCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><FirewallCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><BlockListCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><DnsSecCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><MailCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><CookiesCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard className="md:col-span-2 lg:col-span-3"><SecurityCard domain={decodedDomain} /></SpotlightCard>
             </div>
          </section>

          {/* 3. INFRASTRUCTURE */}
          <section id="infrastructure" className="scroll-mt-32 lg:scroll-mt-8 space-y-6">
             <SectionHeader title="Infrastructure" subtitle="Network topology and server details" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <SpotlightCard><IpGeoCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard><DnsCard domain={decodedDomain} /></SpotlightCard>
               <SpotlightCard className="md:col-span-2"><RedirectsCard domain={decodedDomain} /></SpotlightCard>
             </div>
          </section>

          {/* 4. SEO */}
          <section id="seo" className="scroll-mt-32 lg:scroll-mt-8 space-y-6">
             <SectionHeader title="Content & SEO" subtitle="Crawling rules and page structure" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SpotlightCard><SocialCard domain={decodedDomain} /></SpotlightCard>
                <SpotlightCard><RobotsCard domain={decodedDomain} /></SpotlightCard>
                <SpotlightCard><SitemapCard domain={decodedDomain} /></SpotlightCard>
                <SpotlightCard><ArchivesCard domain={decodedDomain} /></SpotlightCard>
                <SpotlightCard className="md:col-span-2"><LinkedPagesCard domain={decodedDomain} /></SpotlightCard>
             </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}

// --- Responsive Helpers ---

function NavLink({ href, icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

function MobileNavLink({ href, label }: { href: string, label: string }) {
  return (
    <a
      href={href}
      className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-slate-400 whitespace-nowrap hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/30 transition-all"
    >
      {label}
    </a>
  )
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="border-b border-white/5 pb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h2>
      <p className="text-xs md:text-sm text-slate-500 mt-1 font-mono">{subtitle}</p>
    </div>
  )
}
