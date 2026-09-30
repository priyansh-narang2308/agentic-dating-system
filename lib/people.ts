import peopleData from "../data/people.json";

export interface CuratedPersonInput {
  id: string;
  name: string;
  handle: string;
  headline: string;
  city: string;
  profession: string;
  companyOrOrg?: string;
  avatarUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  tags: string[];
}

export function getCuratedPeople(): CuratedPersonInput[] {
  return peopleData as CuratedPersonInput[];
}

export function getCuratedPersonById(id: string): CuratedPersonInput | undefined {
  return (peopleData as CuratedPersonInput[]).find(p => p.id === id);
}
