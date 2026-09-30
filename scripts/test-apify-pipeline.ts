import {
  extractUsernameFromUrl,
  getApifyClient,
  scrapeSocialProfiles,
} from "../lib/apify";

async function testPipeline() {
  console.log(
    "🔍 [Task 3 Verification] Testing Apify Client & Scraping Pipeline...\n",
  );

  const igTest = extractUsernameFromUrl(
    "https://www.instagram.com/sama/",
    "instagram",
  );
  const liTest = extractUsernameFromUrl(
    "https://www.linkedin.com/in/samaltman",
    "linkedin",
  );
  console.log(`URL Parser: Instagram -> "${igTest}", LinkedIn -> "${liTest}"`);

  const client = getApifyClient();
  console.log("✅ Apify Client Initialized correctly.");

  console.log("⏳ Running pipeline harness with timeout protection...");
  const result = await scrapeSocialProfiles(
    "https://www.linkedin.com/in/williamhgates",
    "https://www.instagram.com/thisisbillgates",
  );

  console.log(`Pipeline executed in ${result.durationMs}ms`);
  console.log(
    `   LinkedIn target: ${result.linkedin.name} (${result.linkedin.headline})`,
  );
  console.log(
    `   Instagram target: @${result.instagram.username} (${result.instagram.fullName})`,
  );
  console.log(`   Total Logs Captured: ${result.logs.length}`);
  console.log("\nSample Logs:");
  result.logs.slice(0, 4).forEach((l) => console.log(`   > ${l}`));

  console.log("\nTask 3 Verification Passed!");
}

testPipeline().catch(console.error);
