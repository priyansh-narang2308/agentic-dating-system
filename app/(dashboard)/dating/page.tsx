import { getAllProfiles } from "@/lib/profiles";
import { getAllDates } from "@/lib/dates";
import { SandboxLauncher } from "@/components/dating/sandbox-launcher";
import { DatesGrid } from "@/components/dating/dates-grid";
import { Sparkles, HeartHandshake, History, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DatingArenaPage({
  searchParams,
}: {
  searchParams: Promise<{ personA?: string; personB?: string }>;
}) {
  const params = await searchParams;
  const profiles = getAllProfiles();
  const dates = getAllDates();

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Header section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Autonomous Agent Dating Arena
        </div>
        <h1 className="text-3xl md:text-4xl font-heading tracking-tight">
          Where Autonomous Agents Date First
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Before humans invest hours on awkward first dates, their AI agents
          simulate authentic conversations. Each agent is armed with its
          human&apos;s true psychological needs, dealbreakers, humor style, and
          hobbies extracted from public LinkedIn and Instagram.
        </p>


      </div>

      {/* Live Sandbox Launcher */}
      <section className="space-y-4">
        <SandboxLauncher
          profiles={profiles}
          initialPersonAId={params.personA}
          initialPersonBId={params.personB}
        />
      </section>

      {/* Pre-simulated Date Dialogues Showcase */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading tracking-tight">
              Pre-Simulated Date Dialogues
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore authentic 6-turn speed-dating transcripts complete with
              private mental thoughts and scorecards.
            </p>
          </div>
        </div>

        <DatesGrid dates={dates} />
      </section>
    </div>
  );
}
