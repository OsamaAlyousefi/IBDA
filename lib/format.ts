import type { BusinessPlan } from "./types";
import type { Copy } from "./i18n";

/**
 * Render a BusinessPlan as clean, shareable plain text using the active
 * language's labels. Used by the "copy whole plan" action so a founder can
 * paste their plan into notes or a message.
 */
export function planToText(plan: BusinessPlan, t: Copy): string {
  const lines: string[] = [];

  lines.push(plan.businessName);
  lines.push(plan.oneLineSummary);
  lines.push("");

  lines.push(`# ${t.actionTitle}`);
  for (const step of plan.actionPlan) {
    lines.push(
      `${String(step.step).padStart(2, "0")}. ${step.title} (${step.timeframe})`
    );
    lines.push(`   ${step.description}`);
  }
  lines.push("");

  lines.push(`# ${t.licensingTitle}`);
  lines.push(`${t.licenseType}: ${plan.licensing.licenseType}`);
  lines.push(`${t.estCost}: ${plan.licensing.estimatedCostAED}`);
  lines.push(`${t.authority}: ${plan.licensing.authority}`);
  lines.push(`${t.notes}: ${plan.licensing.notes}`);
  lines.push("");

  lines.push(`# ${t.canvasTitle}`);
  lines.push(`${t.valueProp}: ${plan.canvas.valueProposition}`);
  lines.push(`${t.customerSegment}: ${plan.canvas.customerSegment}`);
  lines.push(`${t.revenue}: ${plan.canvas.revenueStream}`);
  lines.push(`${t.keyResource}: ${plan.canvas.keyResource}`);
  lines.push("");

  lines.push(`# ${t.firstCustomerTitle}`);
  lines.push(`${t.whoToApproach}: ${plan.firstCustomer.whoToApproach}`);
  lines.push(`${t.where}: ${plan.firstCustomer.where}`);
  lines.push(`${t.script}: "${plan.firstCustomer.openingScript}"`);
  lines.push("");

  lines.push("— Ibda · إبدأ · Al Qua'a, Al Ain");

  return lines.join("\n");
}
