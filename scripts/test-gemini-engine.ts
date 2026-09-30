import { synthesizePersonAnalysis, simulateAgentDate, calculateMutualRankings } from "../lib/gemini";
import { RawScrapedData } from "../lib/apify";

async function testGeminiEngine() {
  console.log("🔍 [Task 4 Verification] Testing Gemini AI Engine...\n");

  const mockScraped: RawScrapedData = {
    linkedin: {
      name: "Sophia Vance",
      headline: "AI Research Lead & Robotics Enthusiast",
      summary: "Exploring multi-agent systems and bio-inspired robotics. Loves mountaineering.",
      city: "San Francisco, CA",
      experiences: [{ title: "AI Lead", company: "RoboLabs" }],
    },
    instagram: {
      username: "sophia_vance",
      fullName: "Sophia Vance",
      biography: "Coffee snob ☕ / Trail runner 🏔️ / Building curious machines 🤖",
      posts: [
        { caption: "Early morning trail run in Marin. Crisp air resets the mind." },
        { caption: "Late night lab session debugging neural locomotion controllers." },
      ],
    },
    logs: [],
    durationMs: 50,
  };

  console.log("⏳ 1. Testing Persona Synthesis via Gemini...");
  const profileA = await synthesizePersonAnalysis(
    mockScraped,
    "https://www.linkedin.com/in/sophia-vance",
    "https://www.instagram.com/sophia_vance"
  );
  console.log(`✅ Profile Synthesized: ${profileA.name} (@${profileA.handle})`);
  console.log(`   Archetype: ${profileA.analysis.personalityArchetype}`);
  console.log(`   Extracted Needs: ${profileA.analysis.needs.emotional.slice(0, 2).join(", ")}`);
  console.log(`   Extracted Hobbies: ${profileA.analysis.hobbies.join(", ")}`);
  console.log(`   Extracted Interests: ${profileA.analysis.interests.join(", ")}`);

  console.log("\n⏳ 2. Testing Multi-Turn Simulated Date...");
  // Create a complementary profile B
  const profileB = {
    ...profileA,
    id: "alex_chen",
    name: "Alex Chen",
    handle: "alex_chen",
    profession: "Creative Director & Sound Designer",
    analysis: {
      ...profileA.analysis,
      personalityArchetype: "The Creative Explorer",
      hobbies: ["Trail Running", "Vinyl Collecting", "Ceramics"],
      interests: ["Acoustics", "Architecture", "Coffee Roasting"],
    },
  };

  const dateDialogue = await simulateAgentDate(profileA, profileB, "Intimate candlelit jazz bar in Hayes Valley");
  console.log(`✅ Date Simulated: ${dateDialogue.turns.length} turns recorded.`);
  console.log(`   Date Vibe: "${dateDialogue.vibe}"`);
  console.log(`   Turn 1 [${dateDialogue.turns[0].speakerName}]: "${dateDialogue.turns[0].text}"`);
  console.log(`   Inner Thought: "${dateDialogue.turns[0].innerThought}"`);
  console.log(`   Turn 2 [${dateDialogue.turns[1]?.speakerName}]: "${dateDialogue.turns[1]?.text}"`);
  console.log(`   Verdict Overall Score: ${dateDialogue.verdict.overallScore}/100`);
  console.log(`   Second Date Approved: ${dateDialogue.verdict.secondDateApproved}`);

  console.log("\n⏳ 3. Testing Mutual Rankings Engine...");
  const rankings = await calculateMutualRankings(profileA, [profileA, profileB]);
  console.log(`✅ Rankings computed for ${rankings.personName}: Top match is ${rankings.matches[0].targetPersonName} (${rankings.matches[0].compatibilityScore}% Compatibility)`);

  console.log("\n🚀 Task 4 Verification Passed!");
}

testGeminiEngine().catch(console.error);
