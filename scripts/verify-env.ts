/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApifyClient } from "apify-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function verifyEnvironment() {
  console.log("🔍 [Task 1 Verification] Checking Environment & SDKs...\n");

  const apifyToken = process.env.APIFY_API_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // 1. Verify Apify
  if (!apifyToken) {
    console.error("❌ APIFY_API_TOKEN is missing in environment.");
  } else {
    try {
      console.log("⏳ Testing Apify Client authentication...");
      const apify = new ApifyClient({ token: apifyToken });
      const user = await apify.user().get();
      console.log(`✅ Apify Authenticated Successfully!`);
      console.log(`   User ID: ${user.id}`);
      console.log(
        `   Username: ${user.username || user.email || "Active User"}`,
      );
    } catch (err: any) {
      console.error("❌ Apify Authentication Error:", err.message);
    }
  }

  console.log("\n------------------------------------------------\n");

  // 2. Verify Gemini
  if (!geminiApiKey) {
    console.error("❌ GEMINI_API_KEY is missing in environment.");
  } else {
    try {
      console.log("⏳ Testing Gemini API with test prompt...");
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const response = await model.generateContent(
        "Respond with the exact phrase: 'Agentic Dating System Ready'",
      );
      const text = response.response.text();
      console.log(`✅ Gemini API Responded Successfully!`);
      console.log(`   Model Output: "${text.trim()}"`);
    } catch (err: any) {
      console.warn("⚠️ Standard Gemini Flash test note:", err.message);
      // Try fallback to gemini-1.5-flash
      try {
        console.log("⏳ Retrying with gemini-1.5-flash...");
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = await model.generateContent(
          "Respond with: 'Agentic Dating System Ready'",
        );
        console.log(
          `✅ Gemini (1.5-flash) Responded: "${response.response.text().trim()}"`,
        );
      } catch (err2: any) {
        console.error("❌ Gemini API Error:", err2.message);
      }
    }
  }

  console.log("\n🚀 Task 1 Verification Complete!");
}

verifyEnvironment().catch(console.error);
