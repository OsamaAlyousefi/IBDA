"use client";

import InputForm from "@/components/InputForm";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

/**
 * Input page. A calm, single-column form preceded by an editorial intro.
 * Everything funnels into one AI call.
 */
export default function StartPage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <Reveal>
        <p className="eyebrow mb-5">{t.formKicker}</p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {t.formTitle}
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
          {t.formLead}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <InputForm />
      </Reveal>
    </main>
  );
}
