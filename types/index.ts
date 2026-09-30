/**
 * Core Domain Schema for Agentic Dating System
 * Grounded in two official sources: LinkedIn + Instagram
 */

export type SourceType = 'linkedin' | 'instagram';

export interface EvidenceSignal {
  id: string;
  source: SourceType;
  category: 'career' | 'education' | 'lifestyle' | 'passion' | 'travel' | 'creative' | 'social';
  title: string;
  excerpt: string;
  timestamp?: string;
  url?: string;
}

export interface ExtractedNeeds {
  emotional: string[];       // Core emotional desires (e.g. intellectual sparring, calm presence)
  communication: string[];   // Communication style (e.g. direct, witty, thoughtful async)
  lifestyle: string[];       // Day-to-day rhythm (e.g. early morning gym, spontaneous weekend trips)
  dealbreakers: string[];    // Absolute no-gos identified by the agent
}

export interface ExtractedAnalysis {
  needs: ExtractedNeeds;
  hobbies: string[];          // Verified pastimes from Instagram & LinkedIn activities
  interests: string[];        // Intellectual, artistic, and cultural passions
  qualities: string[];        // Distinct personality traits, strengths & quirks
  personalityArchetype: string; // e.g. "The Visionary Architect", "The Creative Maverick"
  loveLanguage: string;       // e.g. "Quality Time & Intellectual Banter"
  energyVibe: string;         // e.g. "High-Agency Ambition with Bohemian Weekend Spirit"
  idealDate: string;          // Agent's generated concept for the perfect date
  datingPhilosophy: string;   // How this person approaches relationships
  evidenceSummary: {
    linkedinHighlights: string[];
    instagramHighlights: string[];
  };
}

export interface PersonProfile {
  id: string;
  name: string;
  handle: string;
  headline: string;
  bio: string;
  city: string;
  profession: string;
  companyOrOrg?: string;
  avatarUrl: string;
  coverImageUrl?: string;
  linkedinUrl: string;
  instagramUrl: string;
  tags: string[];
  analysis: ExtractedAnalysis;
  evidence: EvidenceSignal[];
  verified: boolean;
  createdAt: string;
}

export interface DateTurn {
  turnNumber: number;
  speakerId: string;
  speakerName: string;
  avatarUrl: string;
  text: string;
  innerThought: string; // Agent's internal monologue evaluating the match in real time
  emotion: 'curious' | 'playful' | 'intrigued' | 'skeptical' | 'charmed' | 'deep' | 'amused' | 'flustered';
  chemistryDelta: number; // -5 to +10 impact on this turn
}

export interface DateVerdict {
  overallScore: number;       // 0 - 100
  chemistryScore: number;     // 0 - 100
  lifestyleScore: number;     // 0 - 100
  valuesScore: number;        // 0 - 100
  summary: string;
  strengths: string[];
  frictionPoints: string[];
  secondDateApproved: boolean;
  agentAComment: string;      // What Agent A reported back to Person A
  agentBComment: string;      // What Agent B reported back to Person B
  highlightMoment: string;
}

export interface DateDialogue {
  id: string;
  personAId: string;
  personBId: string;
  personAName: string;
  personBName: string;
  personAAvatar: string;
  personBAvatar: string;
  venue: string;
  vibe: string;
  turns: DateTurn[];
  verdict: DateVerdict;
  createdAt: string;
}

export interface MatchRankingItem {
  targetPersonId: string;
  targetPersonName: string;
  targetAvatar: string;
  targetProfession: string;
  targetCity: string;
  targetArchetype: string;
  rank: number;
  compatibilityScore: number;
  chemistryScore: number;
  lifestyleScore: number;
  valuesScore: number;
  synergies: string[];
  potentialRisks: string[];
  dateId?: string; // Link to the simulated date dialogue if already simulated
}

export interface PersonRanking {
  personId: string;
  personName: string;
  personAvatar: string;
  updatedAt: string;
  matches: MatchRankingItem[];
}

export interface LiveIngestRequest {
  linkedinUrl: string;
  instagramUrl: string;
}

export interface LiveIngestResponse {
  success: boolean;
  person?: PersonProfile;
  error?: string;
  logs: string[];
}
