import { notFound } from "next/navigation";
import { getDateById, getDateByPair } from "@/lib/dates";
import { getProfileById } from "@/lib/profiles";
import { DatePlayer } from "@/components/dating/date-player";

export default async function SimulatedDateDetailPage({
  params,
}: {
  params: Promise<{ pairId: string }>;
}) {
  const { pairId } = await params;

  let dialogue = getDateById(pairId);

  if (!dialogue) {
    const strippedId = pairId.replace(/^date-/, "");
    const parts = strippedId.split("-");
    if (parts.length >= 2) {
      dialogue = getDateByPair(parts[0], parts[1]);
    }
  }

  if (!dialogue) {
    notFound();
  }

  const personA = getProfileById(dialogue.personAId);
  const personB = getProfileById(dialogue.personBId);

  return (
    <div className="max-w-5xl mx-auto">
      <DatePlayer dialogue={dialogue} personA={personA} personB={personB} />
    </div>
  );
}
