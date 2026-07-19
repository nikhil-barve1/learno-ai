import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { resourceCatalog } from "@/data/resourceCatalog";

const SYSTEM_PROMPT = `You are LearnoAI, an expert, senior-level learning consultant and technical mentor. 
Your goal is to generate a highly personalized, structured, and realistic learning roadmap for a student.

INSTRUCTIONS:
1. Analyze the User Profile carefully. 
2. Calculate the total learning hours available (months * 30 * hours). Do not propose a curriculum that exceeds this time constraint.
3. Be realistic. If the user wants to learn a complex topic in 1 month at 1 hr/day, focus on the absolute fundamentals and communicate the timeline constraint in the overview.
4. Keep explanations beginner-friendly, motivating, and free of unnecessary verbosity.
5. Provide ONLY valid, complete JSON. Do not include markdown code blocks around the response. Start directly with the { character.
6. Guardrails:
   - If the requested technology is completely invalid, illegal, or nonsensical, return a gentle error message in the "overview" and leave other fields as empty arrays/objects.
   - NEVER hallucinate URLs. 
   - Prefer official documentation. 
   - Recommend ONLY 100% free learning resources (no paid courses or paywalls).`;

function buildPrompt(formData, availableResources) {
  const { name, qualification, experience, technology, skillLevel, months, hours } = formData;
  const totalHours = Math.round(months * 30 * hours);

  const resourceStr = availableResources.length > 0 
    ? JSON.stringify(availableResources.map(r => ({ id: r.id, name: r.name, type: r.type, description: r.description })), null, 2)
    : "[]";

  return `${SYSTEM_PROMPT}

USER PROFILE:
- Name: ${name}
- Qualification: ${qualification}
- Current Experience: ${experience}
- Technology to Learn: ${technology}
- Current Skill Level: ${skillLevel}
- Available Time: ${months} months, ${hours} hours/day (~${totalHours} total learning hours)

AVAILABLE RESOURCES FOR THIS TECHNOLOGY:
${resourceStr}

INSTRUCTIONS FOR RESOURCES:
Do NOT generate your own URLs. Intelligently choose 4-6 of the most relevant resources from the AVAILABLE RESOURCES list above based on the user's profile.
Select resources from DIFFERENT categories (e.g., Docs, Course, YouTube, Practice, GitHub, Interview). Avoid selecting two resources that serve the exact same purpose (prefer variety).
For official_resources, choose items where type is "Docs" or "GitHub".
For learning_resources, choose items where type is "Course", "YouTube", "Practice", "Book", or "Interview".
Return only the resourceId and a reason why it fits the user. If the AVAILABLE RESOURCES list is empty, return empty arrays.

GENERATE A JSON RESPONSE MATCHING THIS EXACT SCHEMA (start with { directly, no markdown):
{
  "overview": "string — 2-3 sentence personalized welcoming overview",
  "roadmap": [{ "phase_number": number, "title": "string", "duration": "string e.g. Weeks 1-4", "description": "string" }],
  "weekly_plan": [{ "week": "string e.g. Week 1", "topic": "string", "details": "string", "is_project_week": boolean }],
  "official_resources": [{ "resourceId": "string", "reason": "string" }],
  "learning_resources": [{ "resourceId": "string", "reason": "string" }],
  "projects": [{ "title": "string", "difficulty": "Beginner|Intermediate|Advanced", "skills_practiced": ["string"], "estimated_time": "string" }],
  "interview_preparation": { "key_topics": ["string"], "strategy": ["string"] },
  "beginner_mistakes": [{ "mistake": "string", "fix": "string" }],
  "capstone_project": { "title": "string", "tech_stack": ["string"], "features": ["string"], "why_this_project": "string" }
}`;
}

async function callGemini(ai, prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  const text = response.text;

  // Strip any accidental markdown fences in case the model adds them
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

function processResources(roadmapData) {
  const processArray = (arr, isDocs) => {
    if (!Array.isArray(arr)) return [];
    
    return arr.map(item => {
      const resource = resourceCatalog.find(r => r.id === item.resourceId);
      if (!resource) {
        console.warn(`Unknown resourceId returned by Gemini: ${item.resourceId}`);
        return null;
      }
      return {
        name: resource.name,
        url: resource.url,
        type: resource.type,
        description: item.reason || resource.description
      };
    }).filter(Boolean);
  };

  if (roadmapData.official_resources) {
    roadmapData.official_resources = processArray(roadmapData.official_resources, true);
  }
  
  if (roadmapData.learning_resources) {
    roadmapData.learning_resources = processArray(roadmapData.learning_resources, false);
  }
  
  return roadmapData;
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured." },
        { status: 500 }
      );
    }

    const formData = await request.json();
    const { name, qualification, experience, technology, skillLevel, months, hours } = formData;

    // Basic server-side validation
    if (!name || !qualification || !experience || !technology || !skillLevel || !months || !hours) {
      return NextResponse.json(
        { error: "All form fields are required." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Find matching resources in the catalog (case-insensitive fuzzy match)
    const techLower = technology.toLowerCase();
    const availableResources = resourceCatalog.filter(r => 
      r.technology.toLowerCase() === techLower || techLower.includes(r.technology.toLowerCase())
    );
    
    const prompt = buildPrompt(formData, availableResources);

    let roadmapData;
    try {
      roadmapData = await callGemini(ai, prompt);
    } catch (firstError) {
      // Retry once on parse/network failure
      console.warn("First Gemini attempt failed, retrying:", firstError.message);
      try {
        roadmapData = await callGemini(ai, prompt);
      } catch (secondError) {
        console.error("Both Gemini attempts failed:", secondError.message);
        return NextResponse.json(
          { error: "Unable to generate your roadmap. Please try again." },
          { status: 502 }
        );
      }
    }

    // Enrich the AI response with trusted URLs from the catalog
    roadmapData = processResources(roadmapData);

    return NextResponse.json({ roadmap: roadmapData });
  } catch (err) {
    console.error("Unexpected error in generate-roadmap route:", err);
    return NextResponse.json(
      { error: "Unable to generate your roadmap. Please try again." },
      { status: 500 }
    );
  }
}
