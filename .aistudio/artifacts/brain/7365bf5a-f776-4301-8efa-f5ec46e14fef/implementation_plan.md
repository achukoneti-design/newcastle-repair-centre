# Newcastle Repair Centre - High-End Bodyshop & CARBON AI Platform

A premier, high-performance automotive bodyshop landing page and smart automated quote experience for Newcastle Repair Centre on Condercum Road, Newcastle upon Tyne.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned during Phase 1 clarification:

- **Confirmed Decision 1 (CARBON AI Widget Presentation)**: Floating launcher badge docked in the bottom-right corner with a subtle neon pulse indicator, expanding into a glassmorphic carbon-styled interactive chat drawer.
- **Confirmed Decision 2 (Damage Assessment Mode)**: Interactive damage photo dropzone with instant multimodal inspection powered by Gemini 3.8 Flash, in addition to conversational quote guidance.
- **Confirmed Decision 3 (Workshop Proof Feature)**: Interactive visual repair cost calculator and before-and-after repair comparison slider to demonstrate paint, dent, and bumper transformation quality.
- **Confirmed Baseline Quotation Guidelines**: Prototype mockup pricing ranges clearly disclosed: Paint Fix (~£150–£250), Dent Removal (~£80–£150), Bumper Scrape Repair (~£200), culminating with workshop manager callback collection.

---

## 1. Overview & Core Concept

- **What It Does**: Presents a high-end, responsive independent bodyshop portal for Newcastle Repair Centre. Customers can explore core repair specialities, calculate instant repair estimates, inspect visual before/after proof, view workshop location/hours on Condercum Road, and consult **CARBON**—the smart AI workshop assistant capable of analyzing damage photos and booking manager callbacks.
- **Target Audience / Persona**: Local vehicle owners, fleet drivers, and commercial operators across Newcastle upon Tyne and the North East seeking dealer-grade accident, paint, and dent repairs without main-dealer markups.
- **Key Value**: Instills immediate confidence through dealer-grade precision, transparent pricing metrics, and instant AI quotation automation that captures actionable leads for the workshop manager.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery & Exploration**: Users land on the cinematic hero with the headline *"SMART REPAIR WITHOUT THE MAIN DEALER PRICES"*, exploring Condercum Road credentials and rapid CTAs.
2. **Interactive Cost Estimator & Comparison**: Users select affected vehicle panels (bumper, wing, door, bonnet) and damage severity to view instant baseline metrics, then drag the interactive Before/After slider to observe real paint restoration fidelity.
3. **Dedicated 3-Column Speciality Grid**: Deep-dive cards for:
   - *Accident & Crash Repair* (Chassis alignment, structural restoration, insurance liaisons)
   - *Flawless Bodywork & Paint* (Computerized computerized color-matching, low-bake spray booth finish)
   - *Bumper & Dent Fixes* (Precision PDR paintless dent removal, plastic welding, scuff erasure)
4. **Sidebar & Contact Matrix**: Operational hub detailing Condercum Road address (NE4 9XN), Newcastle contact channels, rapid direct dial, and verified opening hours (Mon-Fri 8:30 AM – 5:30 PM, Sat 9:00 AM – 1:00 PM).
5. **CARBON AI Engagement**: Users click the bottom-right badge to open CARBON, ask questions about scuffs or dents, drag & drop a damage photo, receive an instant mockup estimate breakdown, and submit their mobile number for workshop manager review.

### Visual Identity & Theme
- **Aesthetic Direction**: High-performance hyper-modern automotive bodyshop. Deep obsidian and carbon textures paired with precision neon lime green (`#39FF14`) accents and crisp technical typography.
- **Color Palette (60-30-10 Rule)**:
  - `60% Neutral Canvas`: Ultra-deep black / charcoal slate (`#0B0D11`, `#12151C`).
  - `30% Structural Surfaces`: Hairline borders (`rgba(255,255,255,0.08)`), dark carbon card fills (`#181C24`), muted slate prose (`#94A3B8`).
  - `10% Accent Budget`: Electric lime green (`#39FF14` / `#22C55E` blends) strictly focused on the "REPAIR" wordmark accent, active CTA buttons, slider handles, and CARBON interaction cues.
- **Typography & Hierarchy**:
  - *Display / Headlines*: `Plus Jakarta Sans` with tight tracking (`tracking-tight`), bold weights, and `text-wrap: balance`.
  - *Body Text*: High-legibility `DM Sans` / `Plus Jakarta Sans` with 1.6 line height.
  - *Data & Pricing*: Monospace tabular numerals (`tabular-nums font-mono`) for exact quote calculations.
- **Anti-Slop Discipline**:
  - Clean unboxed metadata separated by `·` (zero static pill tags).
  - Strict Top Bar Contract: `[Newcastle REPAIR Centre]` — `[Services · Pricing · Proof · Location]` — `[Get Quick Quote]`.
  - No decorative status dots, no fake compiler tags, no thick left border clichés.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Server-Side Gemini API Proxy with Multimodal Vision**
  - *Chosen Approach*: Implement an Express `/api/chat` route utilizing `@google/genai` with model `gemini-3.8-flash`. Supports conversational text and base64 damage photo analysis.
  - *Why*: Adheres to strict server-side API key protection while enabling real AI reasoning on user-uploaded car damage photos without requiring paid model escalation.
  - *Alternative Considered*: Client-side Gemini calls (rejected: exposes secrets and breaks AI Studio guidelines).
- **Decision 2: Integrated Interactive Repair Calculator & Before/After Slider**
  - *Chosen Approach*: Client-side interactive canvas comparing pristine vs. damaged panels alongside a multi-point damage calculator that syncs directly into the CARBON assistant input.
  - *Why*: Provides immediate tactile value to users even before initiating an AI chat, increasing lead conversion.
- **Decision 3: Cloud Run Deployment Architecture**
  - *Chosen Approach*: Unified Node/Express server configuration that serves API routes and prebuilt static assets with single-port fallback (`PORT` or `3000`).
  - *Why*: Guaranteed single-click container deployment on Google Cloud Run with immediate `*.run.app` readiness.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client UI (React 19 + Tailwind v4)              │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │   Top Bar (3-Zone)    │  │  Hero Banner & Value Proposition      │  │
│  └───────────────────────┘  └───────────────────────────────────────┘  │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │  3-Col Specialities   │  │  Interactive Cost Estimator & Slider │  │
│  └───────────────────────┘  └───────────────────────────────────────┘  │
│  ┌───────────────────────┐  ┌───────────────────────────────────────┐  │
│  │  Sidebar & Location   │  │  CARBON Floating AI Assistant Drawer  │  │
│  └───────────────────────┘  └───────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │  POST /api/chat (Text + Image)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Server Layer (Express + Node / Vite)                  │
│                                                                        │
│  - Environment config (GEMINI_API_KEY from runtime secrets)            │
│  - Input validation & prompt conditioning                              │
│  - System Prompt: Carbon, Newcastle Repair Centre, Condercum Road       │
│  - Baseline metrics: Paint (~£150-250), Dent (~£80-150), Bumper (~£200)│
│  - Mobile number callback handoff trigger                              │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│              Google Gemini API (Model: gemini-3.8-flash)               │
└────────────────────────────────────────────────────────────────────────┘
```

### CARBON System Prompt Configuration
The assistant will execute with the specified instructions:
1. "You are Carbon, the ultra-sleek, professional, and helpful AI assistant for Newcastle Repair Centre on Condercum Road."
2. "Your primary objective is to show off your smart automation capabilities to the garage owner. Be welcoming, use a tiny hint of local Newcastle warmth, and focus on helping users quote paint scrapes, dent removals, or crash damage."
3. "Explicitly tell the customer that all prices provided are mockup estimates for this prototype portfolio build. Use these baseline test metrics for calculations: Paint Fix (~£150-£250), Dent Removal (~£80-£150), Bumper Scrape Repair (~£200)."
4. "Always close discussions by asking: 'Would you like to drop your mobile number here so our workshop manager can call you to look at a photo of the damage?'"
