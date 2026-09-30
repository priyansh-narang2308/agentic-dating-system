import profilesData from "../data/profiles.json";
import { PersonProfile } from "../types";

const cachedProfiles: PersonProfile[] = profilesData as PersonProfile[];

export function getAllProfiles(): PersonProfile[] {
  return cachedProfiles;
}

export function getProfileById(id: string): PersonProfile | undefined {
  return cachedProfiles.find((p) => p.id === id || p.handle === id);
}

export function addCustomProfile(profile: PersonProfile): void {
  const existingIdx = cachedProfiles.findIndex((p) => p.id === profile.id);
  if (existingIdx >= 0) {
    cachedProfiles[existingIdx] = profile;
  } else {
    cachedProfiles.unshift(profile);
  }
}
