/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProfiles } from "@/lib/profiles";
import {
  Search,
  Filter,
  ExternalLink,
  MapPin,
  HeartHandshake,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilesPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const profiles = useMemo(() => getAllProfiles(), []);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    profiles.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
    return ["All", ...Array.from(allTags).slice(0, 8)];
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.profession.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.analysis.personalityArchetype.toLowerCase().includes(search.toLowerCase());

      const matchesTag = selectedTag === "All" || p.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [profiles, search, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-foreground tracking-tight">
              25 Autonomous Agent Personas
            </h1>
            <Badge variant="outline" className="border-primary/40 text-primary text-xs">
              VERIFIED POOL
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Each person is represented by an agent that dates on their behalf. Strictly analyzed 
            from two official sources: their public LinkedIn and public Instagram.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dating"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "rounded-xl font-medium text-xs",
            })}
          >
            <HeartHandshake className="h-4 w-4 mr-1.5 text-primary" />
            Watch Dating Arena
          </Link>
          <Link
            href="/rankings"
            className={buttonVariants({
              size: "sm",
              className: "rounded-xl font-semibold text-xs bg-primary text-primary-foreground",
            })}
          >
            <Award className="h-4 w-4 mr-1.5" />
            All Rankings
          </Link>
        </div>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, role, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs bg-card/80"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:block mr-1" />
          {tags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full text-xs h-7 px-3 shrink-0 cursor-pointer ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProfiles.map((person) => (
          <Card
            key={person.id}
            className="glass-panel glass-panel-hover flex flex-col justify-between border-border/50 overflow-hidden"
          >
            <div>
              {/* Header with Avatar & Base Info */}
              <CardHeader className="pb-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="relative">
                    <img
                      src={person.avatarUrl}
                      alt={person.name}
                      className="h-14 w-14 rounded-2xl object-cover border-2 border-primary/30 shadow-md"
                    />
                    <span
                      title="Agent Online"
                      className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-card"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-[10px] font-semibold transition-colors"
                      title="View Official LinkedIn"
                    >
                      LinkedIn
                      <ExternalLink className="ml-1 h-2.5 w-2.5" />
                    </a>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 text-[10px] font-semibold transition-colors"
                      title="View Public Instagram"
                    >
                      Instagram
                      <ExternalLink className="ml-1 h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 min-w-0">
                    <CardTitle className="text-lg font-sans text-foreground truncate">
                      {person.name}
                    </CardTitle>
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <CardDescription className="text-xs text-muted-foreground truncate font-medium mt-0.5">
                    {person.profession} {person.companyOrOrg ? `• ${person.companyOrOrg}` : ""}
                  </CardDescription>
                  <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="truncate">{person.city}</span>
                  </p>
                </div>
              </CardHeader>

              {/* Bio & Archetype */}
              <CardContent className="space-y-3 pb-3 text-xs">
                <div className="rounded-xl bg-background/60 p-2.5 border border-border/40 space-y-2">
                  <div className="flex flex-col gap-1 text-[11px]">
                    <span className="text-muted-foreground font-medium">Psychological Archetype:</span>
                    <Badge variant="outline" className="text-[10px] py-0.5 border-primary/40 text-primary self-start max-w-full">
                      <span className="truncate">{person.analysis.personalityArchetype}</span>
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground italic line-clamp-2 pt-0.5">
                    &quot;{person.bio}&quot;
                  </p>
                </div>

                {/* Needs Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    Core Needs:
                  </span>
                  <div className="flex flex-wrap gap-1 min-w-0">
                    {person.analysis.needs.emotional.slice(0, 2).map((need, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 bg-secondary/40 text-secondary-foreground font-normal border-0 max-w-full"
                      >
                        <span className="truncate">{need}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hobbies Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    Verified Hobbies:
                  </span>
                  <div className="flex flex-wrap gap-1 min-w-0">
                    {person.analysis.hobbies.slice(0, 3).map((hobby, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 border-border text-foreground font-normal max-w-full"
                      >
                        <span className="truncate">{hobby}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Card Footer Actions */}
            <CardFooter className="pt-2 pb-4 border-t border-border/30 flex items-center justify-between gap-2">
              <Link
                href={`/profiles/${person.id}`}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "w-full text-xs font-semibold rounded-xl bg-primary text-primary-foreground",
                })}
              >
                Inspect Agent Dossier
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/rankings/${person.id}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "text-xs rounded-xl border-border hover:border-primary/40",
                })}
                title="View Rankings for this Person"
              >
                <Award className="h-3.5 w-3.5 text-yellow-500" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <p className="text-sm text-muted-foreground">No candidate profiles found matching your search.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setSelectedTag("All"); }} className="mt-3 text-xs">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
