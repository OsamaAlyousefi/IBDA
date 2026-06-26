"use client";

import { useLanguage } from "./LanguageProvider";
import type { Language } from "@/lib/types";

/**
 * A flat EN / AR segmented control. No icons, no glow — just a hairline-bordered
 * pill with the active language inked in.
 */
export default function LangToggle() {
  const { lang, setLang } = useLanguage();

  const options: { value: Language; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ar", label: "ع" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-hairline bg-sand p-0.5"
    >
      {options.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={[
              "min-w-[2.25rem] rounded-full px-3 py-1 text-sm font-medium transition-colors",
              active
                ? "bg-ink text-sand"
                : "text-ink-soft hover:text-ink",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
