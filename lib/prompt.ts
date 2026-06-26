import type { GenerateRequest } from "./types";

/**
 * System prompt — fixes the advisor's persona, the local UAE / Al Ain context,
 * and the hard rule that the model must return ONLY raw JSON.
 */
export const SYSTEM_PROMPT = `You are a practical business advisor for first-time founders in rural Al Qua'a, in the Al Ain region of the UAE. Many residents run camel farms or have local skills but have never started a business. They need concrete, doable first steps, not generic advice. Rules: Be specific to the UAE / Al Ain context — reference real license authorities (Abu Dhabi DED, TAMM platform), realistic AED cost ranges, and local realities. Keep language plain and encouraging; assume no business background. Every action must be doable this week with what they have. Costs must be realistic ranges, never fake-precise single numbers. Return ONLY valid JSON matching the schema — no markdown, no backticks, no preamble.`;

/**
 * Build the per-submission user prompt. Spells out the exact JSON schema so the
 * response can be parsed straight into a BusinessPlan, and pins the response
 * language to the user's choice.
 */
export function buildUserPrompt({
  idea,
  skill,
  budget,
  language,
}: GenerateRequest): string {
  const languageInstruction =
    language === "ar"
      ? 'Respond entirely in Arabic (Modern Standard Arabic, plain and warm). All string values must be in Arabic.'
      : "Respond entirely in English.";

  return `A first-time founder from rural Al Qua'a has shared the following:

- Their idea: ${idea || "(not specified — infer a sensible local opportunity)"}
- Their skill or what they already have: ${skill || "(not specified)"}
- Their rough starting budget: ${budget || "(not specified — assume very limited)"}

Create a concrete startup plan tailored to them and to the Al Ain / Abu Dhabi context.

${languageInstruction}

Return ONLY a single JSON object with EXACTLY these keys and shapes:

{
  "businessName": string,                       // a memorable, fitting name
  "oneLineSummary": string,                      // one sentence, headline-worthy
  "actionPlan": [                                // EXACTLY 3 items, ordered
    { "step": 1, "title": string, "description": string, "timeframe": string },
    { "step": 2, "title": string, "description": string, "timeframe": string },
    { "step": 3, "title": string, "description": string, "timeframe": string }
  ],
  "licensing": {
    "licenseType": string,                       // e.g. the real DED licence that fits
    "estimatedCostAED": string,                  // a realistic RANGE, e.g. "1,500–3,500 AED"
    "authority": string,                         // real authority / platform (e.g. Abu Dhabi DED via TAMM)
    "notes": string                              // plain-language practical note
  },
  "canvas": {
    "valueProposition": string,
    "customerSegment": string,
    "revenueStream": string,
    "keyResource": string
  },
  "firstCustomer": {
    "whoToApproach": string,                      // a specific, reachable first customer
    "where": string,                              // a real local place/channel to find them
    "openingScript": string                       // a short, natural opening they can say out loud
  }
}

Every action in actionPlan must be doable this week with what they already have. Include EVERY key shown above — never omit canvas.keyResource or any other field. Do not wrap the JSON in markdown or backticks. Output the JSON object only.`;
}
