/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { scrapeSocialProfiles } from "@/lib/apify";
import {
  synthesizePersonAnalysis,
  calculateMutualRankings,
} from "@/lib/gemini";
import { getAllProfiles, addCustomProfile } from "@/lib/profiles";
import { savePersonRanking } from "@/lib/rankings";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { linkedinUrl, instagramUrl } = body;

    if (!linkedinUrl || !instagramUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Both LinkedIn and Instagram URLs are strictly required.",
        },
        { status: 400 },
      );
    }

    if (!linkedinUrl.includes("linkedin.com/in/")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)",
        },
        { status: 400 },
      );
    }

    if (!instagramUrl.includes("instagram.com/")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid Instagram profile URL (e.g. https://www.instagram.com/username)",
        },
        { status: 400 },
      );
    }

    // Step 1: Ingest from Apify
    const scraped = await scrapeSocialProfiles(linkedinUrl, instagramUrl);

    // Step 2: Synthesize Persona via Gemini
    const newPerson = await synthesizePersonAnalysis(
      scraped,
      linkedinUrl,
      instagramUrl,
    );

    // Step 3: Add to pool
    addCustomProfile(newPerson);

    // Step 4: Calculate rankings against all other candidates
    const allProfiles = getAllProfiles();
    const ranking = await calculateMutualRankings(newPerson, allProfiles);
    savePersonRanking(ranking);

    return NextResponse.json({
      success: true,
      person: newPerson,
      ranking,
      logs: scraped.logs,
    });
  } catch (err: any) {
    console.error("Ingest error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to process candidate profiles.",
      },
      { status: 500 },
    );
  }
}
