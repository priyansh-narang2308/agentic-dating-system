"use client";

import Link from "next/link";
import { Award, Globe, Bot } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0D1B23] text-white">
      <Navbar />

      <section className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(255,105,180,0.10),transparent_65%)]" />
          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-size-[48px_48px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance font-sans text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-[#F8DDEB] sm:text-7xl lg:text-8xl">
              Let your AI
              <br />
              <span className="text-[#FF69B4]">date for you.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#9DAAB1] sm:text-lg">
              DateMe creates an AI agent from your public profile, puts it into
              real conversations, and finds the people you actually match with.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/profiles"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FF69B4] px-5 text-sm font-bold text-[#0D1B23] shadow-[0_3px_0_#9D286B] transition-all hover:bg-[#FF85C1] active:translate-y-[2px] active:shadow-none"
              >
                Explore profiles
              </Link>

              <Link
                href="/dating"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/3 px-5 text-sm font-medium text-[#D5DDE1] transition-colors hover:border-[#FF69B4]/30 hover:bg-[#FF69B4]/5 hover:text-white"
              >
                Enter dating arena
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-4xl border-y border-white/5">
            <div className="grid divide-y divide-white/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="px-6 py-7 text-center sm:text-left">
                <Globe className="mx-auto mb-4 h-4 w-4 text-[#FF69B4] sm:mx-0" />
                <p className="text-sm font-semibold text-white">
                  Public data only
                </p>
                <p className="mt-1.5 text-xs leading-5 text-[#71808A]">
                  Grounded in the LinkedIn and Instagram profiles you provide.
                </p>
              </div>

              <div className="px-6 py-7 text-center sm:text-left">
                <Bot className="mx-auto mb-4 h-4 w-4 text-[#FF69B4] sm:mx-0" />
                <p className="text-sm font-semibold text-white">
                  Agents do the talking
                </p>
                <p className="mt-1.5 text-xs leading-5 text-[#71808A]">
                  Agents explore chemistry, lifestyle and compatibility.
                </p>
              </div>

              <div className="px-6 py-7 text-center sm:text-left">
                <Award className="mx-auto mb-4 h-4 w-4 text-[#FF69B4] sm:mx-0" />
                <p className="text-sm font-semibold text-white">
                  Compatibility rankings
                </p>
                <p className="mt-1.5 text-xs leading-5 text-[#71808A]">
                  See who each agent connects with across the dating pool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
