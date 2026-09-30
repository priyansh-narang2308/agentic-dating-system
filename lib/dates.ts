import datesData from "../data/dates.json";
import { DateDialogue } from "../types";

const cachedDates: DateDialogue[] = datesData as DateDialogue[];

export function getAllDates(): DateDialogue[] {
  return cachedDates;
}

export function getDateById(id: string): DateDialogue | undefined {
  return cachedDates.find((d) => d.id === id);
}

export function getDateByPair(
  personAId: string,
  personBId: string,
): DateDialogue | undefined {
  return cachedDates.find(
    (d) =>
      (d.personAId === personAId && d.personBId === personBId) ||
      (d.personAId === personBId && d.personBId === personAId),
  );
}

export function saveDateDialogue(dialogue: DateDialogue): void {
  const existingIdx = cachedDates.findIndex((d) => d.id === dialogue.id);
  if (existingIdx >= 0) {
    cachedDates[existingIdx] = dialogue;
  } else {
    cachedDates.unshift(dialogue);
  }
}
