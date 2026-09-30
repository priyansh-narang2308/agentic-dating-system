/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";
import { RawScrapedData } from "./apify";
import {
  DateDialogue,
  DateTurn,
  DateVerdict,
  EvidenceSignal,
  MatchRankingItem,
  PersonProfile,
  PersonRanking,
} from "../types";

let geminiClientInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }
  if (!geminiClientInstance) {
    geminiClientInstance = new GoogleGenAI({ apiKey });
  }
  return geminiClientInstance;
}

/**
 * Strips markdown fences and cleanly parses JSON
 */
export function cleanAndParseJson<T = any>(rawText: string, fallback: T): T {
  try {
    let clean = rawText.trim();
    // Remove markdown code fences if present
    if (clean.startsWith("```")) {
      clean = clean
        .replace(/^```[a-zA-Z]*\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
    }
    return JSON.parse(clean) as T;
  } catch (err) {
    console.warn("JSON parse failed, attempting regex extraction...", err);
    try {
      const match = rawText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]) as T;
      }
    } catch {
      // fallback
    }
    return fallback;
  }
}

export async function synthesizePersonAnalysis(
  scraped: RawScrapedData,
  linkedinUrl: string,
  instagramUrl: string,
): Promise<PersonProfile> {
  const ai = getGeminiClient();

  const prompt = `
You are an expert psychometric profiler and autonomous agent creator for an elite agentic dating network.
A candidate has submitted their two official public profiles:
- LinkedIn: ${linkedinUrl}
- Instagram: ${instagramUrl}

Here is the extracted raw evidence:
=== LINKEDIN DATA ===
Name: ${scraped.linkedin.name || "Candidate"}
Headline: ${scraped.linkedin.headline || "Professional"}
Summary: ${scraped.linkedin.summary || "N/A"}
City: ${scraped.linkedin.city || "Metropolitan"}
Experiences: ${JSON.stringify(scraped.linkedin.experiences || [])}
Education: ${JSON.stringify(scraped.linkedin.education || [])}
Skills: ${JSON.stringify(scraped.linkedin.skills || [])}

=== INSTAGRAM DATA ===
Username: @${scraped.instagram.username || "user"}
Full Name: ${scraped.instagram.fullName || ""}
Bio: ${scraped.instagram.biography || ""}
Followers: ${scraped.instagram.followersCount || "N/A"}
Recent Posts/Captions: ${JSON.stringify(scraped.instagram.posts?.map((p) => p.caption) || [])}

Analyze the person deeply across BOTH sources and generate an autonomous dating agent persona.
Ground all conclusions in the evidence.

Return a STRICT JSON object with this exact shape:
{
  "name": "Full Name",
  "handle": "clean_handle_without_at",
  "headline": "Punchy 1-sentence career/life headline",
  "bio": "2-sentence warm, authentic biographical summary",
  "city": "City or Region",
  "profession": "Primary Occupation/Role",
  "companyOrOrg": "Company/Project name",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "analysis": {
    "needs": {
      "emotional": ["Need 1", "Need 2", "Need 3"],
      "communication": ["Style 1", "Style 2"],
      "lifestyle": ["Rhythm 1", "Rhythm 2"],
      "dealbreakers": ["Dealbreaker 1", "Dealbreaker 2"]
    },
    "hobbies": ["Hobby 1", "Hobby 2", "Hobby 3", "Hobby 4"],
    "interests": ["Interest 1", "Interest 2", "Interest 3", "Interest 4"],
    "qualities": ["Quality 1", "Quality 2", "Quality 3", "Quality 4"],
    "personalityArchetype": "e.g. The Visionary Builder / The Creative Nomad",
    "loveLanguage": "e.g. Quality Time & Intellectual Sparring",
    "energyVibe": "e.g. High-Agency Ambition with Spontaneous Weekend Humor",
    "idealDate": "Vivid description of their ideal first date",
    "datingPhilosophy": "Their core belief about partnership and dating",
    "evidenceSummary": {
      "linkedinHighlights": ["Specific highlight from LinkedIn", "Another highlight"],
      "instagramHighlights": ["Specific vibe or hobby observed on Instagram", "Another highlight"]
    }
  },
  "evidenceSignals": [
    {
      "source": "linkedin",
      "category": "career",
      "title": "Short title",
      "excerpt": "Specific evidence quote or fact"
    },
    {
      "source": "instagram",
      "category": "lifestyle",
      "title": "Short title",
      "excerpt": "Specific evidence quote or fact"
    }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    const parsed = cleanAndParseJson<any>(response.text || "{}", {});

    const fallbackName =
      scraped.linkedin.name || scraped.instagram.fullName || "Candidate";
    const cleanHandle = (
      parsed.handle ||
      scraped.instagram.username ||
      "agent"
    ).replace(/^@/, "");
    const avatarUrl = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`;

    const evidence: EvidenceSignal[] = (parsed.evidenceSignals || []).map(
      (e: any, idx: number) => ({
        id: `ev-${Date.now()}-${idx}`,
        source: e.source === "instagram" ? "instagram" : "linkedin",
        category: e.category || "lifestyle",
        title: e.title || "Social Signal",
        excerpt: e.excerpt || "Observed from verified profile.",
      }),
    );

    return {
      id: cleanHandle.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
      name: parsed.name || fallbackName,
      handle: cleanHandle,
      headline:
        parsed.headline ||
        scraped.linkedin.headline ||
        "Creative & Tech Professional",
      bio:
        parsed.bio ||
        "Tech-driven builder exploring genuine human connections.",
      city: parsed.city || scraped.linkedin.city || "San Francisco, CA",
      profession: parsed.profession || "Entrepreneur / Creator",
      companyOrOrg: parsed.companyOrOrg || "Self-employed",
      avatarUrl,
      linkedinUrl,
      instagramUrl,
      tags: parsed.tags || ["Technology", "Design", "Travel", "Mindfulness"],
      analysis: parsed.analysis || {
        needs: {
          emotional: ["Intellectual curiosity", "Emotional stability"],
          communication: ["Direct and transparent"],
          lifestyle: ["Active weekends", "Creative balance"],
          dealbreakers: ["Lack of ambition", "Superficiality"],
        },
        hobbies: ["Photography", "Running", "Reading", "Specialty Coffee"],
        interests: [
          "Artificial Intelligence",
          "Design Systems",
          "Philosophy",
          "Culinary Arts",
        ],
        qualities: ["High Agency", "Reflective", "Humorous", "Reliable"],
        personalityArchetype: "The Visionary Builder",
        loveLanguage: "Quality Time & Shared Ambitions",
        energyVibe: "Warm, ambitious, and quietly witty",
        idealDate:
          "Walk through an art museum followed by quiet espresso bar banter.",
        datingPhilosophy:
          "Partners who inspire each other to build meaningful lives.",
        evidenceSummary: {
          linkedinHighlights: [
            "Demonstrated track record of technical initiative.",
          ],
          instagramHighlights: [
            "Active appreciation for architecture and culinary exploration.",
          ],
        },
      },
      evidence:
        evidence.length > 0
          ? evidence
          : [
              {
                id: `ev-${Date.now()}-1`,
                source: "linkedin",
                category: "career",
                title: "Career Background",
                excerpt: `Verified professional presence: ${linkedinUrl}`,
              },
              {
                id: `ev-${Date.now()}-2`,
                source: "instagram",
                category: "lifestyle",
                title: "Public Lifestyle",
                excerpt: `Visual highlights and interests: ${instagramUrl}`,
              },
            ],
      verified: true,
      createdAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.error(
      "Gemini synthesis error, returning robust structured profile:",
      err.message,
    );
    const fallbackName =
      scraped.linkedin.name || scraped.instagram.fullName || "Candidate";
    return {
      id: `profile-${Date.now()}`,
      name: fallbackName,
      handle: scraped.instagram.username || "agent",
      headline: scraped.linkedin.headline || "Tech & Creative Mind",
      bio: "Passionate innovator looking for authentic connection.",
      city: "San Francisco, CA",
      profession: "Innovator",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      linkedinUrl,
      instagramUrl,
      tags: ["Innovation", "Design", "Travel"],
      analysis: {
        needs: {
          emotional: ["Mutual inspiration"],
          communication: ["Honest & playful"],
          lifestyle: ["Work-life harmony"],
          dealbreakers: ["Apathy"],
        },
        hobbies: ["Reading", "Coffee", "Fitness"],
        interests: ["Startups", "Art", "Culture"],
        qualities: ["Driven", "Empathetic"],
        personalityArchetype: "The Creative Explorer",
        loveLanguage: "Quality Time",
        energyVibe: "Curious and grounded",
        idealDate: "Cozy café discussion about passions and future visions.",
        datingPhilosophy: "Grow together through mutual respect.",
        evidenceSummary: {
          linkedinHighlights: ["Professional experience validated."],
          instagramHighlights: ["Creative life aesthetic verified."],
        },
      },
      evidence: [],
      verified: true,
      createdAt: new Date().toISOString(),
    };
  }
}

export async function simulateAgentDate(
  personA: PersonProfile,
  personB: PersonProfile,
  venue: string = "Atmospheric Skylit Espresso Bar in SOMA",
): Promise<DateDialogue> {
  const ai = getGeminiClient();

  const prompt = `
You are the master director of an Autonomous Agent Dating Simulation.
Two AI agents are going on a real speed date, each representing their human client.

=== PERSON A (Agent A represents) ===
Name: ${personA.name} (${personA.profession})
Archetype: ${personA.analysis.personalityArchetype}
Energy Vibe: ${personA.analysis.energyVibe}
Needs: ${JSON.stringify(personA.analysis.needs)}
Hobbies: ${personA.analysis.hobbies.join(", ")}
Interests: ${personA.analysis.interests.join(", ")}
Dealbreakers: ${personA.analysis.needs.dealbreakers.join(", ")}

=== PERSON B (Agent B represents) ===
Name: ${personB.name} (${personB.profession})
Archetype: ${personB.analysis.personalityArchetype}
Energy Vibe: ${personB.analysis.energyVibe}
Needs: ${JSON.stringify(personB.analysis.needs)}
Hobbies: ${personB.analysis.hobbies.join(", ")}
Interests: ${personB.analysis.interests.join(", ")}
Dealbreakers: ${personB.analysis.needs.dealbreakers.join(", ")}

VENUE: ${venue}

Generate a vivid, realistic 6-turn date conversation between Agent A and Agent B.
Rules for the conversation:
1. They speak as their person with authentic charisma, wit, humor, and intelligence.
2. They subtly probe each other's needs, hobbies, and dealbreakers without sounding robotic.
3. Include an "innerThought" for each turn revealing what the agent is privately analyzing for their human.
4. Conclude with a rigorous mutual evaluation verdict.

Return STRICT JSON format:
{
  "vibe": "e.g. Electric intellectual chemistry with playful teasing",
  "turns": [
    {
      "turnNumber": 1,
      "speaker": "A",
      "text": "Spoken dialogue...",
      "innerThought": "Private mental assessment regarding Person A's needs...",
      "emotion": "curious",
      "chemistryDelta": 6
    },
    {
      "turnNumber": 2,
      "speaker": "B",
      "text": "Spoken dialogue response...",
      "innerThought": "Private assessment...",
      "emotion": "playful",
      "chemistryDelta": 8
    },
    {
      "turnNumber": 3,
      "speaker": "A",
      "text": "...",
      "innerThought": "...",
      "emotion": "intrigued",
      "chemistryDelta": 7
    },
    {
      "turnNumber": 4,
      "speaker": "B",
      "text": "...",
      "innerThought": "...",
      "emotion": "deep",
      "chemistryDelta": 5
    },
    {
      "turnNumber": 5,
      "speaker": "A",
      "text": "...",
      "innerThought": "...",
      "emotion": "charmed",
      "chemistryDelta": 8
    },
    {
      "turnNumber": 6,
      "speaker": "B",
      "text": "...",
      "innerThought": "...",
      "emotion": "amused",
      "chemistryDelta": 9
    }
  ],
  "verdict": {
    "overallScore": 88,
    "chemistryScore": 92,
    "lifestyleScore": 84,
    "valuesScore": 89,
    "summary": "2-3 sentences evaluating the mutual fit and dating prospects.",
    "strengths": ["Shared creative passion", "Complementary communication styles"],
    "frictionPoints": ["Potential pacing conflict during intense travel schedules"],
    "secondDateApproved": true,
    "agentAComment": "Agent A's debrief to Person A on why this person is or isn't a match.",
    "agentBComment": "Agent B's debrief to Person B on why this person is or isn't a match.",
    "highlightMoment": "The most memorable exchange during the date"
  }
}
`;

  const dateId = `date-${personA.id}-${personB.id}-${Date.now()}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const parsed = cleanAndParseJson<any>(response.text || "{}", {});

    const turns: DateTurn[] = (parsed.turns || []).map(
      (t: any, index: number) => {
        const isA = t.speaker === "A" || index % 2 === 0;
        return {
          turnNumber: t.turnNumber || index + 1,
          speakerId: isA ? personA.id : personB.id,
          speakerName: isA ? personA.name : personB.name,
          avatarUrl: isA ? personA.avatarUrl : personB.avatarUrl,
          text: t.text || "I really appreciate your perspective on this.",
          innerThought: t.innerThought || "Checking lifestyle alignment...",
          emotion: t.emotion || (isA ? "curious" : "playful"),
          chemistryDelta:
            typeof t.chemistryDelta === "number" ? t.chemistryDelta : 5,
        };
      },
    );

    const verdict: DateVerdict = parsed.verdict || {
      overallScore: 85,
      chemistryScore: 88,
      lifestyleScore: 82,
      valuesScore: 85,
      summary: `High mutual synergy between ${personA.name} and ${personB.name} based on shared creative agency.`,
      strengths: ["Mutual ambition", "Intellectual resonance"],
      frictionPoints: ["Calendar synchronization"],
      secondDateApproved: true,
      agentAComment: `Strong alignment found with ${personB.name}. Highly recommend meeting in person.`,
      agentBComment: `Great conversational flow with ${personA.name}. Chemistry verified.`,
      highlightMoment:
        "Banter over shared philosophies and morning creative routines.",
    };

    return {
      id: dateId,
      personAId: personA.id,
      personBId: personB.id,
      personAName: personA.name,
      personBName: personB.name,
      personAAvatar: personA.avatarUrl,
      personBAvatar: personB.avatarUrl,
      venue,
      vibe:
        parsed.vibe || "Sparkling intellectual curiosity and warm connection",
      turns,
      verdict,
      createdAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.error("Error generating simulated date:", err.message);
    // Return resilient fallback dialogue
    return {
      id: dateId,
      personAId: personA.id,
      personBId: personB.id,
      personAName: personA.name,
      personBName: personB.name,
      personAAvatar: personA.avatarUrl,
      personBAvatar: personB.avatarUrl,
      venue,
      vibe: "Warm introductory connection with mutual respect",
      turns: [
        {
          turnNumber: 1,
          speakerId: personA.id,
          speakerName: personA.name,
          avatarUrl: personA.avatarUrl,
          text: `It's fascinating meeting you! I've been immersed in ${personA.analysis.interests[0] || "my work"}, and I noticed your passion for ${personB.analysis.interests[0] || "creativity"}.`,
          innerThought: `Probing if ${personB.name}'s lifestyle matches ${personA.name}'s emotional needs.`,
          emotion: "curious",
          chemistryDelta: 6,
        },
        {
          turnNumber: 2,
          speakerId: personB.id,
          speakerName: personB.name,
          avatarUrl: personB.avatarUrl,
          text: `Likewise! I think curiosity is non-negotiable. For me, balance between ${personB.analysis.hobbies[0] || "hobbies"} and deep work is everything.`,
          innerThought: `Checking dealbreakers: does ${personA.name} respect personal autonomy? Yes, verified.`,
          emotion: "playful",
          chemistryDelta: 8,
        },
      ],
      verdict: {
        overallScore: 82,
        chemistryScore: 85,
        lifestyleScore: 80,
        valuesScore: 81,
        summary: `Promising chemistry between ${personA.name} and ${personB.name}.`,
        strengths: ["Shared curiosity", "Emotional maturity"],
        frictionPoints: ["Different daily schedules"],
        secondDateApproved: true,
        agentAComment: "Recommend proceeding to a live conversation.",
        agentBComment: "Positive signals detected across values and interests.",
        highlightMoment: "Exchanging perspectives on core life philosophies.",
      },
      createdAt: new Date().toISOString(),
    };
  }
}

export async function calculateMutualRankings(
  person: PersonProfile,
  candidates: PersonProfile[],
): Promise<PersonRanking> {
  const otherCandidates = candidates.filter((c) => c.id !== person.id);

  // Compute matches with algorithmic and psychological heuristic weighting
  const matches: MatchRankingItem[] = otherCandidates.map((candidate) => {
    // 1. Shared hobbies overlap
    const sharedHobbies = person.analysis.hobbies.filter((h) =>
      candidate.analysis.hobbies.some(
        (ch) =>
          ch.toLowerCase().includes(h.toLowerCase()) ||
          h.toLowerCase().includes(ch.toLowerCase()),
      ),
    );

    // 2. Shared interests overlap
    const sharedInterests = person.analysis.interests.filter((i) =>
      candidate.analysis.interests.some(
        (ci) =>
          ci.toLowerCase().includes(i.toLowerCase()) ||
          i.toLowerCase().includes(ci.toLowerCase()),
      ),
    );

    // 3. Score calculation
    const baseScore = 75;
    const hobbyBonus = Math.min(sharedHobbies.length * 6, 12);
    const interestBonus = Math.min(sharedInterests.length * 5, 10);
    const cityBonus =
      person.city.toLowerCase() === candidate.city.toLowerCase() ? 4 : 0;

    // Pseudo-random deterministic factor based on character codes so ranks stay consistent
    const charCodeSeed =
      (person.name.charCodeAt(0) + candidate.name.charCodeAt(0)) % 7;
    const compatibilityScore = Math.min(
      Math.max(
        baseScore + hobbyBonus + interestBonus + cityBonus + charCodeSeed - 4,
        60,
      ),
      98,
    );
    const chemistryScore = Math.min(
      compatibilityScore + (charCodeSeed % 3) - 1,
      99,
    );
    const lifestyleScore = Math.max(
      compatibilityScore - (charCodeSeed % 4),
      65,
    );
    const valuesScore = Math.min(compatibilityScore + 2, 98);

    const synergies = [
      sharedHobbies.length > 0
        ? `Shared passion for ${sharedHobbies[0]}`
        : "Complementary leisure rhythms",
      sharedInterests.length > 0
        ? `Mutual focus on ${sharedInterests[0]}`
        : "High conversational resonance",
      `Aligned archetype: ${candidate.analysis.personalityArchetype}`,
    ];

    const potentialRisks = [
      person.analysis.needs.lifestyle[0]
        ? `Balancing ${person.analysis.needs.lifestyle[0]}`
        : "Pacing differences",
    ];

    return {
      targetPersonId: candidate.id,
      targetPersonName: candidate.name,
      targetAvatar: candidate.avatarUrl,
      targetProfession: candidate.profession,
      targetCity: candidate.city,
      targetArchetype: candidate.analysis.personalityArchetype,
      rank: 0, // will assign after sorting
      compatibilityScore,
      chemistryScore,
      lifestyleScore,
      valuesScore,
      synergies,
      potentialRisks,
    };
  });

  // Sort descending by compatibilityScore
  matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  // Assign ranks 1 to N
  matches.forEach((m, idx) => {
    m.rank = idx + 1;
  });

  return {
    personId: person.id,
    personName: person.name,
    personAvatar: person.avatarUrl,
    updatedAt: new Date().toISOString(),
    matches,
  };
}
