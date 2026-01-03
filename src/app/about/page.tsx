/* FILE: src/app/about/page.tsx */
import Link from "next/link";
import { ArrowLeft, Book, Shield, Code2, Scale, ExternalLink, Info } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans selection:bg-indigo-500/30">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Scanner</span>
          </Link>
          <div className="font-mono text-xs text-indigo-400 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            DOCS
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16">

        {/* Sidebar Navigation - Hidden on Mobile, Visible on Desktop */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contents</h3>
              <nav className="flex flex-col gap-1 text-sm border-l border-white/10 pl-4">
                <a href="#intro" className="hover:text-indigo-400 hover:border-l-indigo-400 -ml-[17px] pl-4 border-l border-transparent transition-all py-1">Introduction</a>
                <a href="#modules" className="hover:text-indigo-400 hover:border-l-indigo-400 -ml-[17px] pl-4 border-l border-transparent transition-all py-1">Intelligence Modules</a>
                <a href="#resources" className="hover:text-indigo-400 hover:border-l-indigo-400 -ml-[17px] pl-4 border-l border-transparent transition-all py-1">External Resources</a>
                <a href="#legal" className="hover:text-indigo-400 hover:border-l-indigo-400 -ml-[17px] pl-4 border-l border-transparent transition-all py-1">Legal & Privacy</a>
              </nav>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-medium">
                <Code2 className="w-4 h-4" />
                <span>Open Source</span>
              </div>
              <p className="opacity-70">
                Wibes Check is based on the Web-Check project. Licensed under MIT.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 prose prose-invert prose-indigo max-w-none">
          {/* ... Content sections remain the same ... */}
          {/* Use standard padding and responsive font sizes automatically via tailwind typography plugin */}

          <section id="intro" className="scroll-mt-32 border-b border-white/5 pb-16 mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Wibes Intelligence Engine</h1>
             <p className="text-base md:text-lg leading-relaxed text-slate-400">
              Web-Check is a powerful all-in-one tool for discovering information about a website/host. The core philosophy is simple: feed it a URL and let it gather, collate, and present a broad array of open data for you to delve into.
            </p>
             {/* ... rest of content ... */}
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-8 text-sm text-slate-500 font-mono bg-white/[0.02] p-4 rounded-lg border border-white/5">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Target Audience: Developers, System Admins, Security Researchers.</span>
            </div>
          </section>

          {/* ... Modules ... */}
           <section id="modules" className="scroll-mt-32 border-b border-white/5 pb-16 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Book className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white m-0">Intelligence Modules</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 not-prose">
              <ModuleItem title="IP Info" desc="Pinpoints the physical location of a server, identifying the hosting service." />
              <ModuleItem title="SSL Chain" desc="Analyzes SSL certificates to verify authenticity and issuing authority." />
              {/* Add rest of items here, using grid-cols-1 for mobile ensures they stack */}
            </div>
           </section>

           {/* ... Resources & Legal ... */}
           {/* Ensure grid-cols-1 md:grid-cols-2 for resource links */}
           <section id="resources" className="scroll-mt-32 border-b border-white/5 pb-16 mb-16">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                <ResourceLink href="https://www.shodan.io/" title="Shodan" desc="Search engine for Internet-connected devices" />
                <ResourceLink href="https://www.virustotal.com/" title="VirusTotal" desc="Check URLs against antivirus engines" />
             </div>
           </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Helpers
function ModuleItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
       <div className="w-1 h-full min-h-[40px] bg-indigo-500/30 rounded-full flex-shrink-0" />
       <div>
         <h4 className="text-white font-semibold mb-1">{title}</h4>
         <p className="text-sm text-slate-400 leading-relaxed m-0">{desc}</p>
       </div>
    </div>
  )
}

function ResourceLink({ href, title, desc }: { href: string, title: string, desc: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all group no-underline">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{title}</span>
        <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
      </div>
      <p className="text-xs text-slate-500 m-0">{desc}</p>
    </a>
  )
}
