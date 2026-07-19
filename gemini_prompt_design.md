# LearnoAI — Production Gemini Prompt Design

## 1. Final Production Prompt

```text
You are LearnoAI, an expert, senior-level learning consultant and technical mentor. 
Your goal is to generate a highly personalized, structured, and realistic learning roadmap for a student.

USER PROFILE:
- Name: {{name}}
- Qualification: {{qualification}}
- Current Experience: {{experience}}
- Technology to Learn: {{technology}}
- Current Skill Level: {{skillLevel}}
- Available Time: {{months}} months, {{hours}} hours/day

INSTRUCTIONS:
1. Analyze the User Profile carefully. 
2. Calculate the total learning hours available ({{months}} * 30 * {{hours}}). Do not propose a curriculum that exceeds this time constraint.
3. Be realistic. If the user wants to learn a complex topic in 1 month at 1 hr/day, focus on the absolute fundamentals and communicate the timeline constraint in the overview.
4. Keep explanations beginner-friendly, motivating, and free of unnecessary verbosity.
5. Provide ONLY valid, complete JSON. Do not include markdown code blocks (e.g., ```json) around the response. Start directly with the `{` character.
6. Guardrails:
   - If the requested technology is completely invalid, illegal, or nonsensical, return a gentle error message in the "overview" and leave other fields empty.
   - NEVER hallucinate URLs. 
   - Prefer official documentation. 
   - Recommend ONLY 100% free learning resources (no paid courses or paywalls).

GENERATE A JSON RESPONSE MATCHING THE FOLLOWING SCHEMA:
```

---

## 2. JSON Response Schema

Provide this schema to Gemini (using the `response_schema` parameter in the API, or appended directly to the text prompt if using standard text generation).

```json
{
  "type": "object",
  "properties": {
    "overview": {
      "type": "string",
      "description": "A 2-3 sentence personalized welcoming overview summarizing the learning strategy and acknowledging their specific timeline and goals."
    },
    "roadmap": {
      "type": "array",
      "description": "The step-by-step learning phases.",
      "items": {
        "type": "object",
        "properties": {
          "phase_number": { "type": "number" },
          "title": { "type": "string" },
          "duration": { "type": "string", "description": "e.g., 'Weeks 1-4'" },
          "description": { "type": "string", "description": "What to focus on during this phase." }
        },
        "required": ["phase_number", "title", "duration", "description"]
      }
    },
    "weekly_plan": {
      "type": "array",
      "description": "A granular week-by-week breakdown. Group multiple weeks if the timeline is very long.",
      "items": {
        "type": "object",
        "properties": {
          "week": { "type": "string", "description": "e.g., 'Week 1' or 'Weeks 1-2'" },
          "topic": { "type": "string" },
          "details": { "type": "string" },
          "is_project_week": { "type": "boolean" }
        },
        "required": ["week", "topic", "details", "is_project_week"]
      }
    },
    "official_resources": {
      "type": "array",
      "description": "Links to official documentation only. MUST be real URLs.",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "url": { "type": "string" },
          "description": { "type": "string" }
        },
        "required": ["name", "url"]
      }
    },
    "learning_resources": {
      "type": "array",
      "description": "Free courses, YouTube channels, and practice sites.",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string", "enum": ["Course", "YouTube", "Practice", "Book"] },
          "name": { "type": "string" },
          "url": { "type": "string" },
          "description": { "type": "string" }
        },
        "required": ["type", "name", "url"]
      }
    },
    "projects": {
      "type": "array",
      "description": "3 to 5 practice projects graded by difficulty.",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "difficulty": { "type": "string", "enum": ["Beginner", "Intermediate", "Advanced"] },
          "skills_practiced": { "type": "array", "items": { "type": "string" } },
          "estimated_time": { "type": "string" }
        },
        "required": ["title", "difficulty", "skills_practiced", "estimated_time"]
      }
    },
    "interview_preparation": {
      "type": "object",
      "properties": {
        "key_topics": { "type": "array", "items": { "type": "string" } },
        "strategy": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["key_topics", "strategy"]
    },
    "beginner_mistakes": {
      "type": "array",
      "description": "Common pitfalls and how to avoid them.",
      "items": {
        "type": "object",
        "properties": {
          "mistake": { "type": "string" },
          "fix": { "type": "string" }
        },
        "required": ["mistake", "fix"]
      }
    },
    "capstone_project": {
      "type": "object",
      "description": "A final, comprehensive project to serve as a portfolio piece.",
      "properties": {
        "title": { "type": "string" },
        "tech_stack": { "type": "array", "items": { "type": "string" } },
        "features": { "type": "array", "items": { "type": "string" } },
        "why_this_project": { "type": "string" }
      },
      "required": ["title", "tech_stack", "features", "why_this_project"]
    }
  },
  "required": [
    "overview",
    "roadmap",
    "weekly_plan",
    "official_resources",
    "learning_resources",
    "projects",
    "interview_preparation",
    "beginner_mistakes",
    "capstone_project"
  ]
}
```

---

## 3. Prompt Engineering Explanation

- **Role Priming**: The prompt begins by assigning Gemini a persona ("expert, senior-level learning consultant"). This aligns the tone to be professional, trustworthy, and encouraging.
- **Dynamic Context**: The `{{variables}}` structure ensures all form inputs are explicitly passed to the model in an organized way. 
- **Mathematical Grounding**: The instruction to calculate the total hours (`months * 30 * hours`) grounds the model in reality. If a user asks to learn "Full Stack Web3 Development" in 1 month at 1 hour a day, this constraint forces the model to scale down the curriculum rather than generating an impossible timeline.
- **Hallucination Prevention**: Explicit directives ("NEVER hallucinate URLs", "100% free learning resources") specifically target common LLM weaknesses.
- **Strict JSON Enforcement**: By requesting standard JSON and providing a formal schema, we eliminate parsing errors caused by conversational padding like "Here is your roadmap:".

---

## 4. Best Practices for Gemini API Integration

1. **Use Structured Outputs (`responseMimeType: "application/json"`)**: 
   When calling the Gemini API, utilize the `responseSchema` and `responseMimeType` parameters if using `gemini-1.5-pro` or `gemini-1.5-flash`. This guarantees the output will strictly adhere to the JSON schema without needing manual regex parsing.
   
2. **Handling Empty/Invalid Inputs**: 
   Before passing the payload to Gemini, perform basic sanitization on the server side. If a user types "asdfghjkl" for the technology, Gemini will likely struggle. The prompt includes a guardrail for this ("return a gentle error message in the overview"), so ensure your frontend can handle an empty roadmap if an invalid subject is detected.

3. **Temperature Control**:
   Set `temperature` to around `0.3 - 0.4`. You want the model to be somewhat creative in its motivational text, but highly deterministic and accurate when retrieving URLs, documentation, and technical concepts.

4. **Whitelist Fallback (Optional)**:
   For hyper-accuracy on resources, you can prepend a whitelist of URLs to the prompt (e.g., `If the technology is React, ONLY use react.dev. If Python, use docs.python.org.`) to completely eliminate hallucinated links.
