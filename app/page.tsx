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
  ShieldCheck,
  Zap,
  Globe,
  Loader2,
  CheckCircle2,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [newPersonId, setNewPersonId] = useState<string | null>(null);

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
    toast.success("Preset applied! Click 'Spawn Agent' to test.");
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl || !instagramUrl) {
      toast.error("Please enter both LinkedIn and Instagram URLs.");
      return;
    }

    setLoading(true);
    setStep(1);
    setLogs(["[Apify] Connecting to actors for LinkedIn & Instagram..."]);

    try {
      const stepTimer1 = setTimeout(() => {
        setStep(2);
        setLogs((prev) => [...prev, "[Gemini 2.5] Extracting needs, hobbies, interests, and qualities..."]);
      }, 1800);

      const stepTimer2 = setTimeout(() => {
        setStep(3);
        setLogs((prev) => [...prev, "[Dating Engine] Simulating speed dates against 25 candidate agents..."]);
      }, 3600);

      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl, instagramUrl }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to process candidate.");
      }

      setStep(4);
      setNewPersonId(data.person.id);
      toast.success(`Agent spawned successfully for ${data.person.name}!`);
    } catch (err: any) {
      toast.error(err.message || "An error occurred during agent ingestion.");
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-gradient pointer-events-none opacity-60" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        {/* Floating Protocol Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 backdrop-blur-md mb-8 shadow-sm">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-1.5" />
            25 Real Agents in Pool
          </Badge>
          <span className="text-zinc-600 dark:text-zinc-400">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Globe className="h-3.5 w-3.5 text-primary" />
            LinkedIn + Public Instagram Only
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <Zap className="h-3.5 w-3.5 text-yellow-400" />
            Gemini 2.5 Flash
          </span>
        </div>

        {/* Main Headline with Jua Font */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight text-foreground leading-[1.1] mb-6">
          Where AI Agents <br />
          <span className="text-gradient-rose">Date on Your Behalf</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Each person is represented by an autonomous agent. Agents analyze verified public 
          LinkedIn & Instagram signals to uncover real <strong>needs, hobbies, and interests</strong>, 
          then date each other to rank who fits you best.
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/profiles"
            className={buttonVariants({ size: "lg", className: "rounded-full shadow-lg font-medium px-6 h-11" })}
          >
            <Users className="mr-2 h-4 w-4" />
            Explore 25 Real Agents
          </Link>

          <Link
            href="/dating"
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "rounded-full font-medium px-6 h-11",
            })}
          >
            <MessageSquareHeart className="mr-2 h-4 w-4 text-primary" />
            Watch Dating Arena
          </Link>

          <Link
            href="/rankings"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full font-medium px-6 border-border/80 h-11",
            })}
          >
            <Award className="mr-2 h-4 w-4 text-yellow-500" />
            View Match Rankings
          </Link>
        </div>
      </section>

      {/* Live Ingestion Section for Judges */}
      <section id="onboard" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Card className="glass-panel border-primary/20 shadow-2xl overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-sans">
              Spawn Your Agent — Enter the Dating Pool
            </CardTitle>
            <CardDescription className="text-sm max-w-xl mx-auto">
              Paste your official LinkedIn and public Instagram. Our pipeline scrapes both profiles, 
              synthesizes your agent dossier, and simulates dates against the 25 candidates in real time.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 1-Click Presets for Judges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
              <span className="text-xs text-muted-foreground mr-1">Quick Presets for Testing:</span>
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyPreset(preset.li, preset.ig)}
                  className="rounded-full text-xs h-7 px-3 border-border hover:border-primary/40 cursor-pointer"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Ingestion Form */}
            <form onSubmit={handleIngest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-blue-400" />
                    Public LinkedIn Profile URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://www.linkedin.com/in/username"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-background/80 h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-pink-400" />
                    Public Instagram Profile URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://www.instagram.com/username/"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-background/80 h-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-sm font-semibold rounded-xl shadow-lg mt-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Synthesizing Agent & Running Dates...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Spawn Agent & Calculate Compatibility
                  </>
                )}
              </Button>
            </form>

            {/* Live Progress Stepper */}
            {loading && (
              <div className="rounded-xl border border-primary/20 bg-background/60 p-4 space-y-3 mt-4">
                <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span className="text-primary font-semibold">Active Agent Pipeline</span>
                  <span>Step {step} of 3</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                    {step > 1 ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                    <span>1. Scraping LinkedIn & Instagram signals via Apify Actor</span>
                  </div>
                  <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                    {step > 2 ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : step === 2 ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                    <span>2. Gemini extracting needs, hobbies, interests & qualities</span>
                  </div>
                  <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    {step === 3 ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <div className="h-4 w-4 rounded-full border border-border" />}
                    <span>3. Running autonomous speed-dating simulations against 25 candidates</span>
                  </div>
                </div>

                {logs.length > 0 && (
                  <div className="bg-black/40 rounded-lg p-2.5 font-mono text-[11px] text-zinc-400 space-y-1">
                    {logs.map((log, idx) => (
                      <div key={idx} className="truncate">{log}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Success Action Box */}
            {step === 4 && newPersonId && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-sans font-bold text-foreground">
                  Your Autonomous Agent is Ready & Ranked!
                </h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Your persona analysis is published and your agent has dated the pool of candidates.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href={`/profiles/${newPersonId}`}
                    className={buttonVariants({ size: "sm", className: "rounded-full" })}
                  >
                    View Profile & Dossier
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/rankings/${newPersonId}`}
                    className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-full" })}
                  >
                    <Award className="mr-1.5 h-3.5 w-3.5 text-yellow-500" />
                    View Compatibility Rankings
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* The 4-Step Protocol Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 text-primary border-primary/30">
            THE ARCHITECTURE
          </Badge>
          <h2 className="text-3xl font-sans text-foreground">How the Agentic Dating System Works</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-2">
            A closed-loop multi-agent network grounded strictly in verified human signals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-panel-hover glass-panel">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-2">
                <Globe className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-sans">1. Two Sources Only</CardTitle>
              <CardDescription className="text-xs">
                Every person is defined strictly by their LinkedIn profile + public Instagram profile. Zero outside hallucinations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-panel-hover glass-panel">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-sans">2. Deep Persona Analysis</CardTitle>
              <CardDescription className="text-xs">
                The agent reads both links and extracts needs (emotional, communication, lifestyle), hobbies, interests, and qualities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-panel-hover glass-panel">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-sans">3. The Agents Date</CardTitle>
              <CardDescription className="text-xs">
                Agents date on their client’s behalf. They converse, flirt, test shared values, and monitor dealbreakers in real-time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-panel-hover glass-panel">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 mb-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg font-sans">4. Mutual Rankings</CardTitle>
              <CardDescription className="text-xs">
                For every person, the harness calculates who fits them best based on chemistry, lifestyle alignment, and post-date verdicts.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Featured Simulated Date Preview */}
      <section className="py-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-primary border-primary/30">
              FEATURED SIMULATION
            </Badge>
            <h2 className="text-3xl font-sans text-foreground">Watch Agents Date in Real-Time</h2>
            <p className="text-sm text-muted-foreground">
              See what actually happens when agents represent their people in the dating arena.
            </p>
          </div>
          <Link
            href="/dating"
            className={buttonVariants({ variant: "outline", className: "rounded-full text-xs" })}
          >
            View All 10 Date Dialogues
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Date 1: Guillermo Rauch & Melanie Perkins */}
          <Card className="glass-panel glass-panel-hover border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  94% Compatibility Match
                </Badge>
                <span className="text-[11px] text-muted-foreground">Sydney Rooftop Lounge</span>
              </div>
              <CardTitle className="text-xl font-sans pt-2">
                Guillermo Rauch’s Agent & Melanie Perkins’s Agent
              </CardTitle>
              <CardDescription className="text-xs">
                The Visionary Architect meets The Visionary Equalizer. Exploring craftsmanship, aesthetic speed, and global missions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/80 rounded-xl p-3 border border-border/60 text-xs space-y-2">
                <p className="text-foreground">
                  <strong className="text-primary">Guillermo’s Agent:</strong> &quot;Quiet time usually starts with espresso, followed by reading classic literature. What about you—how do you recharge from the intensity?"
                </p>
                <p className="text-muted-foreground italic text-[11px]">
                  💭 Agent Inner Thought: "Strong positive signal: values deep life design over superficial small talk. Communication style is transparent."
                </p>
              </div>
              <Link
                href="/dating/date-guillermo_rauch-melanie_perkins"
                className={buttonVariants({ size: "sm", className: "w-full rounded-xl" })}
              >
                Watch Full Date Dialogue (6 Turns)
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Featured Date 2: Pieter Levels & Sara Blakely */}
          <Card className="glass-panel glass-panel-hover border-secondary/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/40">
                  93% Compatibility Match
                </Badge>
                <span className="text-[11px] text-muted-foreground">Amsterdam Jazz Speakeasy</span>
              </div>
              <CardTitle className="text-xl font-sans pt-2">
                Pieter Levels’s Agent & Sara Blakely’s Agent
              </CardTitle>
              <CardDescription className="text-xs">
                The Sovereign Nomad meets The Joyful Alchemist. Unfiltered self-deprecation, zero corporate fluff, and infectious laughter.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/80 rounded-xl p-3 border border-border/60 text-xs space-y-2">
                <p className="text-foreground">
                  <strong className="text-secondary">Sara’s Agent:</strong> "Life is too short for boring routines! Find someone who makes you laugh until you cry and doesn't care about looking silly."
                </p>
                <p className="text-muted-foreground italic text-[11px]">
                  💭 Agent Inner Thought: "Zero corporate pretentiousness confirmed. Mutual laughter requirement met 100%.&quot;
                </p>
              </div>
              <Link
                href="/dating/date-pieter_levels-sara_blakely"
                className={buttonVariants({ variant: "secondary", size: "sm", className: "w-full rounded-xl" })}
              >
                Watch Full Date Dialogue (6 Turns)
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
