/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getProfileById } from "@/lib/profiles";
import { simulateAgentDate } from "@/lib/gemini";
import { saveDateDialogue
  
 } from "@/lib/dates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personAId, personBId, venue } = body;

    if (!personAId || !personBId) {
      return NextResponse.json(
        { error: "Both personAId and personBId are required." },
        { status: 400 },
      );
    }

    if (personAId === personBId) {
      return NextResponse.json(
        { error: "An agent cannot go on a simulated date with themselves." },
        { status: 400 },
      );
    }

    const personA = getProfileById(personAId);
    const personB = getProfileById(personBId);

    if (!personA || !personB) {
      return NextResponse.json(
        { error: "One or both profiles could not be found." },
        { status: 404 },
      );
    }

    const dateDialogue = await simulateAgentDate(
      personA,
      personB,
      venue || "Cozy Artisan Espresso Bar in SoHo",
    );

    saveDateDialogue(dateDialogue);

    return NextResponse.json({
      success: true,
      date: dateDialogue,
    });
  } catch (error: any) {
    console.error("Error running simulated date:", error);
    return NextResponse.json(
      { error: error.message || "Failed to simulate agent date" },
      { status: 500 },
    );
  }
}
