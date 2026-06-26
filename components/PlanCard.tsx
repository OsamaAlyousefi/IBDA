"use client";

import {
  ListChecks,
  Stamp,
  LayoutGrid,
  MessageSquareQuote,
  type LucideIcon,
} from "lucide-react";
import type { BusinessPlan } from "@/lib/types";
import type { Copy } from "@/lib/i18n";
import ActionStep from "./ActionStep";
import Reveal from "./Reveal";
import CopyButton from "./CopyButton";

/**
 * The centerpiece: a full BusinessPlan rendered as an editorial document.
 *
 * 1. Masthead     — business name as a headline + one-line summary
 * 2. Action plan  — three steps as a numbered, printed checklist
 * 3. Licensing    — "making it official"
 * 4. Canvas       — a four-cell, hairline-divided grid
 * 5. First customer — who / where / the script to say (copyable)
 *
 * Sections are numbered (01–04) with line icons, and reveal with a calm stagger.
 */
export default function PlanCard({
  plan,
  t,
}: {
  plan: BusinessPlan;
  t: Copy;
}) {
  return (
    <article className="space-y-16 sm:space-y-20">
      {/* 1 — Masthead */}
      <Reveal as="header">
        <p className="eyebrow mb-5">{t.planFor}</p>
        <h1 className="text-[2.4rem] font-semibold leading-[1.03] tracking-tightest text-ink sm:text-6xl">
          {plan.businessName}
        </h1>
        <div className="mt-6 flex items-start gap-4">
          <span aria-hidden="true" className="mt-3 h-px w-10 shrink-0 bg-terracotta" />
          <p className="max-w-prose font-serif text-xl italic leading-relaxed text-ink-soft sm:text-2xl">
            {plan.oneLineSummary}
          </p>
        </div>
      </Reveal>

      {/* 2 — Action plan */}
      <Section index="01" icon={ListChecks} title={t.actionTitle} lead={t.actionLead}>
        <ol className="divide-y divide-hairline">
          {plan.actionPlan.map((step) => (
            <ActionStep key={step.step} step={step} timeframeLabel={t.timeframe} />
          ))}
        </ol>
      </Section>

      {/* 3 — Licensing */}
      <Section index="02" icon={Stamp} title={t.licensingTitle}>
        <div className="card grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          <Detail label={t.licenseType} value={plan.licensing.licenseType} />
          <Detail
            label={t.estCost}
            value={plan.licensing.estimatedCostAED}
            accent
          />
          <Detail label={t.authority} value={plan.licensing.authority} />
          <Detail label={t.notes} value={plan.licensing.notes} />
        </div>
      </Section>

      {/* 4 — Business model canvas */}
      <Section index="03" icon={LayoutGrid} title={t.canvasTitle}>
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline sm:grid-cols-2">
          <CanvasCell
            label={t.valueProp}
            value={plan.canvas.valueProposition}
            className="border-b border-hairline sm:border-e"
          />
          <CanvasCell
            label={t.customerSegment}
            value={plan.canvas.customerSegment}
            className="border-b border-hairline"
          />
          <CanvasCell
            label={t.revenue}
            value={plan.canvas.revenueStream}
            className="border-b border-hairline sm:border-b-0 sm:border-e"
          />
          <CanvasCell label={t.keyResource} value={plan.canvas.keyResource} />
        </div>
      </Section>

      {/* 5 — First customer */}
      <Section index="04" icon={MessageSquareQuote} title={t.firstCustomerTitle}>
        <div className="card space-y-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Detail
              label={t.whoToApproach}
              value={plan.firstCustomer.whoToApproach}
            />
            <Detail label={t.where} value={plan.firstCustomer.where} />
          </div>

          {/* The script reads like a pull-quote — something to say out loud. */}
          <div className="rounded-xl border border-hairline bg-terracotta-tint/40 p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="field-label">{t.script}</p>
              <CopyButton
                text={plan.firstCustomer.openingScript}
                label={t.copyScript}
              />
            </div>
            <p className="font-serif text-lg italic leading-relaxed text-ink sm:text-xl">
              {"“"}
              {plan.firstCustomer.openingScript}
              {"”"}
            </p>
          </div>
        </div>
      </Section>
    </article>
  );
}

/** A numbered, icon-led section with an optional lead line. */
function Section({
  index,
  icon: Icon,
  title,
  lead,
  children,
}: {
  index: string;
  icon: LucideIcon;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3 border-b border-hairline pb-3">
          <span className="index-num">{index}</span>
          <Icon size={16} className="text-terracotta" aria-hidden="true" />
          <h2 className="flex-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {title}
          </h2>
        </div>
        {lead && <p className="text-ink-soft">{lead}</p>}
      </div>
      {children}
    </Reveal>
  );
}

/** Label-over-value pair. `accent` inks the value in terracotta for emphasis. */
function Detail({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="field-label mb-1.5">{label}</p>
      <p
        className={[
          "leading-relaxed",
          accent ? "font-serif text-xl text-terracotta tnum" : "text-ink-soft",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

/** One quadrant of the canvas grid. */
function CanvasCell({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={"bg-sand/60 p-6 sm:p-7 " + className}>
      <p className="field-label mb-2">{label}</p>
      <p className="leading-relaxed text-ink">{value}</p>
    </div>
  );
}
