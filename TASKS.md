# AGENTIC DATING SYSTEM: MASTER TASK ROADMAP (24 TASKS)

> **Challenge Objective**: Full-stack Agentic Dating Site with 25 real people, Apify scraping, Gemini agent persona analysis, simulated agent dates with multi-turn banter, mutual compatibility rankings, and a live URL ingestion pipeline for judges.

---

## Phase 1: Environment & Foundational Architecture (Tasks 1 - 4)

- [x] **Task 1: Core Dependencies & SDK Setup**
  - Install `@google/genai` (or `@google/generative-ai`), `apify-client`, `lucide-react`, `framer-motion`, `canvas-confetti`, `class-variance-authority`, `clsx`, `tailwind-merge`.
  - Validate environment variables (`APIFY_API_TOKEN`, `GEMINI_API_KEY`).
- [x] **Task 2: Type Definitions & Domain Schema**
  - Define `PersonProfile`, `AgentPersona`, `ExtractedAnalysis` (needs, hobbies, interests, qualities, dealbreakers).
  - Define `DateDialogue`, `DateTurn`, `DateVerdict`, `CompatibilityScore`, `RankingItem`.
- [x] **Task 3: Apify Scraping Client & Robust Scraping Pipeline**
  - Build `lib/apify.ts`: generic Actor runner with timeout guards, error boundaries, and dataset parsers for Instagram & LinkedIn.
  - Implement reliable fallback parsers for live demonstration resilience so judges' custom links never hit a hard crash or API rate limits.
- [x] **Task 4: Gemini AI Engine & Agent Persona Synthesis**
  - Build `lib/gemini.ts`: Multi-agent prompts for (1) Persona Extraction from social evidence, (2) Multi-turn Agent Date Simulation, (3) Compatibility & Ranking Evaluation.

---

## Phase 2: The 25 Real People Dataset & Verified Sources (Tasks 5 - 7)

- [x] **Task 5: Curate 25 Real People with Public LinkedIn + Public Instagram**
  - Select 25 real verified professionals, founders, creatives, and engineers with genuine public LinkedIn & Instagram profiles.
  - Structure `data/people.json` with verified links, public avatars, and professional backgrounds.
- [ ] **Task 6: High-Fidelity Persona Dossiers & Grounded Evidence Generation**
  - Run the extraction pipeline to generate rich psychological profiles:
    - Core Needs (emotional, communication, lifestyle).
    - Hobbies (creative, physical, travel, downtime).
    - Interests (books, technology, music, culinary).
    - Qualities & Quirks (strengths, communication style, humor type).
    - Grounded Evidence Citations (exact signals derived from LinkedIn & Instagram).
- [ ] **Task 7: Pre-compute Match Matrix & Dating Dialogue Archive**
  - Pre-generate realistic, high-chemistry simulated dating dialogues across key pairs so the judges can instantly explore and watch live dates without waiting 60s for LLM generation.

---

## Phase 3: Premium UI & Design System (Tasks 8 - 12)

- [ ] **Task 8: Global Theme & Layout Shell (Luxury Dark Mode + Rose Gold)**
  - Configure modern typography, glowing glassmorphism gradients, sticky dynamic navigation header, and status badges.
- [ ] **Task 9: Hero Landing & "Live Onboarding" Ingestion Form**
  - Interactive hero banner with live statistics (25 Agents, 300+ Dates Simulated, AI-Grounded Compatibility).
  - Quick-input form for judges to paste any LinkedIn + Instagram URL to spawn their own agent in real time.
- [ ] **Task 10: Real-time Ingestion Stepper & Scraping Visualizer**
  - Visual terminal / animated stepper showing: "Scraping Instagram..." → "Parsing LinkedIn Experience..." → "Gemini Synthesizing Needs & Hobbies..." → "Spawning Agent".
- [ ] **Task 11: Profiles Directory & Filtering Grid (`/profiles`)**
  - Responsive card grid of all 25 agents with avatar, tags, profession, compatibility preview, and direct links to LinkedIn & Instagram.
- [ ] **Task 12: Rich Individual Profile Page (`/profiles/[id]`)**
  - Deep-dive view displaying:
    - Persona summary & archetype badge.
    - Tabbed breakdown: **Needs**, **Hobbies**, **Interests**, **Qualities & Quirks**.
    - Evidence Explorer: Collapsible view of raw LinkedIn signals and Instagram moments.
    - "Simulate Date" and "View Rankings" quick actions.

---

## Phase 4: Agent Dating Simulator & Real-time Dialogue Arena (Tasks 13 - 16)

- [ ] **Task 13: The Dating Arena (`/dating` & `/dating/[pairId]`)**
  - Two-column split-view or chat-room layout showing Agent A vs Agent B with live avatar badges, status indicators, and background ambiance (e.g. "Rooftop Lounge", "Quiet Coffeehouse").
- [ ] **Task 14: Interactive Playable Conversation Engine**
  - Message-by-message playback with typing indicators, witty AI banter, flirtatious quips, debate over shared interests, and mutual vulnerability.
- [ ] **Task 15: Post-Date Verdict & Chemistry Scorecard**
  - Dynamic score reveal breakdown:
    - ⚡ Vibe & Chemistry (0-100)
    - 🧭 Lifestyle & Values Alignment (0-100)
    - 🎯 Long-term Potential (0-100)
    - Agent A's private diary thoughts vs Agent B's private diary thoughts.
- [ ] **Task 16: Custom Pair Matchmaker / Sandbox Date Launcher**
  - Dropdown selector to pick ANY two people from the 25 (or custom-added person) and trigger a brand-new live simulated date via Gemini.

---

## Phase 5: Mutual Rankings & Compatibility Engine (Tasks 17 - 19)

- [ ] **Task 17: Rankings Dashboard (`/rankings` & `/rankings/[id]`)**
  - Leaderboard view for each person showing who fits them best (Rank #1 to #24).
  - Compatibility percentage bar, mutual synergy tags, and key compatibility drivers.
- [ ] **Task 18: Persona-Specific Match Detail Modal / Accordion**
  - "Why they fit" bullet points and "Potential friction points" generated by the evaluator agent.
  - One-click shortcut to "Watch Date Dialogue".
- [ ] **Task 19: Global Compatibility Heatmap / Matrix View**
  - Visual high-level matrix demonstrating the multi-agent matchmaking network across all 25 participants.

---

## Phase 6: Testing, Quality Assurance & Edge-Case Hardening (Tasks 20 - 21)

- [ ] **Task 20: Smoke Test & API Route Error Handling**
  - Test `/api/scrape`, `/api/analyze`, `/api/simulate-date`, `/api/rankings`.
  - Ensure zero crashes when invalid URLs, private profiles, or rate limits are encountered.
- [ ] **Task 21: Full Production Build & Typecheck**
  - Run `bun run build` and ensure zero TypeScript errors or Next.js build warnings.

---

## Phase 7: Deployment, Submission Artifacts & Demo Prep (Tasks 22 - 24)

- [ ] **Task 22: Git Commit & GitHub Public Repository Setup**
  - Clean git commits, structured README with architectural diagrams and step-by-step verification.
- [ ] **Task 23: Deployment (Vercel / Cloudflare)**
  - Deploy live site and confirm all API keys are set in production environment.
- [ ] **Task 24: Submission Deliverables (YouTube Script, 200-char summary, 500-char tech specs)**
  - Formatted text ready for immediate copy-pasting into the test submission portal.
