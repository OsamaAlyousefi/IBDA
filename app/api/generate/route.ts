import { NextRequest, NextResponse } from "next/server";
import { createCompletion } from "@/lib/llm";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import type { BusinessPlan, GenerateRequest, Language } from "@/lib/types";

// One AI call per submission. Runs only on the server — the key never ships.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Remove stray ```json fences / preamble the model might add despite instructions. */
function extractJson(raw: string): string {
  let text = raw.trim();

  // Strip a leading ```json or ``` fence and any trailing fence.
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  // If there is still surrounding prose, grab the outermost {...} block.
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    text = text.slice(first, last + 1);
  }

  return text.trim();
}

/** Read a string field, trimming; returns "" if missing or not a string. */
function str(obj: unknown, key: string): string {
  if (obj && typeof obj === "object") {
    const v = (obj as Record<string, unknown>)[key];
    if (typeof v === "string") return v.trim();
  }
  return "";
}

/** Localised placeholder so a single dropped field degrades gracefully, never 500s. */
function fallback(language: Language, value: string): string {
  if (value) return value;
  return language === "ar" ? "غير محدّد" : "Not specified";
}

/**
 * Repair a parsed model response into a complete BusinessPlan.
 *
 * Models (DeepSeek especially) occasionally omit a single sub-field. Rather
 * than reject the whole plan, we fill minor gaps with a localised placeholder.
 * We only bail out (return null) when the response is fundamentally unusable:
 * no business name, or not three real action steps.
 */
function normalizePlan(value: unknown, language: Language): BusinessPlan | null {
  if (!value || typeof value !== "object") return null;
  const p = value as Record<string, unknown>;

  const businessName = str(p, "businessName");
  if (!businessName) return null; // nothing meaningful came back

  // Need three steps that each at least have a title — the editorial spine.
  if (!Array.isArray(p.actionPlan) || p.actionPlan.length !== 3) return null;
  const actionPlan = p.actionPlan.map((s, i) => ({
    step: i + 1,
    title: fallback(language, str(s, "title")),
    description: fallback(language, str(s, "description")),
    timeframe: fallback(
      language,
      str(s, "timeframe") || (language === "ar" ? "هذا الأسبوع" : "This week")
    ),
  }));
  if (actionPlan.some((s) => str(s, "title") === "")) return null;

  return {
    businessName,
    oneLineSummary: fallback(language, str(p, "oneLineSummary")),
    actionPlan,
    licensing: {
      licenseType: fallback(language, str(p.licensing, "licenseType")),
      estimatedCostAED: fallback(language, str(p.licensing, "estimatedCostAED")),
      authority: fallback(language, str(p.licensing, "authority")),
      notes: fallback(language, str(p.licensing, "notes")),
    },
    canvas: {
      valueProposition: fallback(language, str(p.canvas, "valueProposition")),
      customerSegment: fallback(language, str(p.canvas, "customerSegment")),
      revenueStream: fallback(language, str(p.canvas, "revenueStream")),
      keyResource: fallback(language, str(p.canvas, "keyResource")),
    },
    firstCustomer: {
      whoToApproach: fallback(language, str(p.firstCustomer, "whoToApproach")),
      where: fallback(language, str(p.firstCustomer, "where")),
      openingScript: fallback(language, str(p.firstCustomer, "openingScript")),
    },
  };
}

export async function POST(req: NextRequest) {
  let body: Partial<GenerateRequest>;

  try {
    body = (await req.json()) as Partial<GenerateRequest>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const language: Language = body.language === "ar" ? "ar" : "en";
  const request: GenerateRequest = {
    idea: (body.idea ?? "").toString().slice(0, 1000),
    skill: (body.skill ?? "").toString().slice(0, 1000),
    budget: (body.budget ?? "").toString().slice(0, 200),
    language,
  };

  // Require at least something to work with.
  if (!request.idea.trim() && !request.skill.trim()) {
    return NextResponse.json(
      { error: "Please describe your idea or your skill." },
      { status: 400 }
    );
  }

  try {
    // DeepSeek is a reasoning model — give it generous headroom so reasoning
    // tokens don't crowd out the JSON answer.
    const raw = await createCompletion({
      system: SYSTEM_PROMPT,
      user: buildUserPrompt(request),
      maxTokens: 4000,
    });

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJson(raw));
    } catch {
      console.error("Failed to parse model JSON:", raw);
      return NextResponse.json(
        { error: "We couldn't read the plan. Please try again." },
        { status: 500 }
      );
    }

    const plan = normalizePlan(parsed, language);
    if (!plan) {
      console.error("Model JSON failed validation:", parsed);
      return NextResponse.json(
        { error: "The plan came back incomplete. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(plan);
  } catch (err) {
    console.error("Generation error:", err);
    const messageText =
      err instanceof Error && err.message.includes("OPENROUTER_API_KEY")
        ? err.message
        : "Something went wrong while creating your plan. Please try again.";
    return NextResponse.json({ error: messageText }, { status: 500 });
  }
}
