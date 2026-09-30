import { getAllRankings } from "@/lib/rankings";
import { getAllProfiles } from "@/lib/profiles";
import { RankingsDashboard } from "@/components/rankings/rankings-dashboard";
import { Award, Users, HeartHandshake, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RankingsPage() {
  const rankings = getAllRankings();
  const profiles = getAllProfiles();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Award className="h-3.5 w-3.5" />
          Autonomous Compatibility Matrix
        </div>
        <h1 className="text-3xl md:text-4xl font-heading tracking-tight">
          Mutual Compatibility Rankings
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Every candidate receives a complete compatibility rank from #1 to #24.
          Scores are derived by comparing mutual emotional needs, lifestyle rhythms,
          and dealbreaker tolerance extracted from verified LinkedIn & Instagram evidence.
        </p>

        {/* Live Counters */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Badge variant="outline" className="rounded-xl px-3 py-1.5 text-xs bg-muted/30">
            <Users className="h-3.5 w-3.5 mr-1.5 text-primary" />
            25 Evaluated Personas
          </Badge>
          <Badge variant="outline" className="rounded-xl px-3 py-1.5 text-xs bg-muted/30">
            <HeartHandshake className="h-3.5 w-3.5 mr-1.5 text-rose-500" />
            600 Pairwise Match Evaluations
          </Badge>
          <Badge variant="outline" className="rounded-xl px-3 py-1.5 text-xs bg-muted/30">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
            Strictly Evidence-Grounded
          </Badge>
        </div>
      </div>

      {/* Main Interactive Dashboard */}
      <RankingsDashboard rankings={rankings} profiles={profiles} />
    </div>
  );
}
