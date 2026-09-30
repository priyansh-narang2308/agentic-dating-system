export interface EvidenceItem {
  source: 'linkedin' | 'instagram';
  category: 'career' | 'education' | 'lifestyle' | 'passion' | 'quote' | 'aesthetic';
  title: string;
  detail: string;
  url?: string;
}

export interface ExtractedAnalysis {
  needs: {
    emotional: string[];
    communication: string[];
    lifestyle: string[];
    dealbreakers: string[];
  };
  hobbies: string[];
  interests: string[];
  qualities: string[];
  personalityArchetype: string;
  loveLanguage: string;
  energyVibe: string;
  idealDate: string;
  datingPhilosophy: string;
}

export interface PersonProfile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  city: string;
  profession: string;
  companyOrOrg?: string;
  avatarUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  tags: string[];
  archetype: string;
  analysis: ExtractedAnalysis;
  evidence: EvidenceItem[];
  verified: boolean;
  createdAt: string;
}

export interface DateTurn {
  turnNumber: number;
  speakerId: string;
  speakerName: string;
  avatarUrl: string;
  text: string;
  innerThought: string;
  emotion: 'curious' | 'playful' | 'intrigued' | 'skeptical' | 'charmed' | 'deep' | 'amused';
}

export interface DateVerdict {
  overallScore: number; // 0 - 100
  chemistryScore: number; // 0 - 100
  lifestyleScore: number; // 0 - 100
  valuesScore: number; // 0 - 100
  summary: string;
  strengths: string[];
  frictionPoints: string[];
  secondDateApproved: boolean;
  agentAComment: string;
  agentBComment: string;
  highlightMoment: string;
}

export interface DateDialogue {
  id: string;
  personAId: string;
  personBId: string;
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
  targetArchetype: string;
  rank: number;
  compatibilityScore: number;
  chemistryScore: number;
  lifestyleScore: number;
  synergies: string[];
  potentialRisks: string[];
  dateId?: string;
}

export interface PersonRanking {
  personId: string;
  matches: MatchRankingItem[];
}
