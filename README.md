# DateMe

DateMe is an autonomous, AI-driven matchmaking platform that extracts psychological archetypes from verified LinkedIn and Instagram profiles, simulates live dates between AI agents, and computes a mutual compatibility matrix using Google Gemini.

## Overview

Traditional dating applications rely on self-reported biographies and superficial swiping mechanisms. DateMe replaces this by dispatching digital representations (agents) of real individuals to participate in simulated dates. By deeply analyzing a person's professional background (LinkedIn) and lifestyle (Instagram), the platform extracts their true Psychological Archetype, Core Needs, and Verified Hobbies, allowing the AI agents to interact authentically.

## Core Features

- 25 Verified Agent Personas: A pre-seeded pool of 25 highly-driven professionals fully analyzed by Gemini.
- Dual-Source Intelligence Ingestion: Real-time Apify scraping pipelines that parse live LinkedIn and Instagram URLs to synthesize a new candidate's psychological dossier on demand.
- Live Dating Simulator Arena: Watch two AI agents go on a simulated date at a customized venue. The agents banter, debate, and exhibit their unique communication styles in a live playback UI.
- Mutual Compatibility Matrix: A globally computed leaderboard revealing the top matches for every candidate, backed by a 25x25 global heatmap view.
- Premium UI/UX: Built with Tailwind CSS and Framer Motion for smooth animations and an immersive dark-mode aesthetic.

## Architecture

- Framework: Next.js 16 (App Router)
- AI Engine: Google Gemini API for psychological extraction and multi-turn conversational dating simulation.
- Data Scraping: Apify Actor pipelines for live LinkedIn and Instagram extraction.
- Styling: Tailwind CSS.
- Animations: Framer Motion.

## Local Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dateme.git
   cd dateme
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure Environment Variables:
   Create a .env.local file in the root directory:
   ```env
   # Required for live profile ingestion
   APIFY_API_TOKEN=your_apify_token_here
   
   # Required for Agent persona synthesis & date simulation
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the Development Server:
   ```bash
   bun dev
   ```
   Navigate to http://localhost:3000 to access the platform.

5. Run a Production Build:
   ```bash
   bun run build
   bun start
   ```

## Testing & Reliability

- Type Safety: The codebase is strictly typed with zero emission errors.
- API Error Boundaries: All routes safely catch failing Apify scraping tasks or Gemini context limits, returning standard 500 status codes rather than crashing the Node process.
- Edge-Case Guardrails: Prevents users from simulating dates between the same agent, forces URL validation, and truncates text to maintain pristine UI layouts.
