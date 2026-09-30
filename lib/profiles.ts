import profilesData from "../data/profiles.json";
import { PersonProfile } from "../types";

const cachedProfiles: PersonProfile[] = profilesData as PersonProfile[];

export function getAllProfiles(): PersonProfile[] {
  return cachedProfiles;
}

export function getProfileById(id: string): PersonProfile | undefined {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.id === id || p.handle === id);
}
