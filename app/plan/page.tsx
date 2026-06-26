"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, RefreshCw, Printer } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import PlanCard from "@/components/PlanCard";
import PlanSkeleton from "@/components/PlanSkeleton";
import CopyButton from "@/components/CopyButton";
import { PLAN_STORAGE_KEY, REQUEST_STORAGE_KEY } from "@/lib/i18n";
import { planToText } from "@/lib/format";
import type { BusinessPlan, GenerateRequest } from "@/lib/types";

type Status = "idle" | "loading" | "ready" | "error" | "empty";

/**
 * Results page — the centerpiece. Reads the stored request, makes the single
 * AI call, and renders the plan. Caches the result so refresh/back-nav doesn't
 * re-call the API. Handles loading (skeleton), error (retry), and empty states.
 */
export default function PlanPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Guard against double-invocation in React Strict Mode (dev).
  const startedRef = useRef(false);

  const generate = useCallback(
    async (request: GenerateRequest) => {
      setStatus("loading");
      setErrorMsg(null);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        });

        const data = (await res.json().catch(() => null)) as
          | (BusinessPlan & { error?: undefined })
          | { error: string }
          | null;

        if (!res.ok || !data || "error" in data) {
          throw new Error(
            (data && "error" in data && data.error) || t.errorSub
          );
        }

        const result = data as BusinessPlan;
        sessionStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(result));
        setPlan(result);
        setStatus("ready");
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : t.errorSub);
        setStatus("error");
      }
    },
    [t.errorSub]
  );

  // On mount: render a cached plan if present, else generate from the request.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const cached = sessionStorage.getItem(PLAN_STORAGE_KEY);
    if (cached) {
      try {
        setPlan(JSON.parse(cached) as BusinessPlan);
        setStatus("ready");
        return;
      } catch {
        sessionStorage.removeItem(PLAN_STORAGE_KEY);
      }
    }

    const rawRequest = sessionStorage.getItem(REQUEST_STORAGE_KEY);
    if (!rawRequest) {
      setStatus("empty");
      return;
    }

    try {
      const request = JSON.parse(rawRequest) as GenerateRequest;
      void generate(request);
    } catch {
      setStatus("empty");
    }
  }, [generate]);

  function retry() {
    const rawRequest = sessionStorage.getItem(REQUEST_STORAGE_KEY);
    if (!rawRequest) {
      router.push("/start");
      return;
    }
    try {
      void generate(JSON.parse(rawRequest) as GenerateRequest);
    } catch {
      router.push("/start");
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {(status === "idle" || status === "loading") && <PlanSkeleton t={t} />}

      {status === "ready" && plan && (
        <>
          <PlanCard plan={plan} t={t} />

          {/* Footer actions — quiet, flat, hidden when printing. */}
          <div className="no-print mt-16 border-t border-hairline pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/start" className="btn-primary">
                <Plus size={18} aria-hidden="true" />
                {t.startOver}
              </Link>
              <button type="button" onClick={retry} className="btn-ghost">
                <RefreshCw size={17} aria-hidden="true" />
                {t.regenerate}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-ghost"
              >
                <Printer size={17} aria-hidden="true" />
                {t.print}
              </button>
            </div>
            <div className="mt-4">
              <CopyButton text={planToText(plan, t)} label={t.copyPlan} />
            </div>
          </div>
        </>
      )}

      {status === "error" && (
        <StateBlock
          title={t.errorTitle}
          sub={errorMsg || t.errorSub}
          primary={{ label: t.retry, onClick: retry }}
          secondary={{ label: t.backToStart, href: "/start" }}
        />
      )}

      {status === "empty" && (
        <StateBlock
          title={t.noPlanTitle}
          sub={t.noPlanSub}
          secondary={{ label: t.start, href: "/start" }}
        />
      )}
    </main>
  );
}

/** Shared centered block for error / empty states. */
function StateBlock({
  title,
  sub,
  primary,
  secondary,
}: {
  title: string;
  sub: string;
  primary?: { label: string; onClick: () => void };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="animate-fade-rise py-16">
      <p className="eyebrow mb-4">إبدأ</p>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-prose text-lg text-ink-soft">{sub}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {primary && (
          <button type="button" onClick={primary.onClick} className="btn-primary">
            {primary.label}
          </button>
        )}
        {secondary && (
          <Link href={secondary.href} className="btn-ghost">
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
