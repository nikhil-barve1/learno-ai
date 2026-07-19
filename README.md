# LearnoAI

LearnoAI is an AI-powered learning consultant that generates personalized learning roadmaps from a user's goal, background, current skill level, and available study time.

Built as a hackathon MVP, LearnoAI helps learners answer practical questions quickly:

- What should I learn?
- In what order should I learn it?
- Which free resources should I use?
- How long will it take?
- What projects should I build?
- How should I prepare for interviews?

The application uses Gemini to dynamically generate roadmap content. No production roadmap content is hardcoded.

## Demo

Demo video: _Add hackathon demo video link here._

## Live Demo

Live app: _Add deployed Vercel URL here._

## Screenshots

_Add screenshots of the landing page, roadmap form, loading state, and generated roadmap report here._

## Features

- Personalized roadmap generation
- Weekly study plan
- Curated official and free learning resources
- Practice project recommendations
- Interview preparation guidance
- Beginner mistake warnings
- Capstone project recommendation
- Responsive dark UI
- Server-side Gemini integration

## AI Architecture

LearnoAI follows a server-side AI architecture:

```text
User form input
  -> Next.js client
  -> Next.js Route Handler
  -> Gemini API
  -> Structured JSON response
  -> Resource URL enrichment
  -> Roadmap report UI
```

The frontend collects the learner profile and sends it to `/api/generate-roadmap`. The route handler builds a structured prompt and calls Gemini from the server using `GEMINI_API_KEY`.

Gemini dynamically generates:

- Roadmap phases
- Weekly study plan
- Practice projects
- Interview preparation
- Beginner mistakes
- Capstone project
- Resource selections by ID

The Gemini API key is never exposed to the browser.

## Why the Resource Catalog Exists

The resource catalog exists only to guarantee trusted, verified URLs.

Large language models can hallucinate links. To avoid that, LearnoAI gives Gemini a curated list of available resources without letting it invent URLs. Gemini selects resources by `resourceId`, and the backend maps those IDs to verified URLs from `src/data/resourceCatalog.js`.

This keeps the roadmap AI-generated while making resource links safer and more reliable.

## Tech Stack

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Next.js Route Handlers
- Google Gemini API
- Lucide React
- Vercel

## Folder Structure

```text
src/
  app/
    api/
      generate-roadmap/
    roadmap/
    layout.js
    page.js
  components/
  data/
    resourceCatalog.js
```

## Installation

```bash
npm install
```

## Environment Variables

Create a local environment file:

```bash
.env.local
```

Add your Gemini API key:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not prefix the key with `NEXT_PUBLIC_`. It must remain server-side only.

## Running Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Deployment

The app is designed for deployment on Vercel.

Before deploying:

```bash
npm run lint
npm run build
```

In Vercel, configure `GEMINI_API_KEY` as a server-side environment variable.

## How AI Generation Works

1. The user submits their learning profile.
2. The frontend sends the form data to `/api/generate-roadmap`.
3. The backend builds a structured prompt for Gemini.
4. Gemini dynamically generates the roadmap JSON.
5. The backend validates and enriches selected resource IDs with trusted URLs.
6. The frontend renders the generated roadmap report.

No roadmap JSON is hardcoded into the production generation flow.

## Future Improvements

- User accounts
- Saved roadmap history
- Progress tracking
- PDF export
- Learning reminders
- Multiple AI providers
- Community roadmap sharing

## License

This project was created for hackathon submission. License terms can be added by the project owner before public distribution.
