"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Language } from "@/lib/types";
import { getCopy, type Copy, LANG_STORAGE_KEY } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: Copy;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the active language, persists the choice, and — crucially — keeps the
 * <html> element's dir/lang attributes in sync so the whole layout mirrors for
 * Arabic (RTL).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Restore the saved language on first mount (client only).
  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  // Reflect language into the document so dir="rtl" and font direction follow.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Language) => setLangState(next), []);
  const toggle = useCallback(
    () => setLangState((prev) => (prev === "en" ? "ar" : "en")),
    []
  );

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggle, t: getCopy(lang) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
