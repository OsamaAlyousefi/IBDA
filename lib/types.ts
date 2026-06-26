/**
 * The single shape returned by the AI for every submission.
 * Shared by the API route, the prompt builder, and every component that
 * renders a plan — this is the contract for the whole app.
 */
export interface BusinessPlan {
  businessName: string;
  oneLineSummary: string;
  actionPlan: {
    step: number;
    title: string;
    description: string;
    timeframe: string;
  }[]; // exactly 3
  licensing: {
    licenseType: string;
    estimatedCostAED: string;
    authority: string;
    notes: string;
  };
  canvas: {
    valueProposition: string;
    customerSegment: string;
    revenueStream: string;
    keyResource: string;
  };
  firstCustomer: {
    whoToApproach: string;
    where: string;
    openingScript: string;
  };
}

/** Two supported UI + content languages. "ar" drives RTL. */
export type Language = "en" | "ar";

/** What the input form collects and POSTs to /api/generate. */
export interface GenerateRequest {
  idea: string;
  skill: string;
  budget: string;
  language: Language;
}
