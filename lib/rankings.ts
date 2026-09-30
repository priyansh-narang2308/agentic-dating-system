import fs from "fs";
import path from "path";
import rankingsData from "../data/rankings.json";
import { PersonRanking } from "../types";

const cachedRankings: PersonRanking[] = rankingsData as PersonRanking[];

export function getAllRankings(): PersonRanking[] {
  try {
    const filePath = path.join(process.cwd(), "data", "rankings.json");
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as PersonRanking[];
  } catch {
    return cachedRankings;
  }
}

export function getRankingsForPerson(
  personId: string,
): PersonRanking | undefined {
  const rankings = getAllRankings();
  return rankings.find((r) => r.personId === personId);
}

export function savePersonRanking(ranking: PersonRanking): void {
  const existingIdx = cachedRankings.findIndex(
    (r) => r.personId === ranking.personId,
  );
  if (existingIdx >= 0) {
    cachedRankings[existingIdx] = ranking;
  } else {
    cachedRankings.unshift(ranking);
  }

  try {
    const filePath = path.join(process.cwd(), "data", "rankings.json");
    fs.writeFileSync(filePath, JSON.stringify(cachedRankings, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save ranking to disk:", err);
  }
}
