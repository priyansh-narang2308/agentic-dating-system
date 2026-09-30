import fs from "fs";
import path from "path";
import profilesData from "../data/profiles.json";
import { PersonProfile } from "../types";

const dataFilePath = path.join(process.cwd(), "data", "profiles.json");

export function getAllProfilesServer(): PersonProfile[] {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data) as PersonProfile[];
  } catch {
    return profilesData as PersonProfile[];
  }
}

export function addCustomProfileServer(profile: PersonProfile): void {
  const profiles = getAllProfilesServer();
  const existingIdx = profiles.findIndex((p) => p.id === profile.id);
  
  if (existingIdx >= 0) {
    profiles[existingIdx] = profile;
  } else {
    profiles.unshift(profile);
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(profiles, null, 2), "utf8");
}
