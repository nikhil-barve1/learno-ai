# LearnoAI — Complete UX Design Specification

**Role**: Lead Product Designer & Senior Frontend Architect  
**Date**: 2026-07-18  
**Stage**: MVP — Hackathon Build  
**Source of Truth**: PROJECT.md, AGENTS.md, learnoai-hackathon.md

---

## 0. Design Intent

LearnoAI must feel like a **senior mentor** you just met — someone who listens carefully and immediately gives you a clear, personalised path forward. The experience is:

- **Premium** → every pixel feels considered
- **Trustworthy** → structured, calm, no clutter
- **Motivating** → energises the user before they even start learning
- **Fast** → zero friction between opening the site and getting the roadmap

The design system is dark-only, minimal, and opinionated. It borrows from the visual language of Linear, Vercel, and Perplexity — products the target audience (developers and self-learners) already trust.

---

## 1. Landing Page

### 1.1 Navbar

**Why it exists**: Anchors brand identity and gives the user a single clear next action.

**Layout**

```
[ 🧠 LearnoAI logo ]                    [ Get Your Roadmap → ]
```

- Sticky, blurred backdrop (`backdrop-blur-md`), extremely subtle border-bottom (`1px solid rgba(255,255,255,0.06)`)
- Logo: Wordmark `Learno` in white + `AI` in accent violet
- Single CTA button on the right — no nav links, no distractions
- On mobile: logo left, CTA button right (always visible)

**Design rationale**: No navigation menu. The MVP has only one action: generate a roadmap. Every extra link is a leak in the conversion funnel.

---

### 1.2 Hero Section

**Why it exists**: Immediately answers "What is this and why should I care?" The user must understand the value in under 3 seconds.

**Layout (centered, full-viewport-height)**

```
[ Pill badge: "AI-Powered Learning Consultant" ]

  Your Personalised Learning
  Roadmap — Generated in Seconds.

  Stop Googling. Start Learning.
  Tell us your goal and we'll build your complete study plan,
  resource list, and interview prep — instantly.

  [ → Generate My Roadmap ]   [ See How It Works ↓ ]
```

**Visual atmosphere**:
- Background: `#0A0A0F` (near-black with a faint blue tint)
- Two radial gradients behind the headline:
  - Top-left: violet (`#7C3AED`) at ~15% opacity, radius ~600px
  - Top-right: indigo (`#4F46E5`) at ~10% opacity, radius ~400px
- A subtle grid overlay (CSS `background-image: linear-gradient` pattern), opacity ~3% — creates a "technical" depth
- Headline: `Inter` / `Plus Jakarta Sans`, 56px desktop / 36px mobile, `font-weight: 800`, white
- Accent word "Personalised" styled with a subtle violet gradient text fill
- Sub-heading: 18px, `color: #A0A0B0` (muted grey-lavender)
- Badge: pill shape, `border: 1px solid rgba(124,58,237,0.4)`, background `rgba(124,58,237,0.12)`, text violet-300

**Primary CTA button**:
- Full gradient: `background: linear-gradient(135deg, #7C3AED, #4F46E5)`
- Rounded-full, `padding: 14px 28px`, `font-weight: 600`
- Hover: scale `1.03`, brightness `1.1`, subtle glow shadow `0 0 24px rgba(124,58,237,0.4)`
- Icon: `ArrowRight` from Lucide, animates `translateX(3px)` on hover

**Secondary CTA**:
- Ghost button, border `1px solid rgba(255,255,255,0.12)`, transparent fill
- Hover: background `rgba(255,255,255,0.04)`

**Design rationale**: The dual CTA removes pressure. Users who are ready click primary. Sceptics click secondary and see the feature list, which converts them.

---

### 1.3 Social Proof Strip

**Why it exists**: Builds trust before asking for input. Even a hackathon product needs believability.

**Layout (horizontal scroll on mobile, flex-row on desktop)**

```
[ ⭐ "Generated in under 10 seconds" ]
[ 🎯 "7 sections of personalised content" ]
[ 🧠 "Powered by Google Gemini" ]
[ 🆓 "100% Free" ]
```

- Pill badges with icons, separated by faint dividers
- Text: `14px`, `color: #8888A0`
- No fake testimonials — only factual product statements. Keeps it honest.

---

### 1.4 Features Section — "What You Get"

**Why it exists**: Users need to know exactly what they're about to receive before filling a form. Reduces bounce.

**Section heading**:
```
Everything you need to go from zero to job-ready.
```

**6-card grid (3×2 desktop, 1×6 mobile)**

| Icon | Title | Description |
|------|-------|-------------|
| `Map` | Personalised Roadmap | A step-by-step learning path tailored to your exact goal and timeline |
| `Calendar` | Weekly Study Plan | Know exactly what to study each week — no guessing |
| `BookOpen` | Free Resources | Curated free courses, docs, and videos — zero fluff |
| `BriefcaseBusiness` | Interview Prep | Topics, questions, and strategies for landing the job |
| `Code2` | Practice Projects | Real projects to build your portfolio while you learn |
| `Lightbulb` | Avoid Beginner Mistakes | The top mistakes for your goal — so you skip the pain |

**Card design**:
- Background: `rgba(255,255,255,0.03)` with `border: 1px solid rgba(255,255,255,0.07)`
- Border-radius: `16px`
- Icon: `32px` in a small rounded square with violet tint background
- Title: `16px`, `font-weight: 600`, white
- Description: `14px`, `#8888A0`
- Hover: border brightens to `rgba(124,58,237,0.3)`, subtle lift `translateY(-2px)` with transition

---

### 1.5 How It Works

**Why it exists**: Shows users the process is 3 steps. Reduces fear of complexity.

**Layout (horizontal timeline on desktop, vertical steps on mobile)**

```
① Fill the form   →   ② AI generates your plan   →   ③ Start learning
   30 seconds           Under 10 seconds                 Today
```

- Step numbers: large `48px` font, `color: rgba(124,58,237,0.3)` (ghost violet)
- Step title: `18px`, white, `font-weight: 600`
- Step description: `14px`, `#8888A0`
- Arrow connectors: `ChevronRight` icon, faint, only on desktop

---

### 1.6 CTA Banner (Pre-Footer)

**Why it exists**: Final conversion opportunity before the footer. Users who scrolled this far are interested.

```
Ready to build your roadmap?

  Tell us your goal — we'll do the rest.

  [ → Generate My Roadmap ]
```

- Subtle gradient card: `background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(79,70,229,0.08))`
- Border: `1px solid rgba(124,58,237,0.2)`
- Border-radius: `24px`
- Centered text layout

---

### 1.7 Footer

**Why it exists**: Closes the page professionally. Hackathon judges will notice polish.

```
[ 🧠 LearnoAI ]

"Your AI-powered learning consultant."

Built for the 2026 Hackathon · Powered by Google Gemini

[ GitHub ] [ Vercel ]
```

- Minimal single-column centered layout
- Text: `12px`, `#555570`
- No complex multi-column footer — this is an MVP

---

## 2. AI Form Page

**Route**: `/generate` or inline scroll section anchored from CTA

**Why it exists**: Collects 7 pieces of context that Gemini needs to generate a personalised roadmap. The form is the product's core interface.

**Design intent**: Make the form feel like a conversation, not a form.

---

### 2.1 Form Page Layout

```
[ Page header ]
  "Let's build your roadmap."
  "Answer a few questions and we'll generate your personalised learning plan."

[ Form card — centered, max-width: 640px ]
  [ Step indicator: optional, just a progress bar ]
  
  [ Field group 1: About You ]
  [ Field group 2: Your Goal ]
  [ Field group 3: Your Time ]

  [ Generate My Roadmap button ]
```

**Background**: Same as landing page (`#0A0A0F`) with ambient gradients behind the form card.

**Form card**:
- `background: rgba(255,255,255,0.03)`
- `border: 1px solid rgba(255,255,255,0.08)`
- `border-radius: 24px`
- `padding: 40px` desktop / `24px` mobile

---

### 2.2 Field Groups

All fields use a consistent visual language:

**Input style**:
- Background: `rgba(255,255,255,0.05)`
- Border: `1px solid rgba(255,255,255,0.1)`
- Border-radius: `10px`
- Focus ring: `2px solid rgba(124,58,237,0.6)`, background lightens slightly
- Placeholder text: `#55556A`
- Input text: white
- `font-size: 15px`
- `padding: 12px 16px`

**Label style**:
- `font-size: 13px`, `font-weight: 500`, `color: #8888A0`, `letter-spacing: 0.02em`
- Displayed above the input, `margin-bottom: 8px`

---

#### Group 1 — About You

| Field | Type | Placeholder / Options |
|-------|------|-----------------------|
| **Name** | Text input | "Your first name" |
| **Current Qualification** | Select dropdown | High School / Undergraduate / Graduate / Working Professional / Other |
| **Current Experience** | Select dropdown | No experience / 0–1 years / 1–3 years / 3+ years |

**Group heading**: `"👤 About You"` — small `11px` uppercase label with accent colour

---

#### Group 2 — Your Goal

| Field | Type | Placeholder / Options |
|-------|------|-----------------------|
| **Technology to Learn** | Text input | "e.g. React, Machine Learning, DevOps, Flutter..." |
| **Current Skill Level** | Radio / pill-select | Absolute Beginner / Some Basics / Intermediate |

**Skill level pill-select design**:
- Three horizontal pills on desktop / stacked on mobile
- Default: border only, `rgba(255,255,255,0.08)` background
- Selected: `background: rgba(124,58,237,0.2)`, `border: 1px solid rgba(124,58,237,0.6)`, violet text

**Why pill-select instead of dropdown**: The 3 options are mutually exclusive and short enough to show inline. Pill-select is faster and more satisfying to interact with.

---

#### Group 3 — Your Time

| Field | Type | Placeholder / Options |
|-------|------|-----------------------|
| **Available Months** | Number input or horizontal slider | 1–24 months |
| **Hours per Day** | Number input or horizontal slider | 0.5–8 hours |

**Slider design (if used)**:
- Track: `rgba(255,255,255,0.1)`
- Filled portion: violet gradient
- Thumb: white circle with violet shadow
- Value displayed prominently above/beside slider in `16px` white text

**Display beneath slider**: Auto-calculated label:
- "3 months × 2 hrs/day = ~180 hours of learning time"
- This makes the user feel understood and their plan feels concrete

---

### 2.3 Form Validation States

**Empty required field on submit attempt**:
- Border changes to `rgba(239,68,68,0.6)` (red tint)
- Shake animation: `translateX` keyframes, 300ms
- Error message appears below field: `"This field is required"` in `12px` red text
- No full-page error banner — inline only

**Valid field (on blur)**:
- Border subtly brightens to `rgba(124,58,237,0.4)` — a small positive signal

---

### 2.4 Submit Button

```
[ ✨ Generate My Roadmap ]
```

- Full-width, `height: 52px`
- Gradient: `linear-gradient(135deg, #7C3AED, #4F46E5)`
- `font-size: 16px`, `font-weight: 600`
- Hover: scale `1.01`, glow shadow
- Loading state: spins a `Loader2` icon, text changes to `"Generating your roadmap..."`
- Disabled during loading: `opacity: 0.7`, `cursor: not-allowed`

---

## 3. Loading Experience

**Why it exists**: Gemini API takes 5–15 seconds. The user must feel that meaningful work is happening — not that the page is broken.

### 3.1 Full-Page Loading Screen

When the user clicks Generate, the page transitions to a full-screen loading state.

**Layout**:

```
[ 🧠 Animated brain/spark icon — pulsing ]

  "Analysing your goal..."        ← rotates through messages

  [ ████████░░░░░░░░░░░░ 42% ]   ← animated progress bar

  "This usually takes 10–15 seconds."
```

**Background**: Same dark base with ambient violet glow intensified slightly — the screen feels "active."

**Rotating status messages** (cycle every 2–3 seconds):
1. `"Analysing your goal..."`
2. `"Mapping the best learning path..."`
3. `"Sourcing official resources..."`
4. `"Building your weekly schedule..."`
5. `"Preparing interview questions..."`
6. `"Almost ready..."`

**Progress bar**:
- Animated pseudo-progress (not real — no actual API progress events)
- Fills to ~85% smoothly over 12 seconds, then holds until API resolves
- On resolve: fills to 100% with an acceleration burst, then transitions to the report page

**Why pseudo-progress**: Real APIs don't emit progress events. A fake-but-believable progress bar is vastly better UX than a static spinner. Users feel the system is working hard for them.

**Transition out**:
- Fade + slight scale-up on the loading screen
- Report page fades in beneath it
- Duration: 400ms

---

## 4. AI Report Page

**Route**: `/report` (receives data via state/query or session storage)

**Why it exists**: This is the product. Everything else leads here. It must feel like receiving a gift — a structured, beautiful document that answers every question the user had.

### 4.1 Report Page Header

```
[ Navbar with logo + "Generate Another Roadmap" button ]

[ Report hero ]
  Hi {Name}, here is your roadmap.

  Learning Goal: {Technology}
  Experience: {Experience Level}
  Timeline: {N months · N hrs/day}
  Generated on: {date}

  [ Pill: "Personalised for You" ]
```

- Name in headline: `font-size: 36px`, white, `font-weight: 700`
- Meta row: small pills for goal/experience/timeline — easy to scan
- "Generate Another Roadmap" button: ghost style, top-right
- Print/share CTA omitted from MVP (future feature)

---

### 4.2 Section Navigation (Sticky Side Panel — Desktop Only)

**Why it exists**: The report is long. Users need to jump to sections without scrolling.

**Layout**: Sticky left rail (only visible `lg:` and above)

```
Contents
─────────────────
○ Roadmap Overview
○ Weekly Study Plan
○ Learning Strategy
○ Free Resources
○ Interview Preparation
○ Practice Projects
○ Beginner Mistakes
○ Capstone Project
```

- Active section highlighted with violet left border + accent text colour
- Smooth scroll on click
- On mobile: replaced by a horizontal scrollable tab strip at the top of the report

---

### 4.3 Report Sections (in order)

Each section follows the same card structure:

**Section card**:
- `background: rgba(255,255,255,0.03)`
- `border: 1px solid rgba(255,255,255,0.07)`
- `border-radius: 20px`
- `padding: 32px` desktop / `20px` mobile
- `margin-bottom: 24px`
- Section icon in a small rounded box (violet tint background)
- Section title: `20px`, `font-weight: 700`, white

---

#### Section 1 — 🗺️ Personalised Learning Roadmap

**Why it exists**: The core deliverable. Shows the user the complete learning path with phases.

**Content**: Numbered phases with titles, descriptions, and estimated duration

```
Phase 1 · Foundation (Weeks 1–4)
  Learn HTML, CSS, and JavaScript fundamentals.
  Focus on building a solid mental model before frameworks.

Phase 2 · Core Technology (Weeks 5–12)
  ...

Phase 3 · Advanced Concepts (Weeks 13–20)
  ...
```

**Visual design**:
- Phase cards stacked vertically
- Phase number: large ghost number (violet, low opacity) behind the card header
- Left border accent: gradient violet line
- Progress feeling: each phase looks like a step on a staircase

---

#### Section 2 — 📅 Weekly Study Plan

**Why it exists**: Translates the abstract roadmap into actionable weekly chunks. Prevents the user from feeling lost.

**Content**: Week-by-week breakdown, grouped by month

```
Week 1:  HTML Basics — Structure, tags, forms
Week 2:  CSS Fundamentals — Box model, flexbox
Week 3:  CSS Advanced — Grid, animations
Week 4:  Review + Mini Project (Personal Profile Page)
```

**Visual design**:
- Table or card grid format
- Week number pill on the left
- Topic title bold, description muted
- "Mini Project" weeks highlighted with a subtle yellow-gold tint

---

#### Section 3 — 🎯 Learning Strategy

**Why it exists**: Tells the user HOW to learn effectively for their specific goal. Changes behaviour.

**Content**: Personalised study tips, recommended learning method, consistency advice

```
Your strategy for learning React:

  → 70% Practice, 30% Theory
  → Build projects from Week 3 onwards
  → Never watch tutorials passively — code alongside
  → Use official React docs as primary source
```

**Visual design**:
- Bulleted list with `CheckCircle2` icons in violet
- Slightly different card background: `rgba(124,58,237,0.05)` — distinct from other sections

---

#### Section 4 — 📚 Free Resources

**Why it exists**: Users need to know exactly where to learn. Curated > overwhelming Google search.

**Content**: Grouped by resource type (Documentation, Courses, YouTube, Practice)

```
Official Documentation
  → React Docs (react.dev)
  → MDN Web Docs

Free Courses
  → The Odin Project
  → freeCodeCamp

YouTube Channels
  → Traversy Media
  → Fireship
```

**Visual design**:
- Resource rows: icon + name + domain pill + optional description
- External link icon (`ExternalLink`, `12px`) on hover
- Resource type grouped with a small section sub-heading
- NO fabricated links — resource names are real, URLs point to real domains

**Critical rule**: AI must only return resource names from a curated whitelist passed in the prompt context. Never hallucinate YouTube channels or course links.

---

#### Section 5 — 💼 Interview Preparation

**Why it exists**: This is a key user motivation (getting a job). Answering "how do I prepare for interviews?" is core to LearnoAI's promise.

**Content**: Key interview topics, preparation strategy, timeline

```
Topics to master:
  → JavaScript fundamentals (closures, hoisting, async)
  → React component lifecycle
  → State management patterns
  → System design basics (for senior roles)

Strategy:
  → Start interview prep 4–6 weeks before your target date
  → Practice 2–3 LeetCode problems per week (Easy/Medium)
  → Do mock interviews with peers

Resources:
  → LeetCode, HackerRank, Pramp
```

**Visual design**:
- Topic chips / tags in a wrap layout
- Strategy as bulleted list with icons
- Timeline displayed as a small visual (e.g., "Start week 16")

---

#### Section 6 — 🛠️ Practice Projects

**Why it exists**: Projects are how developers get hired. Users need concrete things to build.

**Content**: 3–5 project ideas, difficulty level, what skills they practise

```
Project 1 · Beginner
  Personal Portfolio Website
  Skills: HTML, CSS, Responsive Design
  Time: 3–5 days

Project 2 · Intermediate
  To-Do App with React
  Skills: Components, State, Props
  Time: 1 week

Project 3 · Advanced
  Full-Stack E-Commerce App
  Skills: React, Node.js, Database
  Time: 3–4 weeks
```

**Visual design**:
- Card per project
- Difficulty badge: Beginner (green), Intermediate (amber), Advanced (violet)
- Skills as small tag chips
- Estimated time in a meta row

---

#### Section 7 — ⚠️ Beginner Mistakes

**Why it exists**: This section is a differentiator. Users didn't expect it but it immediately shows the product is thinking several moves ahead.

**Content**: 4–6 common mistakes for this specific technology goal

```
Mistake 1: Tutorial hell
  Watching too many tutorials without building anything.
  Fix: Build projects from day one, even if they are imperfect.

Mistake 2: Skipping the basics
  Jumping into frameworks before understanding fundamentals.
  Fix: Spend 2–3 weeks on core JavaScript before touching React.
```

**Visual design**:
- Each mistake in a card with a subtle red-tinted left border
- Mistake title in amber/yellow (warning colour)
- Fix text in green (solution colour)
- `AlertTriangle` icon for mistake, `CheckCircle` for fix

---

#### Section 8 — 🏆 Final Capstone Project

**Why it exists**: Closes the roadmap with a clear, ambitious end goal. Gives the user something to aim for.

**Content**: One detailed project description with feature breakdown, tech stack, and deployment notes

```
Build a Full-Featured Blog Platform

Tech stack: React, Node.js, MongoDB
Features:
  → User authentication
  → CRUD posts
  → Markdown editor
  → Responsive design
  → Deployed to Vercel

Why this project: It demonstrates mastery of the full stack
and makes a strong portfolio piece for interviews.
```

**Visual design**:
- Larger card with gradient border (violet → indigo)
- Trophy or star icon prominent
- Feature list with check icons
- A "This is your graduation project" label — motivational

---

### 4.4 Report Footer

```
[ Regenerate with different inputs ]   [ Start Over ]

"Your roadmap was generated by LearnoAI using Google Gemini."
"Resources are curated for accuracy. Always verify links."
```

- Two ghost buttons
- Disclaimer in small `12px` muted text

---

## 5. Mobile UX

**Philosophy**: Mobile users are likely the majority of the target audience (students on phones). The experience must be equally premium, not a degraded fallback.

### Key Mobile Decisions

| Element | Mobile Behaviour |
|---------|-----------------|
| Navbar | Logo + CTA button — no hamburger menu (no nav links to collapse) |
| Hero | Single-column, reduced font size (36px → 26px heading), CTA buttons stack vertically |
| Feature cards | Single-column full-width |
| How It Works | Vertical steps with connecting line |
| Form | Full-width inputs, pill-select stacks vertically, sliders are touch-optimised (larger thumb, `48px` hit target) |
| Loading screen | Same as desktop, full-screen |
| Report page | No sticky side panel — horizontal scrollable tab strip instead |
| Report sections | Full-width cards, 20px padding |
| Section navigation | Sticky top tab strip with horizontal scroll (`overflow-x: auto`, no scrollbar visible) |

### Touch targets

All interactive elements: minimum `44px × 44px` touch target (Apple HIG standard).

### Typography scaling

```
Desktop Heading:  56px → Mobile: 32px
Desktop Sub:      18px → Mobile: 16px
Desktop Body:     15px → Mobile: 14px
Desktop Label:    13px → Mobile: 12px
```

---

## 6. Desktop UX

### Layout Widths

| Section | Max Width |
|---------|-----------|
| Navbar | Full-width with inner `max-w-7xl` |
| Hero | `max-w-3xl` centered |
| Features grid | `max-w-6xl` |
| Form | `max-w-640px` centered |
| Report | `max-w-5xl` with side nav occupying left `240px` |

### Hover States

Every interactive element has a distinct hover state. No element should feel inert.

- Buttons: scale + glow
- Cards: lift (`translateY(-2px)`) + border brightens
- Links: underline slides in from left
- Form inputs: border intensifies

### Report Side Navigation

- Fixed left position within a `max-w-5xl` container
- Top: `120px` (below sticky navbar)
- `width: 220px`
- Main content area: `calc(100% - 220px - 40px)` — padded from sidebar
- Section links have smooth `easeOut` scroll behaviour

---

## 7. Component Hierarchy

```
App
├── Layout
│   ├── Navbar
│   │   ├── Logo
│   │   └── CTAButton
│   └── Footer
│
├── Page: Landing (/)
│   ├── HeroSection
│   │   ├── BadgePill
│   │   ├── HeroHeading
│   │   ├── HeroSubheading
│   │   ├── CTAButton (primary)
│   │   └── CTAButton (secondary / ghost)
│   ├── SocialProofStrip
│   │   └── ProofBadge × 4
│   ├── FeaturesSection
│   │   ├── SectionHeading
│   │   └── FeatureCard × 6
│   ├── HowItWorksSection
│   │   ├── SectionHeading
│   │   └── StepItem × 3
│   └── CTABanner
│
├── Page: Generate (/generate)
│   ├── FormPageHeader
│   └── RoadmapForm
│       ├── FormGroup (About You)
│       │   ├── TextInput (Name)
│       │   ├── SelectInput (Qualification)
│       │   └── SelectInput (Experience)
│       ├── FormGroup (Your Goal)
│       │   ├── TextInput (Technology)
│       │   └── PillSelect (Skill Level)
│       ├── FormGroup (Your Time)
│       │   ├── NumberInput / Slider (Months)
│       │   └── NumberInput / Slider (Hours/Day)
│       └── SubmitButton
│
├── Page: Loading (/loading or state)
│   ├── LoadingIcon (animated)
│   ├── StatusMessage (rotating)
│   └── ProgressBar (animated)
│
└── Page: Report (/report)
    ├── ReportHeader
    ├── ReportNav (desktop sidebar / mobile tab strip)
    │   └── NavItem × 8
    └── ReportContent
        ├── RoadmapSection
        │   └── PhaseCard × N
        ├── WeeklyPlanSection
        │   └── WeekRow × N
        ├── StrategySection
        ├── ResourcesSection
        │   └── ResourceGroup × N
        │       └── ResourceItem × N
        ├── InterviewSection
        ├── ProjectsSection
        │   └── ProjectCard × N
        ├── MistakesSection
        │   └── MistakeCard × N
        └── CapstonSection
```

### Reusable Atoms (shared across pages)

| Component | Usage |
|-----------|-------|
| `CTAButton` | Navbar, Hero, CTABanner, Form |
| `SectionHeading` | Features, HowItWorks, Report sections |
| `BadgePill` | Hero, Social Proof, Report tags |
| `CardBase` | Feature cards, Report sections, Project cards |
| `FormInput` | All form fields |
| `Loader` | Submit button + loading screen |

---

## 8. Colour Palette

**Design rationale**: Violet and indigo are the primary accent colours. They read as intelligent, modern, and slightly futuristic — a perfect fit for an AI product. The palette deliberately avoids generic blue, which has become the "boring AI product" colour.

### Core Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0A0A0F` | Page backgrounds |
| `--color-surface` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--color-surface-hover` | `rgba(255,255,255,0.05)` | Card hover backgrounds |
| `--color-border` | `rgba(255,255,255,0.07)` | Card / input borders |
| `--color-border-focus` | `rgba(124,58,237,0.6)` | Focus rings |
| `--color-accent-primary` | `#7C3AED` | Primary violet |
| `--color-accent-secondary` | `#4F46E5` | Secondary indigo |
| `--color-accent-gradient` | `linear-gradient(135deg, #7C3AED, #4F46E5)` | Buttons, progress bar |
| `--color-text-primary` | `#FFFFFF` | Headlines, important text |
| `--color-text-secondary` | `#A0A0B4` | Body text, descriptions |
| `--color-text-muted` | `#55556A` | Labels, metadata, placeholders |
| `--color-success` | `#10B981` | Validation success, fix text |
| `--color-warning` | `#F59E0B` | Mistake titles, caution labels |
| `--color-error` | `#EF4444` | Validation errors |
| `--color-beginner` | `#10B981` | Project difficulty badge |
| `--color-intermediate` | `#F59E0B` | Project difficulty badge |
| `--color-advanced` | `#7C3AED` | Project difficulty badge |

### Ambient Effects

- Background gradients: Two radial glow orbs at `opacity: 0.08–0.15` in violet/indigo, placed behind key sections
- These are pure CSS `radial-gradient` background properties — no images, zero performance cost

---

## 9. Typography

**Font family**: `Inter` (Google Fonts) — clean, modern, highly legible, widely trusted in dev tooling. Fallback: `system-ui, sans-serif`.

**Why Inter**: It is the de facto standard for modern SaaS products and developer tools. Users implicitly trust UIs built with Inter.

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| `display` | 56px | 800 | 1.1 | Hero headline |
| `h1` | 36px | 700 | 1.2 | Page titles, report heading |
| `h2` | 24px | 700 | 1.3 | Section headings |
| `h3` | 20px | 600 | 1.4 | Card titles, section titles |
| `h4` | 16px | 600 | 1.5 | Sub-section headings |
| `body-lg` | 18px | 400 | 1.6 | Hero sub-heading |
| `body` | 15px | 400 | 1.6 | General body text |
| `body-sm` | 14px | 400 | 1.5 | Descriptions, card text |
| `label` | 13px | 500 | 1.4 | Form labels, tags |
| `caption` | 12px | 400 | 1.4 | Metadata, timestamps |
| `overline` | 11px | 600 | 1.3 | Group headings (uppercase) |

### Letter Spacing

- Display / H1: `letter-spacing: -0.02em` — tighter for impact
- Body: `letter-spacing: 0em` — natural
- Overline / labels: `letter-spacing: 0.06em` — expanded for readability

---

## 10. Spacing System

**Base unit**: `4px`. All spacing is a multiple of 4.

| Token | Value | Typical Usage |
|-------|-------|---------------|
| `space-1` | 4px | Inline gaps, icon margins |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Close related elements |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Section inner padding (mobile) |
| `space-6` | 24px | Card gaps, section spacing |
| `space-8` | 32px | Section inner padding (desktop) |
| `space-10` | 40px | Card padding (desktop) |
| `space-12` | 48px | Large section margins |
| `space-16` | 64px | Between major sections |
| `space-24` | 96px | Hero vertical padding |

**Border radius scale**:

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Tags, pills, small elements |
| `radius-md` | 12px | Inputs, small cards |
| `radius-lg` | 16px | Feature cards |
| `radius-xl` | 20px | Report cards |
| `radius-2xl` | 24px | Form card, CTA banner |
| `radius-full` | 9999px | Buttons, badges |

---

## 11. Animation Philosophy

**Rule**: Animations must feel purposeful, not decorative. Every animation communicates state or enhances comprehension.

### Principles

1. **Fast in, slow out** — elements enter quickly, hover states resolve slowly on mouse-leave
2. **Subtle** — maximum movement is `4px` translate, `0.03` scale difference, `0.1` opacity
3. **Consistent duration** — micro-interactions: `150ms`, page transitions: `400ms`
4. **Ease curves** — use `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard ease)
5. **Respect `prefers-reduced-motion`** — all animations disabled for accessibility

### Animation Catalogue

| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Page load | Fade + `translateY(8px)` → 0 | 400ms | On mount |
| Button hover | Scale `1.03` + glow shadow | 150ms | Mouse enter |
| Button click | Scale `0.97` | 80ms | Mouse down |
| Card hover | `translateY(-2px)` + border brighten | 200ms | Mouse enter |
| Input focus | Border colour + ring | 150ms | Focus |
| Form error | `translateX` shake, 3 iterations | 300ms | Validation fail |
| Loading icon | Pulse + rotate | Infinite | Loading state |
| Progress bar | Width ease | 12s (fake) | Loading state |
| Status message | Fade out → fade in | 400ms | Every 2.5s |
| Report sections | Stagger fade up | 300ms each, 80ms delay | On scroll into view (IntersectionObserver) |
| Side nav active | Slide indicator | 200ms | Scroll position |

### Intersection Observer (Report Page)

Report sections animate in as the user scrolls. Each section starts at `opacity: 0, translateY: 16px` and transitions to `opacity: 1, translateY: 0` when it enters the viewport. Delay is staggered by 80ms per section.

**Why**: Makes the report feel like it's being revealed progressively, which increases the sense of value and keeps users reading.

---

## 12. Empty States

**Empty states in LearnoAI are minimal** because the flow is linear (form → report). However:

### When the report has no data for a section

```
[ Icon (muted) ]
  This section could not be generated.
  Try regenerating your roadmap.
  [ Regenerate ]
```

- Muted icon, `color: #55556A`
- No red errors — neutral framing
- Single action CTA

---

## 13. Error States

### 13.1 Form Validation Errors (Inline)

- Red border: `rgba(239,68,68,0.6)` on the specific field
- Error text below field: `12px`, `#EF4444`
- Shake animation on the field
- No full-page error

### 13.2 API Error (Generation Failure)

When the Gemini API fails:

```
[ AlertCircle icon, amber ]

  Something went wrong.

  We couldn't generate your roadmap. This is usually a temporary issue.

  [ Try Again ]   [ Start Over ]
```

- Full-page state (replaces the loading screen)
- Amber icon — warning, not catastrophic
- Two actions: retry (same inputs) or start over (back to form)
- Background: same dark base, no dramatic red takeover

### 13.3 Network Error

Same design as API error with different message:

```
  No connection detected. Please check your internet and try again.
```

---

## 14. Success States

### 14.1 Form Submission (Implicit Success)

The form doesn't show a "success" toast — it immediately transitions to the loading screen. The transition IS the success state.

The loading screen itself communicates "we received your request and we're working on it."

### 14.2 Report Loaded (Implicit Success)

The report appearing is the success state. No toast, no banner needed. The user's reaction is the success signal.

### 14.3 Valid Field Signal (Micro-success)

When a user fills a field correctly and tabs away:

- Border briefly flashes `rgba(16,185,129,0.5)` (green tint) then settles back to default
- Duration: 300ms flash
- Extremely subtle — just a "good" signal without being noisy

---

## 15. Accessibility Considerations

**Philosophy**: Accessibility is not optional. The target audience includes users with visual impairments, and hackathon judges will notice if the product is inaccessible.

### Colour Contrast

All text meets **WCAG AA** minimum:

| Element | Foreground | Background | Ratio |
|---------|-----------|-----------|-------|
| Body text | `#A0A0B4` | `#0A0A0F` | ≥ 4.5:1 ✓ |
| Headline | `#FFFFFF` | `#0A0A0F` | ≥ 15:1 ✓ |
| CTA button | `#FFFFFF` | `#7C3AED` | ≥ 4.5:1 ✓ |
| Error text | `#EF4444` | `#0A0A0F` | ≥ 4.5:1 ✓ |
| Muted text (labels) | `#8888A0` | `#0A0A0F` | Borderline — verify ✓ |

### Keyboard Navigation

- All interactive elements are reachable with `Tab`
- Focus ring is visible: `2px solid rgba(124,58,237,0.8)` — must not be removed
- Form pill-select responds to `Space` and `Enter`
- Report side nav responds to arrow keys

### Semantic HTML

- Page has exactly one `<h1>` per route
- Form uses `<label htmlFor>` for every field
- Form errors use `aria-describedby` to connect field to error message
- Report sections use `<section>` with `aria-labelledby`
- Navigation uses `<nav>` with `aria-label="Report navigation"`

### Screen Reader Support

- Loading screen: `aria-live="polite"` on the status message so screen readers announce each change
- Progress bar: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Report cards: appropriate heading hierarchy within each section

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

All animations and transitions are disabled for users who prefer reduced motion.

---

## Summary: Design Principles Recap

| Principle | Manifestation |
|-----------|--------------|
| **Minimal friction** | Single flow: Landing → Form → Loading → Report |
| **Premium feel** | Inter font, consistent spacing, ambient gradients, hover states |
| **Trustworthy** | No fake testimonials, honest resource attribution, clear disclaimers |
| **Motivating** | Capstone project, mistake avoidance section, "graduation project" framing |
| **Fast to build** | Reusable component atoms, CSS tokens, no over-engineered animation library |
| **Accessible** | WCAG AA contrast, keyboard navigation, semantic HTML, reduced motion support |
| **Dark only** | Single coherent theme, no complexity from light/dark toggling |
| **MVP-scoped** | No auth, no DB, no payments — zero features outside PROJECT.md |
