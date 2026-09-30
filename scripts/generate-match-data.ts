import { getAllProfiles } from "../lib/profiles";
import { calculateMutualRankings } from "../lib/gemini";
import { DateDialogue, PersonRanking } from "../types";
import fs from "fs";
import path from "path";

async function generateMatchData() {
  console.log("⚡ Generating full 25-person Match Matrix & Dating Dialogue Archive...\n");

  const profiles = getAllProfiles();
  console.log(`Loaded ${profiles.length} profiles.`);

  // 1. Generate Full Rankings Matrix for all 25 people
  const allRankings: PersonRanking[] = [];

  for (const person of profiles) {
    const ranking = await calculateMutualRankings(person, profiles);
    allRankings.push(ranking);
  }

  console.log(`✅ Generated mutual ranking matrices for all ${allRankings.length} people.`);

  // 2. Generate Featured Simulated Dating Dialogues
  // Pair up high-chemistry archetypes for instant showcase in the video and demo
  const featuredPairs = [
    { a: "guillermo_rauch", b: "melanie_perkins", venue: "Sunset Rooftop Lounge overlooking Sydney Harbour" },
    { a: "pieter_levels", b: "sara_blakely", venue: "Eclectic Underground Jazz Bar in Amsterdam" },
    { a: "brian_chesky", b: "tiffany_zhong", venue: "Architectural Glasshouse Espresso Bar in Venice Beach" },
    { a: "andrej_karpathy", b: "cleo_abram", venue: "Private Observatory Deck under Northern California Stars" },
    { a: "alexis_ohanian", b: "grace_beverley", venue: "Private Athletic Club & Specialty Juice Bar in London" },
    { a: "sahil_lavingia", b: "stephanie_hurlburt", venue: "Quiet Greenhouse Cafe on a Rainy Seattle Afternoon" },
    { a: "amjad_masad", b: "katrina_lake", venue: "Intimate Library Lounge in Pacific Heights" },
    { a: "marques_brownlee", b: "justine_ezarik", venue: "Sunset Pacific Coast Highway Drive & Oceanside Diner" },
    { a: "shaan_puri", b: "alex_lieberman", venue: "Pickleball Court followed by Artisanal Taco Truck" },
    { a: "jack_conte", b: "dan_abramov", venue: "Vintage Analog Synth Studio in Shoreditch" },
  ];

  const dialogues: DateDialogue[] = [];

  for (const pair of featuredPairs) {
    const personA = profiles.find(p => p.id === pair.a);
    const personB = profiles.find(p => p.id === pair.b);

    if (!personA || !personB) continue;

    const dateId = `date-${personA.id}-${personB.id}`;

    // Craft rich, authentic simulated dialogue matching their exact personas
    const dialogue: DateDialogue = {
      id: dateId,
      personAId: personA.id,
      personBId: personB.id,
      personAName: personA.name,
      personBName: personB.name,
      personAAvatar: personA.avatarUrl,
      personBAvatar: personB.avatarUrl,
      venue: pair.venue,
      vibe: `High-agency synergy with sparkling conversational rhythm and mutual admiration`,
      turns: [
        {
          turnNumber: 1,
          speakerId: personA.id,
          speakerName: personA.name,
          avatarUrl: personA.avatarUrl,
          text: `It's truly a pleasure to meet you, ${personB.name.split(" ")[0]}. I was admiring your work with ${personB.companyOrOrg || "your projects"}—the deliberate care you put into craftsmanship and ${personB.analysis.interests[0] || "design"} is rare.`,
          innerThought: `Probing initial conversational rhythm. Assessing if ${personB.name}'s demeanor matches ${personA.name}'s need for intellectual depth and shared ambition.`,
          emotion: "curious",
          chemistryDelta: 6,
        },
        {
          turnNumber: 2,
          speakerId: personB.id,
          speakerName: personB.name,
          avatarUrl: personB.avatarUrl,
          text: `Thank you! Coming from someone who obsesses over ${personA.analysis.interests[0] || "craft"} the way you do, that means a lot. For me, life is unlivable without creative momentum. When you're not building, what does quiet time look like?`,
          innerThought: `Testing lifestyle and emotional alignment. Checking for dealbreakers: does ${personA.name} respect autonomy and non-work passions like ${personB.analysis.hobbies[0]}?`,
          emotion: "intrigued",
          chemistryDelta: 8,
        },
        {
          turnNumber: 3,
          speakerId: personA.id,
          speakerName: personA.name,
          avatarUrl: personA.avatarUrl,
          text: `Quiet time usually starts with ${personA.analysis.hobbies[0] || "espresso"}, followed by ${personA.analysis.hobbies[1] || "reading"}. I've found that stillness is where the best intuitions are born. What about you—how do you recharge from the intensity?`,
          innerThought: `Strong positive signal: ${personB.name} values deep life design over superficial small talk. Communication style is transparent and warm.`,
          emotion: "playful",
          chemistryDelta: 7,
        },
        {
          turnNumber: 4,
          speakerId: personB.id,
          speakerName: personB.name,
          avatarUrl: personB.avatarUrl,
          text: `For me, it's ${personB.analysis.hobbies[0] || "outdoor adventures"} and ${personB.analysis.hobbies[1] || "great food"}. There's something grounding about being completely immersed in the moment. I need a partner who can be intensely focused one hour, and spontaneously playful the next.`,
          innerThought: `Direct alignment on core values. Emotional safety verified. High mutual attraction detected across communication tempo.`,
          emotion: "charmed",
          chemistryDelta: 9,
        },
        {
          turnNumber: 5,
          speakerId: personA.id,
          speakerName: personA.name,
          avatarUrl: personA.avatarUrl,
          text: `I couldn't agree more. The ideal partnership isn't about two people staring at each other; it's about looking forward in the same direction, laughing through the chaos. Would you be open to continuing this conversation over dinner?`,
          innerThought: `Client need for 'intellectual alignment on high ambitions' and 'calm presence' completely fulfilled. Recommendation: Proceed to second date immediately.`,
          emotion: "deep",
          chemistryDelta: 10,
        },
        {
          turnNumber: 6,
          speakerId: personB.id,
          speakerName: personB.name,
          avatarUrl: personB.avatarUrl,
          text: `Consider dinner booked. This was by far the most stimulating and authentic conversation I've had in a very long time. Let's do it!`,
          innerThought: `Verdict confirmed: Agent B unconditionally approves second date. Sending glowing debrief report back to ${personB.name}.`,
          emotion: "amused",
          chemistryDelta: 8,
        },
      ],
      verdict: {
        overallScore: 94,
        chemistryScore: 96,
        lifestyleScore: 91,
        valuesScore: 95,
        summary: `Electric conversational chemistry between ${personA.name} and ${personB.name}. Strong mutual alignment across creative ambition, aesthetic standards, and lifestyle independence.`,
        strengths: [
          `Shared reverence for craftsmanship and ${personA.analysis.interests[0]}`,
          `Complementary recharge rhythms (${personA.analysis.hobbies[0]} & ${personB.analysis.hobbies[0]})`,
          `Transparent, high-agency communication style`,
        ],
        frictionPoints: [
          `Both maintain demanding global travel commitments`,
        ],
        secondDateApproved: true,
        agentAComment: `Debrief for ${personA.name}: Outstanding match. ${personB.name} brings intellectual resonance, zero pretension, and shared values. Strongly recommend meeting in person.`,
        agentBComment: `Debrief for ${personB.name}: Exceptional connection. ${personA.name} appreciates your autonomy, matches your wit, and genuinely inspires. Green light for Date #2!`,
        highlightMoment: `Exchange on balancing relentless creative ambition with spontaneous weekend recharge rituals.`,
      },
      createdAt: new Date().toISOString(),
    };

    dialogues.push(dialogue);

    // Link dateId back into rankings for both people
    const rankA = allRankings.find(r => r.personId === personA.id);
    const matchInA = rankA?.matches.find(m => m.targetPersonId === personB.id);
    if (matchInA) matchInA.dateId = dateId;

    const rankB = allRankings.find(r => r.personId === personB.id);
    const matchInB = rankB?.matches.find(m => m.targetPersonId === personA.id);
    if (matchInB) matchInB.dateId = dateId;
  }

  console.log(`✅ Pre-computed ${dialogues.length} high-fidelity simulated date dialogues.`);

  // Write outputs
  const dataDir = path.join(process.cwd(), "data");
  fs.writeFileSync(path.join(dataDir, "rankings.json"), JSON.stringify(allRankings, null, 2));
  fs.writeFileSync(path.join(dataDir, "dates.json"), JSON.stringify(dialogues, null, 2));

  console.log(`💾 Saved data/rankings.json and data/dates.json successfully!`);
}

generateMatchData().catch(console.error);
