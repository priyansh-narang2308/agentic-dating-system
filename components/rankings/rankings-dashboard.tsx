"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PersonRanking, PersonProfile } from "@/types";
import { MatrixView } from "./matrix-view";
import {
  Search,
  ArrowRight,
  Grid3X3,
  ListOrdered,
  Award,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

interface RankingsDashboardProps {
  rankings: PersonRanking[];
  profiles: PersonProfile[];
}

export function RankingsDashboard({
  rankings,
  profiles,
}: RankingsDashboardProps) {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "matrix">(
    "leaderboard",
  );
  const [search, setSearch] = useState("");

  const filteredRankings = rankings.filter((r) => {
    const p = profiles.find((prof) => prof.id === r.personId);
    const searchLower = search.toLowerCase();
    return (
      r.personName.toLowerCase().includes(searchLower) ||
      p?.profession.toLowerCase().includes(searchLower) ||
      p?.analysis.personalityArchetype.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Bar & View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === "leaderboard"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            Candidate Leaderboard ({rankings.length})
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === "matrix"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            25x25 Compatibility Heatmap
          </button>
        </div>

        {activeTab === "leaderboard" && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search candidate or profession..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-2xl text-xs bg-card border-border/60"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === "matrix" ? (
        <MatrixView rankings={rankings} profiles={profiles} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRankings.map((ranking) => {
            const profile = profiles.find((p) => p.id === ranking.personId);
            const topMatch = ranking.matches[0];
            const avgScore = Math.round(
              ranking.matches.reduce(
                (acc, m) => acc + m.compatibilityScore,
                0,
              ) / ranking.matches.length,
            );

            return (
              <Card
                key={ranking.personId}
                className="group rounded-3xl border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-md bg-card flex flex-col justify-between overflow-hidden"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Candidate Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 border border-primary/20 bg-muted">
                        <Image
                          src={ranking.personAvatar}
                          alt={ranking.personName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-semibold truncate group-hover:text-primary transition-colors">
                          {ranking.personName}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {profile?.profession || "Candidate"}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className="text-[10px] bg-muted/40 font-mono"
                    >
                      Avg {avgScore}%
                    </Badge>
                  </div>

                  {/* Top Match Spotlight */}
                  {topMatch && (
                    <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-500">
                          <Award className="h-3.5 w-3.5" />
                          #1 Soulmate Match
                        </span>
                        <span className="font-bold text-xs text-foreground">
                          {topMatch.compatibilityScore}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 border border-border/50">
                          <Image
                            src={topMatch.targetAvatar}
                            alt={topMatch.targetPersonName}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-foreground truncate">
                            {topMatch.targetPersonName}
                          </h4>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {topMatch.targetArchetype}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground italic truncate">
                        &ldquo;{topMatch.synergies[0]}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-1 flex items-center gap-2">
                    <Link
                      href={`/rankings/${ranking.personId}`}
                      className={buttonVariants({
                        size: "sm",
                        className:
                          "flex-1 rounded-2xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90",
                      })}
                    >
                      View All 24 Matches
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>

                    <Link
                      href={`/profiles/${ranking.personId}`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className:
                          "rounded-2xl text-xs text-muted-foreground hover:text-foreground",
                      })}
                      title="View Persona Dossier"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
