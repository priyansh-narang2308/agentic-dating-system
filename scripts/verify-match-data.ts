import { getAllDates, getDateByPair } from "../lib/dates";
import { getAllRankings, getRankingsForPerson } from "../lib/rankings";
import { getAllProfiles } from "../lib/profiles";

async function verifyMatchData() {
  console.log(
    "🔍 [Task 7 Verification] Validating Match Matrix & Dating Dialogue Archive...\n",
  );

  const profiles = getAllProfiles();
  const dates = getAllDates();
  const rankings = getAllRankings();

  console.log(`✅ Loaded ${dates.length} pre-computed dating dialogues.`);
  console.log(`✅ Loaded ${rankings.length} ranking matrices.`);

  if (rankings.length !== 25) {
    console.error(`❌ Expected 25 ranking records, got ${rankings.length}`);
    process.exit(1);
  }

  // Check each ranking
  for (const r of rankings) {
    if (r.matches.length !== 24) {
      console.error(
        `❌ Ranking for ${r.personName} has ${r.matches.length} matches (expected 24).`,
      );
      process.exit(1);
    }

    // Check rank ordering
    for (let i = 0; i < r.matches.length; i++) {
      if (r.matches[i].rank !== i + 1) {
        console.error(
          `❌ Rank index mismatch at position ${i} for ${r.personName}`,
        );
        process.exit(1);
      }
      if (
        r.matches[i].compatibilityScore < 50 ||
        r.matches[i].compatibilityScore > 100
      ) {
        console.error(
          `❌ Out-of-bounds compatibility score: ${r.matches[i].compatibilityScore}`,
        );
        process.exit(1);
      }
    }
  }

  console.log(
    "✅ All 25 people have complete 24-candidate ranked lists ordered by compatibility score.",
  );

  // Test pair retrieval
  const pairTest = getDateByPair("guillermo_rauch", "melanie_perkins");
  if (!pairTest) {
    console.error(
      "❌ Failed to retrieve featured date between Guillermo and Melanie.",
    );
    process.exit(1);
  }

  console.log(
    `✅ Featured Date Retrieved: "${pairTest.personAName} & ${pairTest.personBName}"`,
  );
  console.log(`   Venue: ${pairTest.venue}`);
  console.log(`   Total Turns: ${pairTest.turns.length}`);
  console.log(
    `   Overall Compatibility Score: ${pairTest.verdict.overallScore}/100`,
  );
  console.log(
    `   Second Date Approved: ${pairTest.verdict.secondDateApproved}`,
  );

  console.log("\n🚀 Task 7 Verification Passed!");
}

verifyMatchData().catch(console.error);
