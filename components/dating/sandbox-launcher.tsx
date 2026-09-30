/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PersonProfile } from "@/types";
import {
  Sparkles,
  Flame,
  ArrowRight,
  Loader2,
  MapPin,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SandboxLauncherProps {
  profiles: PersonProfile[];
  initialPersonAId?: string;
  initialPersonBId?: string;
}

const VENUE_PRESETS = [
  "Sunset Rooftop Lounge overlooking Sydney Harbour",
  "Quiet Specialty Coffeehouse in Hayes Valley",
  "Modern Art Gallery After Hours in Chelsea",
  "Fireside Wine Bistro in Montmartre, Paris",
  "Tokyo High-Rise Cocktail Speakeasy with Jazz",
  "Cozy Artisan Espresso Bar in SoHo",
];

export function SandboxLauncher({
  profiles,
  initialPersonAId,
  initialPersonBId,
}: SandboxLauncherProps) {
  const router = useRouter();

  const [personAId, setPersonAId] = useState<string>(
    initialPersonAId || profiles[0]?.id || "",
  );
  const [personBId, setPersonBId] = useState<string>(
    initialPersonBId || (profiles[1]?.id ? profiles[1].id : ""),
  );
  const [venue, setVenue] = useState<string>(VENUE_PRESETS[0]);
  const [customVenue, setCustomVenue] = useState<string>("");
  const [isCustomVenue, setIsCustomVenue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const personA = profiles.find((p) => p.id === personAId);
  const personB = profiles.find((p) => p.id === personBId);

  async function handleSimulate() {
    if (!personAId || !personBId) {
      setError("Please select both agents to simulate a date.");
      return;
    }
    if (personAId === personBId) {
      setError(
        "Please select two distinct people. An agent cannot date themselves!",
      );
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep("Briefing Agent A & Agent B with psychological dossiers...");

    try {
      const stepTimer1 = setTimeout(() => {
        setLoadingStep(
          "Seating agents at venue... simulating conversational chemistry...",
        );
      }, 1800);

      const stepTimer2 = setTimeout(() => {
        setLoadingStep(
          "Testing dealbreakers & calculating mutual alignment verdict...",
        );
      }, 4000);

      const selectedVenue =
        isCustomVenue && customVenue.trim() ? customVenue.trim() : venue;

      const res = await fetch("/api/simulate-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personAId,
          personBId,
          venue: selectedVenue,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Simulation failed. Please try again.");
      }

      setLoadingStep("Date completed! Launching dating debrief...");
      setTimeout(() => {
        router.push(`/dating/${data.date.id}`);
      }, 600);
    } catch (err: any) {
      setError(
        err.message || "An unexpected error occurred during simulation.",
      );
      setLoading(false);
      setLoadingStep("");
    }
  }

  return (
    <Card className="rounded-3xl border-rose-200/60 dark:border-rose-900/40 shadow-xl bg-linear-to-br from-card via-card to-rose-500/5 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <CardTitle className="text-xl font-heading flex items-center gap-2">
                Live Agent Matchmaker Sandbox
              </CardTitle>
              <CardDescription className="text-xs">
                Pair any two people to dispatch their autonomous agents on a
                6-turn date simulation.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-destructive/10 text-destructive text-xs border border-destructive/20 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Agent A Selector */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Agent A (Host)
              </label>
              {personA && (
                <Badge variant="outline" className="text-[10px] bg-background">
                  {personA.analysis.personalityArchetype}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              {personA && (
                <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 border border-primary/20 bg-muted">
                  <Image
                    src={personA.avatarUrl}
                    alt={personA.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <select
                  value={personAId}
                  onChange={(e) => {
                    setPersonAId(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  className="w-full text-sm font-medium rounded-xl border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 truncate"
                >
                  {profiles.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={p.id === personBId}
                    >
                      {p.name} ({p.profession})
                    </option>
                  ))}
                </select>
                {personA && (
                  <p className="text-[11px] text-muted-foreground truncate mt-1">
                    Needs: {personA.analysis.needs.emotional[0]} • Dealbreaker:{" "}
                    {personA.analysis.needs.dealbreakers[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Versus Icon */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
            <div className="h-10 w-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-primary shadow-sm animate-pulse">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-heading text-muted-foreground tracking-widest mt-1">
              VS
            </span>
          </div>

          {/* Agent B Selector */}
          <div className="md:col-span-5 p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Agent B (Guest)
              </label>
              {personB && (
                <Badge variant="outline" className="text-[10px] bg-background">
                  {personB.analysis.personalityArchetype}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              {personB && (
                <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 border border-primary/20 bg-muted">
                  <Image
                    src={personB.avatarUrl}
                    alt={personB.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <select
                  value={personBId}
                  onChange={(e) => {
                    setPersonBId(e.target.value);
                    setError(null);
                  }}
                  disabled={loading}
                  className="w-full text-sm font-medium rounded-xl border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 truncate"
                >
                  {profiles.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      disabled={p.id === personAId}
                    >
                      {p.name} ({p.profession})
                    </option>
                  ))}
                </select>
                {personB && (
                  <p className="text-[11px] text-muted-foreground truncate mt-1">
                    Needs: {personB.analysis.needs.emotional[0]} • Dealbreaker:{" "}
                    {personB.analysis.needs.dealbreakers[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Venue Selection */}
        <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Date Venue & Atmosphere
            </label>
            <button
              type="button"
              onClick={() => setIsCustomVenue(!isCustomVenue)}
              className="text-[11px] text-primary hover:underline font-medium"
            >
              {isCustomVenue ? "Choose preset venue" : "+ Custom venue"}
            </button>
          </div>

          {isCustomVenue ? (
            <input
              type="text"
              placeholder="e.g. Candlelit jazz cellar in Greenwich Village"
              value={customVenue}
              onChange={(e) => setCustomVenue(e.target.value)}
              disabled={loading}
              className="w-full text-sm rounded-xl border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          ) : (
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              disabled={loading}
              className="w-full text-sm rounded-xl border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {VENUE_PRESETS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action Button & Loader */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-muted-foreground">
            {loading ? (
              <span className="flex items-center gap-2 text-primary font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingStep}
              </span>
            ) : (
              <span>
                Generates real-time banter, inner thoughts, and mutual post-date
                verdicts.
              </span>
            )}
          </div>

          <Button
            onClick={handleSimulate}
            disabled={
              loading || !personAId || !personBId || personAId === personBId
            }
            className="w-full sm:w-auto rounded-2xl px-6 py-5 text-sm font-semibold shadow-md bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Simulating Date...
              </>
            ) : (
              <>
                <Flame className="h-4 w-4 mr-2 text-amber-200 fill-amber-200" />
                Simulate Agent Date Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
