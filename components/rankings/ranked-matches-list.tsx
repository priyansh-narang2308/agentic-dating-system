"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MatchRankingItem, PersonProfile } from "@/types";
import {
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface RankedMatchesListProps {
  person: PersonProfile;
  matches: MatchRankingItem[];
}

export function RankedMatchesList({ person, matches }: RankedMatchesListProps) {
  const [search, setSearch] = useState("");
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(
    matches[0]?.targetPersonId || null,
  );

  const filteredMatches = matches.filter((m) => {
    const s = search.toLowerCase();
    return (
      m.targetPersonName.toLowerCase().includes(s) ||
      m.targetProfession.toLowerCase().includes(s) ||
      m.targetArchetype.toLowerCase().includes(s)
    );
  });

  const toggleExpand = (targetId: string) => {
    setExpandedMatchId((prev) => (prev === targetId ? null : targetId));
  };

  return (
    <div className="space-y-5">
      {/* Search and count bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="text-xs text-muted-foreground font-medium">
          Showing {filteredMatches.length} of {matches.length} ranked matches
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 rounded-2xl text-xs bg-card border-border/60"
          />
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => {
          const isExpanded = expandedMatchId === match.targetPersonId;

          // Rank badge styling
          let rankBadgeClass = "bg-muted text-muted-foreground";
          if (match.rank === 1)
            rankBadgeClass = "bg-amber-500 text-amber-950 font-bold shadow-sm";
          if (match.rank === 2)
            rankBadgeClass = "bg-slate-300 text-slate-900 font-bold";
          if (match.rank === 3)
            rankBadgeClass = "bg-amber-700/80 text-white font-bold";

          return (
            <div
              key={match.targetPersonId}
              className={`rounded-3xl border transition-all duration-200 bg-card overflow-hidden ${
                isExpanded
                  ? "border-primary/50 shadow-md ring-1 ring-primary/20"
                  : "border-border/60 hover:border-border"
              }`}
            >
              {/* Main Summary Row */}
              <div
                onClick={() => toggleExpand(match.targetPersonId)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 text-xs ${rankBadgeClass}`}
                  >
                    #{match.rank}
                  </div>

                  {/* Target Avatar */}
                  <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 border border-primary/20 bg-muted">
                    <Image
                      src={match.targetAvatar}
                      alt={match.targetPersonName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  {/* Target Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-semibold truncate text-foreground">
                        {match.targetPersonName}
                      </h3>
                      {match.rank === 1 && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-none font-semibold"
                        >
                          Top Soulmate
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {match.targetProfession} • {match.targetCity}
                    </p>
                  </div>
                </div>

                {/* Compatibility Score & Expand Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1.5 justify-end text-sm font-bold font-heading text-rose-500">
                      <Flame className="h-4 w-4 fill-current" />
                      {match.compatibilityScore}% Match
                    </div>
                    <div className="w-28 hidden sm:block">
                      <Progress
                        value={match.compatibilityScore}
                        className="h-1.5"
                      />
                    </div>
                  </div>

                  <div className="text-muted-foreground p-1 rounded-xl hover:bg-muted/40">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Accordion Drawer (Task 18) */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-border/40 space-y-4 animate-in fade-in duration-200">
                  {/* Scores breakdown mini bar */}
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40 text-center">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">
                        Chemistry
                      </span>
                      <p className="text-xs font-bold text-rose-500">
                        {match.chemistryScore}%
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">
                        Lifestyle
                      </span>
                      <p className="text-xs font-bold text-primary">
                        {match.lifestyleScore}%
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">
                        Values
                      </span>
                      <p className="text-xs font-bold text-emerald-500">
                        {match.valuesScore}%
                      </p>
                    </div>
                  </div>

                  {/* Synergies & Potential Risks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Synergies */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Why They Fit (Synergies)
                      </span>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {match.synergies.map((syn, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 shrink-0">•</span>
                            <span>{syn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Potential Risks */}
                    <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Potential Friction Points
                      </span>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {match.potentialRisks.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 shrink-0">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <Link
                      href={`/profiles/${match.targetPersonId}`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "rounded-xl text-xs",
                      })}
                    >
                      View {match.targetPersonName}&apos;s Profile
                      <ExternalLink className="h-3 w-3 ml-1.5" />
                    </Link>

                    <Link
                      href={
                        match.dateId
                          ? `/dating/${match.dateId}`
                          : `/dating?personA=${person.id}&personB=${match.targetPersonId}`
                      }
                      className={buttonVariants({
                        size: "sm",
                        className:
                          "rounded-xl text-xs font-semibold bg-primary text-primary-foreground",
                      })}
                    >
                      <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                      {match.dateId
                        ? "Watch Date Dialogue"
                        : "Simulate Date Dialogue"}
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
