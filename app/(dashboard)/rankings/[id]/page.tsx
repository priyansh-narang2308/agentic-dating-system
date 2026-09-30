import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/profiles";
import { getRankingsForPerson } from "@/lib/rankings";
import { RankedMatchesList } from "@/components/rankings/ranked-matches-list";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function PersonRankingsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = getProfileById(id);
  const ranking = getRankingsForPerson(id);

  if (!profile || !ranking) {
    notFound();
  }

  const topMatch = ranking.matches[0];
  const avgScore = Math.round(
    ranking.matches.reduce((acc, m) => acc + m.compatibilityScore, 0) /
      ranking.matches.length,
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/rankings"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "text-xs text-muted-foreground hover:text-foreground pl-0",
          })}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Mutual Match Rankings
        </Link>

        <Link
          href={`/profiles/${profile.id}`}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "rounded-xl text-xs",
          })}
        >
          View {profile.name}&apos;s Dossier
          <ExternalLink className="h-3 w-3 ml-1.5" />
        </Link>
      </div>

      {/* Candidate Persona Spotlight Header */}
      <Card className="rounded-3xl border-rose-200/60 dark:border-rose-900/40 shadow-sm bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-3xl overflow-hidden shrink-0 border-2 border-primary/20 bg-muted shadow-sm">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-heading font-semibold text-foreground">
                  {profile.name}
                </h1>
                <Badge variant="outline" className="text-[10px] bg-background">
                  {profile.analysis.personalityArchetype}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {profile.profession} • {profile.city}
              </p>
              <p className="text-xs text-muted-foreground/80 max-w-lg line-clamp-1 italic pt-0.5">
                &ldquo;{profile.analysis.datingPhilosophy}&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40 text-center min-w-[110px]">
              <span className="block text-[10px] text-muted-foreground">
                Top Soulmate
              </span>
              <span className="text-sm font-bold font-heading text-rose-500">
                {topMatch?.compatibilityScore}%
              </span>
              <p className="text-[10px] text-muted-foreground truncate max-w-[90px] mx-auto">
                {topMatch?.targetPersonName}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border/40 text-center min-w-[100px]">
              <span className="block text-[10px] text-muted-foreground">
                Network Avg
              </span>
              <span className="text-sm font-bold font-heading text-foreground">
                {avgScore}%
              </span>
              <p className="text-[10px] text-muted-foreground">24 Candidates</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Ranked Matches List */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Candidate Compatibility Leaderboard (#1 to #24)
            </h2>
            <p className="text-xs text-muted-foreground">
              Ranked in descending order of psychological and lifestyle
              compatibility. Click any candidate to expand mutual synergies and
              friction points.
            </p>
          </div>
        </div>

        <RankedMatchesList person={profile} matches={ranking.matches} />
      </section>
    </div>
  );
}
