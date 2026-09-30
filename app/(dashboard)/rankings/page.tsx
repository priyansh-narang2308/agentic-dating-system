import { getAllRankings } from "@/lib/rankings";
import { getAllProfiles } from "@/lib/profiles";
import { RankingsDashboard } from "@/components/rankings/rankings-dashboard";
import { Award } from "lucide-react";

export default function RankingsPage() {
  const rankings = getAllRankings();
  const profiles = getAllProfiles();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
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
          Scores are derived by comparing mutual emotional needs, lifestyle
          rhythms, and dealbreaker tolerance extracted from verified LinkedIn &
          Instagram evidence.
        </p>
      </div>

      <RankingsDashboard rankings={rankings} profiles={profiles} />
    </div>
  );
}
