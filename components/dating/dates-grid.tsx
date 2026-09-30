"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DateDialogue } from "@/types";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface DatesGridProps {
  dates: DateDialogue[];
}

export function DatesGrid({ dates }: DatesGridProps) {
  const [filter, setFilter] = useState<"all" | "approved" | "high-chem">("all");

  const filteredDates = dates.filter((d) => {
    if (filter === "approved") return d.verdict.secondDateApproved;
    if (filter === "high-chem") return d.verdict.overallScore >= 90;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Simulated Dates ({dates.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              filter === "approved"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Date #2 Approved 🎉 ({dates.filter((d) => d.verdict.secondDateApproved).length})
          </button>
          <button
            onClick={() => setFilter("high-chem")}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              filter === "high-chem"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            High Chemistry (90%+) ({dates.filter((d) => d.verdict.overallScore >= 90).length})
          </button>
        </div>

        <span className="text-xs text-muted-foreground">
          Showing {filteredDates.length} of {dates.length} archive transcripts
        </span>
      </div>

      {/* Grid of Date Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDates.map((date) => {
          const isHighMatch = date.verdict.overallScore >= 90;

          return (
            <Card
              key={date.id}
              className="group rounded-3xl border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg bg-card/90 overflow-hidden flex flex-col justify-between"
            >
              <CardContent className="p-6 space-y-5">
                {/* Header: Avatars & Score */}
                <div className="flex items-start justify-between gap-3">
                  {/* Dual Avatars */}
                  <div className="flex items-center -space-x-4">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-background shadow-md">
                      <Image
                        src={date.personAAvatar}
                        alt={date.personAName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-white shadow-md">
                      <Heart className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-background shadow-md">
                      <Image
                        src={date.personBAvatar}
                        alt={date.personBName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Compatibility Badge & Status */}
                  <div className="text-right space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm">
                      <Flame className="h-3.5 w-3.5 fill-current" />
                      {date.verdict.overallScore}% Match
                    </div>
                    <div>
                      {date.verdict.secondDateApproved ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Date #2 Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                          <AlertCircle className="h-3 w-3" />
                          Platonic Connection
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Names */}
                <div>
                  <h3 className="text-lg font-heading group-hover:text-primary transition-colors">
                    {date.personAName} & {date.personBName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate">{date.venue}</span>
                  </p>
                </div>

                {/* Vibe Quote */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/40 text-xs italic text-muted-foreground">
                  &ldquo;{date.vibe}&rdquo;
                </div>

                {/* Highlight Moment */}
                {date.verdict.highlightMoment && (
                  <div className="text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Highlight Moment
                    </span>
                    <p className="text-foreground/90 font-medium text-xs line-clamp-2">
                      {date.verdict.highlightMoment}
                    </p>
                  </div>
                )}

                {/* Scores breakdown mini bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center">
                  <div className="p-2 rounded-xl bg-background/50">
                    <span className="block text-[10px] text-muted-foreground">Chemistry</span>
                    <span className="text-xs font-bold text-rose-500">{date.verdict.chemistryScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-background/50">
                    <span className="block text-[10px] text-muted-foreground">Lifestyle</span>
                    <span className="text-xs font-bold text-primary">{date.verdict.lifestyleScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-background/50">
                    <span className="block text-[10px] text-muted-foreground">Values</span>
                    <span className="text-xs font-bold text-emerald-500">{date.verdict.valuesScore}%</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2">
                  <Link
                    href={`/dating/${date.id}`}
                    className={buttonVariants({
                      variant: "default",
                      className:
                        "w-full rounded-2xl text-xs font-semibold py-4 bg-primary/90 hover:bg-primary text-primary-foreground group-hover:shadow-md transition-all flex items-center justify-center gap-1.5",
                    })}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Watch 6-Turn Date Replay
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
