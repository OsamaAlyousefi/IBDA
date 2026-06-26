"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import LangToggle from "./LangToggle";

/**
 * Masthead-style header: a bilingual wordmark with a small dateline, a thin
 * rule, and the language toggle. Reads like the top of a printed guide rather
 * than a generic app bar.
 */
export default function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-hairline bg-sand/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={t.brand}>
          <span className="font-serif-ar text-2xl font-bold leading-none text-ink">
            إبدأ
          </span>
          <span className="hidden h-6 w-px bg-hairline-strong sm:block" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif text-base italic text-terracotta">
              Ibda
            </span>
            <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-ink-faint">
              {t.issueLine}
            </span>
          </span>
        </Link>

        <LangToggle />
      </div>
    </header>
  );
}
