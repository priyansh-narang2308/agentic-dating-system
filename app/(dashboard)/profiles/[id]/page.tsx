/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/profiles";
import { getRankingsForPerson } from "@/lib/rankings";
import {
  ExternalLink,
  MapPin,
  ShieldCheck,
  HeartHandshake,
  Award,
  ArrowLeft,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Calendar,
  Compass,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    notFound();
  }

  const ranking = getRankingsForPerson(profile.id);
  const topMatches = ranking ? ranking.matches.slice(0, 3) : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/profiles"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "text-xs text-muted-foreground hover:text-foreground pl-0",
          })}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to All 25 Profiles
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/rankings/${profile.id}`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className:
                "text-xs rounded-xl border-border hover:border-primary/40",
            })}
          >
            <Award className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
            Rankings ({ranking?.matches.length || 24} Candidates)
          </Link>
          <Link
            href={`/dating?personA=${profile.id}`}
            className={buttonVariants({
              size: "sm",
              className:
                "text-xs font-semibold rounded-xl bg-primary text-primary-foreground",
            })}
          >
            <HeartHandshake className="h-3.5 w-3.5 mr-1.5" />
            Simulate Date with Agent
          </Link>
        </div>
      </div>

      <Card className="glass-panel border-primary/20 overflow-hidden shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl object-cover border-2 border-primary/40 shadow-lg"
              />
              <span
                title="Agent Active"
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-400 border-3 border-card flex items-center justify-center"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-sans font-bold text-foreground">
                      {profile.name}
                    </h1>
                    <ShieldCheck
                      className="h-5 w-5 text-primary"
                      aria-label="Verified Profile"
                    />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">
                    {profile.profession}{" "}
                    {profile.companyOrOrg ? `• ${profile.companyOrOrg}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-colors"
                  >
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 text-xs font-semibold transition-colors"
                  >
                    Instagram
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                &quot;{profile.bio}&quot;
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {profile.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  Archetype:{" "}
                  <strong className="text-foreground">
                    {profile.analysis.personalityArchetype}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-panel border-border/50">
          <CardContent className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-primary" />
              Energy Vibe
            </span>
            <p className="text-xs font-medium text-foreground">
              {profile.analysis.energyVibe}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-border/50">
          <CardContent className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-rose-400" />
              Love Language
            </span>
            <p className="text-xs font-medium text-foreground">
              {profile.analysis.loveLanguage}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-border/50">
          <CardContent className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-yellow-400" />
              Ideal First Date
            </span>
            <p className="text-xs font-medium text-foreground line-clamp-2">
              {profile.analysis.idealDate}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel border-border/60">
        <CardHeader className="pb-3 border-b border-border/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-xl font-sans font-bold text-foreground">
                Agentic Psychometric Dossier
              </CardTitle>
              <CardDescription className="text-xs">
                Synthesized by Gemini from verified LinkedIn career milestones
                and Instagram lifestyle moments.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/40 text-emerald-400 text-xs w-fit"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Grounded Analysis
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="needs" className="space-y-6">
            <TabsList className="bg-background/80 p-1 rounded-xl border border-border/60 w-full sm:w-auto grid grid-cols-4">
              <TabsTrigger
                value="needs"
                className="rounded-lg text-xs font-medium"
              >
                Needs
              </TabsTrigger>
              <TabsTrigger
                value="hobbies"
                className="rounded-lg text-xs font-medium"
              >
                Hobbies
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="rounded-lg text-xs font-medium"
              >
                Interests
              </TabsTrigger>
              <TabsTrigger
                value="qualities"
                className="rounded-lg text-xs font-medium"
              >
                Qualities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="needs" className="space-y-5 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-background/50 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <HeartHandshake className="h-3.5 w-3.5" />
                    Emotional Needs
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {profile.analysis.needs.emotional.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/50 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Communication Style
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {profile.analysis.needs.communication.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary-foreground mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/50 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Lifestyle Rhythms
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {profile.analysis.needs.lifestyle.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Strict Dealbreakers
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {profile.analysis.needs.dealbreakers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hobbies" className="space-y-3 mt-0">
              <p className="text-xs text-muted-foreground">
                Verified leisure activities, sports, and creative crafts
                grounded in public posts:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.analysis.hobbies.map((hobby, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="rounded-xl px-3.5 py-1.5 text-xs border-border/80 bg-background/60 font-medium flex items-center gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {hobby}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interests" className="space-y-3 mt-0">
              <p className="text-xs text-muted-foreground">
                Intellectual, artistic, and cultural passions observed across
                professional and social footprint:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.analysis.interests.map((interest, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="rounded-xl px-3.5 py-1.5 text-xs bg-secondary/50 text-secondary-foreground font-medium flex items-center gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    {interest}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qualities" className="space-y-3 mt-0">
              <p className="text-xs text-muted-foreground">
                Observed strengths, interpersonal temperament, and personality
                quirks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {profile.analysis.qualities.map((quality, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border/50 bg-background/50 p-3 text-xs flex items-center gap-2.5 font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{quality}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="glass-panel border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-sans font-bold text-foreground">
                Source Evidence Grounding
              </CardTitle>
              <CardDescription className="text-xs">
                Direct signals extracted from LinkedIn and Instagram that
                justify the agent&apos;s conclusions.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="text-[11px] text-muted-foreground"
            >
              {profile.evidence.length} Cited Signals
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.evidence.map((signal) => (
              <div
                key={signal.id}
                className="rounded-xl border border-border/40 bg-background/40 p-3.5 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0 ${
                      signal.source === "linkedin"
                        ? "border-blue-500/30 text-blue-400 bg-blue-500/5"
                        : "border-pink-500/30 text-pink-400 bg-pink-500/5"
                    }`}
                  >
                    {signal.source === "linkedin"
                      ? "LinkedIn Record"
                      : "Instagram Signal"}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {signal.category}
                  </span>
                </div>
                <h5 className="font-semibold text-foreground text-xs">
                  {signal.title}
                </h5>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  &quot;{signal.excerpt}&quot;
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {topMatches.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-sans font-bold text-foreground">
              Top Mutual Matches for {profile.name}
            </h3>
            <Link
              href={`/rankings/${profile.id}`}
              className={buttonVariants({
                variant: "link",
                size: "sm",
                className: "text-xs text-primary p-0",
              })}
            >
              See all 24 ranked candidates →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topMatches.map((match) => (
              <Card
                key={match.targetPersonId}
                className="glass-panel border-border/40 p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={match.targetAvatar}
                    alt={match.targetPersonName}
                    className="h-10 w-10 rounded-xl object-cover border border-primary/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate">
                      {match.targetPersonName}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {match.targetProfession}
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs shrink-0">
                    {match.compatibilityScore}%
                  </Badge>
                </div>

                <div className="pt-1">
                  {match.dateId ? (
                    <Link
                      href={`/dating/${match.dateId}`}
                      className={buttonVariants({
                        size: "sm",
                        className: "w-full text-xs rounded-xl",
                      })}
                    >
                      Watch Simulated Date
                    </Link>
                  ) : (
                    <Link
                      href={`/dating?personA=${profile.id}&personB=${match.targetPersonId}`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                        className: "w-full text-xs rounded-xl border-border",
                      })}
                    >
                      Simulate Date
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
