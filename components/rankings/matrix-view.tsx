"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PersonRanking, PersonProfile } from "@/types";
import { Flame, MessageCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

interface MatrixViewProps {
  rankings: PersonRanking[];
  profiles: PersonProfile[];
}

export function MatrixView({ rankings, profiles }: MatrixViewProps) {
  const [selectedPair, setSelectedPair] = useState<{
    personA: PersonProfile;
    personB: PersonProfile;
    score: number;
    synergies: string[];
    potentialRisks: string[];
  } | null>(null);

  // Helper to get mutual score
  function getScore(p1Id: string, p2Id: string): number {
    if (p1Id === p2Id) return 0;
    const r = rankings.find((item) => item.personId === p1Id);
    const m = r?.matches.find((match) => match.targetPersonId === p2Id);
    return m ? m.compatibilityScore : 70;
  }

  function handleCellClick(personA: PersonProfile, personB: PersonProfile) {
    if (personA.id === personB.id) return;
    const r = rankings.find((item) => item.personId === personA.id);
    const m = r?.matches.find((match) => match.targetPersonId === personB.id);

    setSelectedPair({
      personA,
      personB,
      score: m?.compatibilityScore || 75,
      synergies: m?.synergies || ["Aligned lifestyle and ambition"],
      potentialRisks: m?.potentialRisks || ["Busy schedules"],
    });
  }

  return (
    <div className="space-y-6">
      {/* Description banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <span>
            Hover or click any cell to inspect mutual compatibility between any
            two autonomous agents.
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />
            High Fit (80-100%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-400/40" />
            Medium Fit (70-79%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-muted/60" />
            Lower Fit (&lt;70%)
          </span>
        </div>
      </div>

      {/* Selected Pair Quick Drawer if clicked */}
      {selectedPair && (
        <Card className="rounded-2xl border-rose-300 dark:border-rose-800 bg-card p-5 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center -space-x-3">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-background shadow-sm">
                  <Image
                    src={selectedPair.personA.avatarUrl}
                    alt={selectedPair.personA.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-background shadow-sm">
                  <Image
                    src={selectedPair.personB.avatarUrl}
                    alt={selectedPair.personB.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-heading text-sm sm:text-base">
                  {selectedPair.personA.name} & {selectedPair.personB.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Synergy: {selectedPair.synergies[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Flame className="h-4 w-4 fill-current" />
                {selectedPair.score}% Match
              </div>

              <Link
                href={`/dating?personA=${selectedPair.personA.id}&personB=${selectedPair.personB.id}`}
                className={buttonVariants({
                  size: "sm",
                  className:
                    "rounded-xl text-xs font-semibold bg-primary text-primary-foreground",
                })}
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                Simulate Date
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
        <div className="min-w-[950px]">
          {/* Top Axis Header (Names) */}
          <div className="grid grid-cols-[140px_repeat(25,minmax(28px,1fr))] gap-1 items-end pb-2">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider pl-2">
              Agent Pair
            </div>
            {profiles.map((p) => (
              <div
                key={p.id}
                className="text-[9px] font-mono text-muted-foreground truncate -rotate-45 origin-bottom-left h-12 pl-1 select-none"
                title={p.name}
              >
                {p.name.split(" ")[0]}
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          <div className="space-y-1 pt-4">
            {profiles.map((rowPerson) => (
              <div
                key={rowPerson.id}
                className="grid grid-cols-[140px_repeat(25,minmax(28px,1fr))] gap-1 items-center"
              >
                {/* Row Header Label */}
                <div className="flex items-center gap-2 pr-2 overflow-hidden">
                  <div className="relative h-6 w-6 rounded-lg overflow-hidden shrink-0 border border-border/50">
                    <Image
                      src={rowPerson.avatarUrl}
                      alt={rowPerson.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-foreground truncate select-none">
                    {rowPerson.name}
                  </span>
                </div>

                {/* Heatmap Cells */}
                {profiles.map((colPerson) => {
                  const isSelf = rowPerson.id === colPerson.id;
                  const score = getScore(rowPerson.id, colPerson.id);

                  // Color gradient logic
                  let bgClass =
                    "bg-muted/40 hover:bg-muted/70 text-muted-foreground/60";
                  if (score >= 82) {
                    bgClass =
                      "bg-rose-500 text-white font-bold hover:bg-rose-600";
                  } else if (score >= 76) {
                    bgClass =
                      "bg-rose-400/40 text-foreground font-semibold hover:bg-rose-400/60";
                  } else if (score >= 70) {
                    bgClass =
                      "bg-rose-400/20 text-muted-foreground hover:bg-rose-400/30";
                  }

                  if (isSelf) {
                    bgClass =
                      "bg-background/30 border border-border/30 text-muted-foreground/20";
                  }

                  return (
                    <button
                      key={colPerson.id}
                      disabled={isSelf}
                      onClick={() => handleCellClick(rowPerson, colPerson)}
                      title={
                        isSelf
                          ? `${rowPerson.name} (Self)`
                          : `${rowPerson.name} & ${colPerson.name}: ${score}% Match`
                      }
                      className={`h-7 rounded-md text-[10px] flex items-center justify-center transition-all ${bgClass} cursor-pointer disabled:cursor-not-allowed`}
                    >
                      {isSelf ? "—" : score}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
