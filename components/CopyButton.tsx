"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

/**
 * Small "copy to clipboard" affordance with a brief confirmed state.
 * Used for the pitch script and the whole-plan export.
 */
export default function CopyButton({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn-mini"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check size={14} aria-hidden="true" />
          {t.copied}
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden="true" />
          {label ?? t.copy}
        </>
      )}
    </button>
  );
}
