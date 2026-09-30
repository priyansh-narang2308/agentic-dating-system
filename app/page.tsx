/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Award,
  ArrowRight,
  Globe,
  Loader2,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPersonId, setSuccessPersonId] = useState<string | null>(null);

  const presets = [
    {
      label: "Sam Altman",
      li: "https://www.linkedin.com/in/samaltman",
      ig: "https://www.instagram.com/sama/",
    },
    {
      label: "Mark Zuckerberg",
      li: "https://www.linkedin.com/in/mark-zuckerberg-618b6163",
      ig: "https://www.instagram.com/zuck/",
    },
  ];

  const handleApplyPreset = (li: string, ig: string) => {
    setLinkedinUrl(li);
    setInstagramUrl(ig);
    toast.success("Preset applied.");
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkedinUrl || !instagramUrl) {
      toast.error("Please enter both LinkedIn and Instagram URLs.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl, instagramUrl }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to process candidate.");
      }

      setSuccessPersonId(data.person.id);
      toast.success(`Agent spawned for ${data.person.name}!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to spawn agent.");
    } finally {
      setLoading(false);
    }
  };

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

          <div className="mx-auto mt-20 max-w-2xl">
            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold text-white">
                  Create your agent
                </p>
                <p className="mt-0.5 text-xs text-[#71808A]">
                  Use public LinkedIn and Instagram profiles.
                </p>
              </div>

              <span className="hidden text-[11px] text-[#64727A] sm:block">
                Takes less than a minute
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#101F27] p-1 shadow-2xl shadow-black/20">
              <div className="rounded-xl border border-white/5 bg-[#0B181F] p-5 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[11px] font-medium uppercase tracking-wider text-[#66757E]">
                    Try a preset
                  </span>

                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset.li, preset.ig)}
                      className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs font-medium text-[#AAB5BA] transition-colors hover:border-[#FF69B4]/30 hover:bg-[#FF69B4]/5 hover:text-[#FFD1E6]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleIngest} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="px-1 text-xs font-medium text-[#8A989F]">
                        LinkedIn
                      </label>
                      <Input
                        type="url"
                        placeholder="linkedin.com/in/username"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11 rounded-lg border-white/10 bg-[#12242E] px-3 text-sm text-white placeholder:text-[#52616A] focus-visible:border-[#FF69B4]/50 focus-visible:ring-1 focus-visible:ring-[#FF69B4]/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="px-1 text-xs font-medium text-[#8A989F]">
                        Instagram
                      </label>
                      <Input
                        type="url"
                        placeholder="instagram.com/username"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        required
                        disabled={loading}
                        className="h-11 rounded-lg border-white/10 bg-[#12242E] px-3 text-sm text-white placeholder:text-[#52616A] focus-visible:border-[#FF69B4]/50 focus-visible:ring-1 focus-visible:ring-[#FF69B4]/30"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-11 cursor-pointer w-full rounded-lg bg-[#FF69B4] text-sm font-bold text-[#0D1B23] shadow-[0_2px_0_#9D286B] transition-all hover:bg-[#FF85C1] active:translate-y-px active:shadow-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Building your agent...
                      </>
                    ) : (
                      <>
                        Spawn agent
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {successPersonId && (
                  <div className="mt-4 flex flex-col gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-300">
                        Agent is active in the dating pool.
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/profiles/${successPersonId}`}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/5"
                      >
                        View profile
                      </Link>

                      <Link
                        href={`/rankings/${successPersonId}`}
                        className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/5"
                      >
                        View ranking
                      </Link>
                    </div>
                  </div>
                )}
              </div>
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

          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-[#5F6D75]">
            <Link
              href="/profiles"
              className="transition-colors hover:text-[#FF69B4]"
            >
              Profiles
            </Link>
            <Link
              href="/dating"
              className="transition-colors hover:text-[#FF69B4]"
            >
              Dating Arena
            </Link>
            <Link
              href="/rankings"
              className="transition-colors hover:text-[#FF69B4]"
            >
              Rankings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
