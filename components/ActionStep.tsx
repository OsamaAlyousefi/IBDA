"use client";

import { Clock } from "lucide-react";
import type { BusinessPlan } from "@/lib/types";

/**
 * One row of the action checklist, styled like a printed guide: a large serif
 * numeral in the margin, the step title and description beside it, and the
 * timeframe as a small tagged label. Deliberately NOT a chat bubble.
 */
export default function ActionStep({
  step,
  timeframeLabel,
}: {
  step: BusinessPlan["actionPlan"][number];
  timeframeLabel: string;
}) {
  return (
    <li className="group relative flex gap-5 py-7 first:pt-0 last:pb-0 sm:gap-8">
      {/* Big serif numeral with a hairline rule beneath — print-index feel. */}
      <div className="flex shrink-0 flex-col items-center">
        <span
          aria-hidden="true"
          className="select-none font-serif text-5xl font-semibold leading-none text-terracotta tabular-nums sm:text-6xl"
        >
          {String(step.step).padStart(2, "0")}
        </span>
      </div>

      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="font-serif text-xl text-ink sm:text-2xl">
            {step.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-oasis-tint px-2.5 py-1 text-xs font-medium text-oasis">
            <Clock size={12} aria-hidden="true" />
            <span className="sr-only">{timeframeLabel}: </span>
            {step.timeframe}
          </span>
        </div>
        <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">
          {step.description}
        </p>
      </div>
    </li>
  );
}
