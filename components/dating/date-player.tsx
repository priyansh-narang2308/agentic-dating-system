/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { DateDialogue, PersonProfile } from "@/types";
import {
  Heart,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DatePlayerProps {
  dialogue: DateDialogue;
  personA?: PersonProfile;
  personB?: PersonProfile;
}

export function DatePlayer({ dialogue, personA, personB }: DatePlayerProps) {
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(3000); // ms per turn
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [confettiFired, setConfettiFired] = useState<boolean>(false);

  const turnsContainerRef = useRef<HTMLDivElement>(null);

  const totalTurns = dialogue.turns.length;
  const isFinished = currentTurnIndex >= totalTurns;
  const currentTurn =
    dialogue.turns[Math.min(currentTurnIndex - 1, totalTurns - 1)];

  // Calculate dynamic live chemistry score based on turns revealed
  const baseChem = 50;
  const chemSum = dialogue.turns
    .slice(0, currentTurnIndex)
    .reduce((acc, t) => acc + (t.chemistryDelta || 5), 0);
  const liveChemistry = isFinished
    ? dialogue.verdict.overallScore
    : Math.min(
        dialogue.verdict.overallScore,
        Math.round(baseChem + chemSum * 0.8),
      );

  // Auto-play interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentTurnIndex < totalTurns) {
      setIsTyping(true);
      timer = setTimeout(() => {
        setIsTyping(false);
        setCurrentTurnIndex((prev) => prev + 1);
      }, playbackSpeed);
    } else if (isPlaying && currentTurnIndex >= totalTurns) {
      setIsPlaying(false);
      setIsTyping(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentTurnIndex, totalTurns, playbackSpeed]);

  // Confetti when finished and approved
  useEffect(() => {
    if (isFinished && dialogue.verdict.secondDateApproved && !confettiFired) {
      setConfettiFired(true);
      import("canvas-confetti")
        .then((confetti) => {
          confetti.default({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#f43f5e", "#fb7185", "#fda4af", "#e11d48"],
          });
        })
        .catch(() => {});
    }
  }, [isFinished, dialogue.verdict.secondDateApproved, confettiFired]);

  // Auto scroll to latest turn
  useEffect(() => {
    if (turnsContainerRef.current) {
      turnsContainerRef.current.scrollTop =
        turnsContainerRef.current.scrollHeight;
    }
  }, [currentTurnIndex, isTyping]);

  function handlePlayPause() {
    if (isFinished) {
      setCurrentTurnIndex(1);
      setConfettiFired(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  function handleNextTurn() {
    if (currentTurnIndex < totalTurns) {
      setCurrentTurnIndex((prev) => prev + 1);
    }
  }

  function handlePrevTurn() {
    if (currentTurnIndex > 1) {
      setCurrentTurnIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  }

  function handleRevealAll() {
    setCurrentTurnIndex(totalTurns);
    setIsPlaying(false);
  }

  function handleRestart() {
    setCurrentTurnIndex(1);
    setIsPlaying(false);
    setConfettiFired(false);
  }

  const currentSpeaker = currentTurn?.speakerId;
  const isAgentASpeaking = currentSpeaker === dialogue.personAId;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Bar with Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dating"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "text-xs text-muted-foreground hover:text-foreground pl-0",
          })}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Dating Arena Hub
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-muted/30">
            <MapPin className="h-3 w-3 mr-1 text-primary" />
            {dialogue.venue}
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400"
          >
            Turn {currentTurnIndex} of {totalTurns}
          </Badge>
        </div>
      </div>

      {/* Head-to-Head Agent HUD & Chemistry Gauge */}
      <Card className="rounded-3xl border-rose-200/60 dark:border-rose-900/40 shadow-lg bg-card/90 overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Agent A Card */}
            <div className="md:col-span-4 flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/40">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/20 bg-muted">
                <Image
                  src={dialogue.personAAvatar}
                  alt={dialogue.personAName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base truncate">
                    {dialogue.personAName}
                  </h3>
                  {isAgentASpeaking && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {personA?.analysis?.personalityArchetype || "Agent A"}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="text-[10px] py-0 px-2 bg-background"
                  >
                    Emotion:{" "}
                    {isAgentASpeaking ? currentTurn?.emotion : "listening"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Live Chemistry Gauge (Center) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center p-3 text-center space-y-2">
              <div className="relative flex items-center justify-center">
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-linear-to-tr from-rose-500/20 via-primary/10 to-rose-500/30 border border-rose-500/30 shadow-inner">
                  <Heart className="h-8 w-8 text-rose-500 fill-rose-500/20 animate-pulse" />
                  <span className="absolute text-sm font-bold font-heading text-foreground">
                    {liveChemistry}%
                  </span>
                </div>
              </div>
              <div className="w-full max-w-[160px] space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>Live Chemistry</span>
                  <span>
                    {isFinished
                      ? "Final Verdict"
                      : `+${currentTurn?.chemistryDelta || 5} pts`}
                  </span>
                </div>
                <Progress value={liveChemistry} className="h-2" />
              </div>
            </div>

            {/* Agent B Card */}
            <div className="md:col-span-4 flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/40 justify-end text-right">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-end gap-2">
                  {!isAgentASpeaking && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                  <h3 className="font-heading text-base truncate">
                    {dialogue.personBName}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {personB?.analysis?.personalityArchetype || "Agent B"}
                </p>
                <div className="mt-1.5 flex items-center justify-end gap-1.5">
                  <Badge
                    variant="outline"
                    className="text-[10px] py-0 px-2 bg-background"
                  >
                    Emotion:{" "}
                    {!isAgentASpeaking ? currentTurn?.emotion : "listening"}
                  </Badge>
                </div>
              </div>
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/20 bg-muted">
                <Image
                  src={dialogue.personBAvatar}
                  alt={dialogue.personBName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Playback Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-muted/40 border border-border/60">
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePlayPause}
            className="rounded-2xl px-5 text-xs font-semibold shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 mr-1.5" />
                Pause
              </>
            ) : isFinished ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Replay Date
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5 fill-current" />
                Auto Play
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevTurn}
            disabled={currentTurnIndex <= 1}
            className="rounded-xl text-xs"
          >
            Back
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextTurn}
            disabled={currentTurnIndex >= totalTurns}
            className="rounded-xl text-xs"
          >
            Next Turn
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRevealAll}
            disabled={isFinished}
            className="rounded-xl text-xs text-muted-foreground hover:text-foreground"
          >
            <FastForward className="h-3.5 w-3.5 mr-1" />
            Fast-Forward
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRestart}
            className="rounded-xl text-muted-foreground"
            title="Restart Date"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed Selector & Turn Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Speed:</span>
          <div className="flex items-center rounded-xl bg-background border border-border/60 p-0.5 text-xs">
            <button
              onClick={() => setPlaybackSpeed(4000)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                playbackSpeed === 4000
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              1x
            </button>
            <button
              onClick={() => setPlaybackSpeed(2200)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                playbackSpeed === 2200
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              1.5x
            </button>
            <button
              onClick={() => setPlaybackSpeed(1200)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                playbackSpeed === 1200
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              2.5x
            </button>
          </div>
        </div>
      </div>

      {/* Dialogue Conversation Stream */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Simulated Conversation Feed
          </h2>
          <span className="text-xs text-muted-foreground">
            Revealing {currentTurnIndex} of {totalTurns} turns
          </span>
        </div>

        <div
          ref={turnsContainerRef}
          className="space-y-6 max-h-[700px] overflow-y-auto pr-2 scroll-smooth"
        >
          {dialogue.turns.slice(0, currentTurnIndex).map((turn, index) => {
            const isA = turn.speakerId === dialogue.personAId;
            const speakerName =
              turn.speakerName ||
              (isA ? dialogue.personAName : dialogue.personBName);
            const avatarUrl =
              turn.avatarUrl ||
              (isA ? dialogue.personAAvatar : dialogue.personBAvatar);

            return (
              <div
                key={turn.turnNumber || index}
                className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  isA ? "justify-start" : "justify-end flex-row-reverse"
                }`}
              >
                {/* Speaker Avatar */}
                <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 border border-primary/20 shadow-sm mt-1">
                  <Image
                    src={avatarUrl}
                    alt={speakerName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* Bubble & Inner Thought */}
                <div
                  className={`max-w-2xl space-y-2 ${isA ? "text-left" : "text-right"}`}
                >
                  {/* Meta Bar */}
                  <div
                    className={`flex items-center gap-2 text-xs text-muted-foreground ${
                      isA ? "justify-start" : "justify-end"
                    }`}
                  >
                    <span className="font-semibold text-foreground">
                      {speakerName}
                    </span>
                    <span>•</span>
                    <span>Turn #{turn.turnNumber}</span>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] py-0 px-1.5 uppercase font-mono"
                    >
                      {turn.emotion}
                    </Badge>
                    <span className="text-rose-500 font-semibold text-[11px]">
                      +{turn.chemistryDelta} chem
                    </span>
                  </div>

                  {/* Spoken Text Bubble */}
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                      isA
                        ? "bg-card border border-rose-200/50 dark:border-rose-900/40 rounded-tl-sm text-foreground"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}
                  >
                    {turn.text}
                  </div>

                  {/* Agent Inner Thought Callout */}
                  {turn.innerThought && (
                    <div
                      className={`p-3 rounded-2xl text-xs border text-left space-y-1 ${
                        isA
                          ? "bg-rose-500/5 border-rose-500/20 text-rose-950 dark:text-rose-200"
                          : "bg-muted/60 border-border/60 text-muted-foreground ml-auto"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <BrainCircuit className="h-3.5 w-3.5" />
                        Agent {isA ? "A" : "B"} Confidential Telemetry
                      </div>
                      <p className="italic leading-normal text-[11px]">
                        &ldquo;{turn.innerThought}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator if playing */}
          {isTyping && (
            <div
              className={`flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/40 w-fit text-xs text-muted-foreground animate-pulse ${
                isAgentASpeaking ? "ml-auto" : "mr-auto"
              }`}
            >
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
              </div>
              <span>
                {isAgentASpeaking ? dialogue.personBName : dialogue.personAName}{" "}
                is analyzing response...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Post-Date Verdict & Chemistry Scorecard */}
      {isFinished && (
        <Card className="rounded-3xl border-rose-300 dark:border-rose-800 shadow-xl bg-linear-to-br from-card linear-card to-rose-500/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="border-b border-border/40 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-2">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  Post-Date Evaluation Scorecard
                </div>
                <CardTitle className="text-2xl font-heading">
                  Mutual Compatibility Verdict
                </CardTitle>
              </div>

              {/* Second Date Status Badge */}
              <div>
                {dialogue.verdict.secondDateApproved ? (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-heading text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    Second Date Approved! 🎉
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-heading text-sm">
                    <AlertTriangle className="h-5 w-5" />
                    Platonic Connection Only
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Scorecard Metric Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-muted/40 border border-border/60 text-center">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Overall Compatibility
                </span>
                <p className="text-2xl font-bold font-heading text-foreground">
                  {dialogue.verdict.overallScore}%
                </p>
                <Progress
                  value={dialogue.verdict.overallScore}
                  className="h-1.5"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Conversational Chemistry
                </span>
                <p className="text-2xl font-bold font-heading text-rose-500">
                  {dialogue.verdict.chemistryScore}%
                </p>
                <Progress
                  value={dialogue.verdict.chemistryScore}
                  className="h-1.5"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Lifestyle & Rhythm
                </span>
                <p className="text-2xl font-bold font-heading text-primary">
                  {dialogue.verdict.lifestyleScore}%
                </p>
                <Progress
                  value={dialogue.verdict.lifestyleScore}
                  className="h-1.5"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">
                  Core Values Alignment
                </span>
                <p className="text-2xl font-bold font-heading text-emerald-500">
                  {dialogue.verdict.valuesScore}%
                </p>
                <Progress
                  value={dialogue.verdict.valuesScore}
                  className="h-1.5"
                />
              </div>
            </div>

            {/* Verdict Summary */}
            <div className="p-4 rounded-2xl bg-card border border-border/40 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Evaluator Summary
              </span>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {dialogue.verdict.summary}
              </p>
            </div>

            {/* Private Agent Debriefs Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                    <Image
                      src={dialogue.personAAvatar}
                      alt={dialogue.personAName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Agent A Confidential Debrief for {dialogue.personAName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;{dialogue.verdict.agentAComment}&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                    <Image
                      src={dialogue.personBAvatar}
                      alt={dialogue.personBName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Agent B Confidential Debrief for {dialogue.personBName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;{dialogue.verdict.agentBComment}&rdquo;
                </p>
              </div>
            </div>

            {/* Strengths & Friction Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Mutual Chemistry Drivers & Synergies
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {dialogue.verdict.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Potential Friction Points
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {dialogue.verdict.frictionPoints.map((frc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>{frc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3">
                <Link
                  href={`/profiles/${dialogue.personAId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "rounded-xl text-xs",
                  })}
                >
                  View {dialogue.personAName}&apos;s Dossier
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Link>
                <Link
                  href={`/profiles/${dialogue.personBId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "rounded-xl text-xs",
                  })}
                >
                  View {dialogue.personBName}&apos;s Dossier
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/rankings/${dialogue.personAId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "rounded-xl text-xs",
                  })}
                >
                  Check Mutual Rankings
                </Link>
                <Link
                  href="/dating"
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className:
                      "rounded-xl text-xs font-semibold bg-primary text-primary-foreground",
                  })}
                >
                  Simulate Another Date
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
