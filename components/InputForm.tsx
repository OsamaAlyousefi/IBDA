"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { PLAN_STORAGE_KEY, REQUEST_STORAGE_KEY } from "@/lib/i18n";
import type { GenerateRequest } from "@/lib/types";

/**
 * The single input form. Collects idea / skill / budget, offers example
 * "sparks" to prefill, stashes the request in sessionStorage, then routes to
 * /plan — which performs the one AI call and renders the result.
 */
export default function InputForm() {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const [idea, setIdea] = useState("");
  const [skill, setSkill] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function applyExample(ex: { idea: string; skill: string }) {
    setIdea(ex.idea);
    setSkill(ex.skill);
    setError(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!idea.trim() && !skill.trim()) {
      setError(t.errorSub);
      return;
    }

    setSubmitting(true);
    const request: GenerateRequest = { idea, skill, budget, language: lang };

    // Stateless hand-off: clear any previous plan, store the fresh request.
    sessionStorage.removeItem(PLAN_STORAGE_KEY);
    sessionStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(request));
    router.push("/plan");
  }

  return (
    <div className="space-y-10">
      {/* Example sparks */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-ink-faint">
          <Lightbulb size={15} aria-hidden="true" />
          <span className="field-label">{t.examplesLabel}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {t.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyExample(ex)}
              className="chip"
              disabled={submitting}
            >
              {ex.idea}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <Field
          id="idea"
          index="01"
          label={t.ideaLabel}
          placeholder={t.ideaPlaceholder}
          value={idea}
          onChange={setIdea}
          textarea
          disabled={submitting}
        />
        <Field
          id="skill"
          index="02"
          label={t.skillLabel}
          placeholder={t.skillPlaceholder}
          value={skill}
          onChange={setSkill}
          textarea
          disabled={submitting}
        />
        <Field
          id="budget"
          index="03"
          label={t.budgetLabel}
          placeholder={t.budgetPlaceholder}
          value={budget}
          onChange={setBudget}
          disabled={submitting}
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-terracotta/30 bg-terracotta-tint px-4 py-3 text-sm text-terracotta-dark"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <button type="submit" className="btn-primary group" disabled={submitting}>
            {submitting ? t.generating : t.generate}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </button>
          <span className="text-sm text-ink-faint">{t.formHint}</span>
        </div>
      </form>
    </div>
  );
}

/** A labelled field with a margin index numeral and a hairline-underline focus. */
function Field({
  id,
  index,
  label,
  placeholder,
  value,
  onChange,
  textarea = false,
  disabled = false,
}: {
  id: string;
  index: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  disabled?: boolean;
}) {
  const shared =
    "w-full rounded-xl border border-hairline bg-sand/60 px-4 py-3 text-ink placeholder:text-ink-faint " +
    "transition-colors focus:border-terracotta focus:bg-sand focus:outline-none disabled:opacity-60";

  return (
    <div className="flex gap-4 sm:gap-5">
      <span
        aria-hidden="true"
        className="index-num mt-3 hidden sm:block"
      >
        {index}
      </span>
      <div className="flex-1">
        <label htmlFor={id} className="mb-2 block font-serif text-lg text-ink">
          {label}
        </label>
        {textarea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            disabled={disabled}
            className={shared + " resize-none leading-relaxed"}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={shared}
          />
        )}
      </div>
    </div>
  );
}
