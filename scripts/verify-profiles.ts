import { getAllProfiles } from "../lib/profiles";

async function verifyProfilesDataset() {
  console.log("🔍 [Task 6 Verification] Validating 25 High-Fidelity Persona Dossiers...\n");

  const profiles = getAllProfiles();
  console.log(`✅ Loaded ${profiles.length} complete agent personas.`);

  if (profiles.length < 25) {
    console.error(`❌ Requirement Failed: Need at least 25 real people, found ${profiles.length}.`);
    process.exit(1);
  }

  const ids = new Set<string>();

  for (let i = 0; i < profiles.length; i++) {
    const p = profiles[i];

    if (!p.id || !p.name || !p.headline || !p.bio || !p.linkedinUrl || !p.instagramUrl) {
      console.error(`❌ Incomplete base profile at index ${i}: ${p.name}`);
      process.exit(1);
    }

    if (ids.has(p.id)) {
      console.error(`❌ Duplicate ID: ${p.id}`);
      process.exit(1);
    }
    ids.add(p.id);

    // Verify Requirements from Challenge: Needs, Hobbies, Interests, and Qualities
    const { needs, hobbies, interests, qualities, personalityArchetype, loveLanguage, idealDate } = p.analysis;

    if (!needs || !needs.emotional || !needs.communication || !needs.lifestyle || !needs.dealbreakers) {
      console.error(`❌ Missing needs breakdown for ${p.name}`);
      process.exit(1);
    }

    if (!hobbies || hobbies.length === 0) {
      console.error(`❌ Missing hobbies for ${p.name}`);
      process.exit(1);
    }

    if (!interests || interests.length === 0) {
      console.error(`❌ Missing interests for ${p.name}`);
      process.exit(1);
    }

    if (!qualities || qualities.length === 0) {
      console.error(`❌ Missing qualities for ${p.name}`);
      process.exit(1);
    }

    if (!personalityArchetype || !loveLanguage || !idealDate) {
      console.error(`❌ Missing archetype or dating profile details for ${p.name}`);
      process.exit(1);
    }

    // Verify Evidence Grounding
    if (!p.evidence || p.evidence.length === 0) {
      console.error(`❌ Missing grounded evidence signals for ${p.name}`);
      process.exit(1);
    }

    const hasLinkedInEv = p.evidence.some(e => e.source === "linkedin");
    const hasInstagramEv = p.evidence.some(e => e.source === "instagram");

    if (!hasLinkedInEv || !hasInstagramEv) {
      console.error(`❌ Evidence must cite BOTH LinkedIn and Instagram for ${p.name}`);
      process.exit(1);
    }
  }

  console.log("✅ All 25 profiles verified: 100% compliant with needs, hobbies, interests, qualities, and two-source grounding.");
  console.log("\nSample Verified Persona Dossier:");
  const sample = profiles[0];
  console.log(`   Name: ${sample.name} (${sample.profession})`);
  console.log(`   Archetype: ${sample.analysis.personalityArchetype}`);
  console.log(`   Emotional Needs: ${sample.analysis.needs.emotional.join(" • ")}`);
  console.log(`   Hobbies: ${sample.analysis.hobbies.join(" • ")}`);
  console.log(`   Interests: ${sample.analysis.interests.join(" • ")}`);
  console.log(`   Qualities: ${sample.analysis.qualities.join(" • ")}`);
  console.log(`   Ideal Date: ${sample.analysis.idealDate}`);
  console.log(`   Evidence Cited: ${sample.evidence.length} signals (${sample.evidence.map(e => e.source).join(", ")})`);

  console.log("\n🚀 Task 6 Verification Passed!");
}

verifyProfilesDataset().catch(console.error);
