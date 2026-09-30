import fs from "fs";
import path from "path";
import profilesData from "../data/profiles.json";
import { PersonProfile } from "../types";

const cachedProfiles: PersonProfile[] = profilesData as PersonProfile[];

export function getAllProfiles(): PersonProfile[] {
  try {
    const filePath = path.join(process.cwd(), "data", "profiles.json");
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as PersonProfile[];
  } catch  {
    return cachedProfiles;
  }
}

export function getProfileById(id: string): PersonProfile | undefined {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.id === id || p.handle === id);
}

export function addCustomProfile(profile: PersonProfile): void {
  const existingIdx = cachedProfiles.findIndex((p) => p.id === profile.id);
  if (existingIdx >= 0) {
    cachedProfiles[existingIdx] = profile;
  } else {
    cachedProfiles.unshift(profile);
  }
  
  try {
    const filePath = path.join(process.cwd(), "data", "profiles.json");
    fs.writeFileSync(filePath, JSON.stringify(cachedProfiles, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save profile to disk:", err);
  }
}
