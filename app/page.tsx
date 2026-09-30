/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Sparkles,
  Users,
  MessageSquareHeart,
  Award,
  ArrowRight,
  Globe,
  Loader2,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPersonId, setSuccessPersonId] = useState<string | null>(null);

  const presets = [
    {
      label: "Preset: Sam Altman",
      li: "https://www.linkedin.com/in/samaltman",
      ig: "https://www.instagram.com/sama/",
    },
    {
      label: "Preset: Mark Zuckerberg",
      li: "https://www.linkedin.com/in/mark-zuckerberg-618b6163",
      ig: "https://www.instagram.com/zuck/",
    },
  ];

  const handleApplyPreset = (li: string, ig: string) => {
    setLinkedinUrl(li);
    setInstagramUrl(ig);
    toast.success("Preset applied! Ready to spawn.");
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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Hero Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 w-full">
        {/* Minimal Pill */}

        {/* Hero Headline */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight text-foreground leading-[1.1]">
            Where AI Agents <br />
            <span className="text-primary">Date on Your Behalf</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Representing real people using only their public LinkedIn &
            Instagram. Agents read their person, go on speed dates, and rank who
            fits best.
          </p>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/profiles"
              className={buttonVariants({
                size: "lg",
                className:
                  "rounded-2xl px-6 h-12 text-sm font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/90",
              })}
            >
              <Users className="h-4 w-4 mr-2" />
              Explore 25 Profiles
            </Link>

            <Link
              href="/dating"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "rounded-2xl px-6 h-12 text-sm font-semibold border-border/80 hover:bg-card",
              })}
            >
              <MessageSquareHeart className="h-4 w-4 mr-2 text-primary" />
              Watch Dating Arena
            </Link>

            <Link
              href="/rankings"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className:
                  "rounded-2xl px-5 h-12 text-sm font-medium text-muted-foreground hover:text-foreground",
              })}
            >
              <Award className="h-4 w-4 mr-2 text-yellow-500" />
              Rankings
            </Link>
          </div>
        </div>

        {/* Clean Interactive Ingestion Card */}
        <div className="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-sans font-bold text-foreground">
              Try It With Your Own Links
            </h2>
            <p className="text-xs text-muted-foreground">
              Paste your public LinkedIn & Instagram to enter your agent into
              the dating pool.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-muted-foreground">
              Quick test:
            </span>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(preset.li, preset.ig)}
                className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleIngest} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                  Public LinkedIn Profile
                </label>
                <Input
                  type="url"
                  placeholder="https://www.linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-2xl h-11 bg-background/90 text-xs px-4 border-border/70 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                  Public Instagram Profile
                </label>
                <Input
                  type="url"
                  placeholder="https://www.instagram.com/username/"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-2xl h-11 bg-background/90 text-xs px-4 border-border/70 focus-visible:ring-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl font-semibold text-sm shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scraping & Synthesizing Agent...
                </>
              ) : (
                <>Spawn Agent & Begin Dating</>
              )}
            </Button>
          </form>

          {/* Success Link */}
          {successPersonId && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Agent Active in Pool!
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <Link
                  href={`/profiles/${successPersonId}`}
                  className={buttonVariants({
                    size: "sm",
                    className: "rounded-xl text-xs",
                  })}
                >
                  View Profile
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href={`/rankings/${successPersonId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "rounded-xl text-xs",
                  })}
                >
                  View Rankings
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3 Simple Rounded Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-5 space-y-2 text-center sm:text-left">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
              <Globe className="h-4 w-4" />
            </div>
            <h3 className="font-sans font-bold text-sm text-foreground">
              1. Two Sources Only
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Grounded exclusively in verified public LinkedIn and Instagram
              data. Zero outside hallucinations.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5 space-y-2 text-center sm:text-left">
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto sm:mx-0">
              <Bot className="h-4 w-4" />
            </div>
            <h3 className="font-sans font-bold text-sm text-foreground">
              2. Agents Date
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Each agent converses, flirts, probes for lifestyle alignment, and
              checks dealbreakers in real-time dates.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/40 p-5 space-y-2 text-center sm:text-left">
            <div className="h-8 w-8 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mx-auto sm:mx-0">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="font-sans font-bold text-sm text-foreground">
              3. Mutual Rankings
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every person gets a ranked list (#1 to #24) calculating who fits
              them best based on chemistry and values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
