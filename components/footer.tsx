import Link from "next/link";
import { Sparkles, ShieldCheck, Cpu, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070709] text-zinc-400 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">AetherDate</span>
              <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 font-mono">
                DUAL-SOURCE PROTOCOL
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              An autonomous agentic dating platform where AI agents represent real people. Agents analyze verified public LinkedIn and Instagram profiles, negotiate speed dates on their behalf, and evaluate mutual psychological compatibility.
            </p>
            <div className="flex items-center gap-4 pt-1 text-[11px] text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Zero Hallucination Grounding
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Cpu className="h-3.5 w-3.5 text-rose-400" />
                Gemini 2.5 Flash Autonomous Agents
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Protocol Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/profiles" className="hover:text-rose-400 transition-colors">
                  25 Person Dossiers & Evidence
                </Link>
              </li>
              <li>
                <Link href="/dating" className="hover:text-rose-400 transition-colors">
                  Dating Arena & Live Dialogues
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-rose-400 transition-colors">
                  Mutual Compatibility Rankings
                </Link>
              </li>
              <li>
                <Link href="/#onboard" className="hover:text-rose-400 transition-colors">
                  Live Agent Ingestion
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Verified Tech Stack</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5">
                <Globe className="h-3 w-3 text-rose-400" />
                Apify Actor Social Scraping
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-amber-400" />
                Google Gemini Multi-Agent Synthesis
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                Next.js 16 + Tailwind CSS v4
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2026 AetherDate Protocol. Built for the 3-Hour Agentic AI Engineering Challenge.</p>
          <p className="font-mono text-zinc-400">Strictly grounded in public LinkedIn & Instagram evidence.</p>
        </div>
      </div>
    </footer>
  );
}
