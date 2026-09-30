import rankingsData from "../data/rankings.json";
import { PersonRanking } from "../types";

const cachedRankings: PersonRanking[] = rankingsData as PersonRanking[];

export function getAllRankings(): PersonRanking[] {
  return cachedRankings;
}

export function getRankingsForPerson(
  personId: string,
): PersonRanking | undefined {
  return cachedRankings.find((r) => r.personId === personId);
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
}
