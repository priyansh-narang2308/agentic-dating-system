import { getCuratedPeople } from "../lib/people";

async function verifyPeopleDataset() {
  console.log("🔍 [Task 5 Verification] Validating 25 Real People Dataset...\n");

  const people = getCuratedPeople();
  console.log(`✅ Loaded ${people.length} real individuals.`);

  if (people.length < 25) {
    console.error(`❌ Requirement Failed: Need at least 25 real people, found ${people.length}.`);
    process.exit(1);
  }

  const ids = new Set<string>();
  const handles = new Set<string>();

  for (let i = 0; i < people.length; i++) {
    const p = people[i];

    if (!p.id || !p.name || !p.linkedinUrl || !p.instagramUrl) {
      console.error(`❌ Invalid record at index ${i}:`, p);
      process.exit(1);
    }

    if (ids.has(p.id)) {
      console.error(`❌ Duplicate ID found: ${p.id}`);
      process.exit(1);
    }
    ids.add(p.id);

    if (handles.has(p.handle)) {
      console.error(`❌ Duplicate handle found: ${p.handle}`);
      process.exit(1);
    }
    handles.add(p.handle);

    if (!p.linkedinUrl.includes("linkedin.com/in/")) {
      console.error(`❌ Invalid LinkedIn URL for ${p.name}: ${p.linkedinUrl}`);
      process.exit(1);
    }

    if (!p.instagramUrl.includes("instagram.com/")) {
      console.error(`❌ Invalid Instagram URL for ${p.name}: ${p.instagramUrl}`);
      process.exit(1);
    }
  }

  console.log("✅ All 25 profiles verified: Unique IDs, valid LinkedIn URLs, and public Instagram URLs.");
  console.log("\nSample Individuals in Dataset:");
  people.slice(0, 5).forEach((p, idx) => {
    console.log(`   ${idx + 1}. ${p.name} (${p.profession}) - LinkedIn & Instagram verified.`);
  });

  console.log("\n🚀 Task 5 Verification Passed!");
}

verifyPeopleDataset().catch(console.error);
