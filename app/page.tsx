"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

/**
 * Landing page — editorial, not salesy.
 *
 * A masthead device (issue line + rule), a confident serif headline with a
 * highlighted phrase, a dropcap lead, one primary action, and a thin stat band
 * at the foot. Asymmetric and left-aligned (mirrors in RTL).
 */
export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <section className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        {/* Headline column */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="eyebrow">{t.landingKicker}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-[2.6rem] font-semibold leading-[1.04] tracking-tightest text-ink sm:text-6xl md:text-[4.2rem]">
              {lang === "ar" ? (
                <>
                  الفكرة ليست مشروعًا.{" "}
                  <em className="font-normal not-italic text-terracotta">
                    الخطوة الأولى
                  </em>{" "}
                  هي البداية.
                </>
              ) : (
                <>
                  An idea is not a business.{" "}
                  <em className="font-light italic text-terracotta">
                    The first step
                  </em>{" "}
                  is.
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="dropcap mt-8 max-w-prose text-lg leading-relaxed text-ink-soft sm:text-xl">
              {t.landingSub}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/start" className="btn-primary group">
                {t.start}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <span className="text-sm text-ink-faint">{t.landingNote}</span>
            </div>
          </Reveal>
        </div>

        {/* Sidebar: an index card, like the contents box of a printed guide. */}
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="card bg-sand-deep/50">
            <div className="mb-5 flex items-baseline justify-between border-b border-hairline pb-4">
              <span className="font-serif-ar text-xl font-bold text-ink">إبدأ</span>
              <span className="field-label">{t.issueLine}</span>
            </div>
            <ol className="space-y-5">
              {[
                { n: "01", en: "Describe your idea", ar: "صِف فكرتك" },
                { n: "02", en: "Get a real plan", ar: "احصل على خطة" },
                { n: "03", en: "Take the first step", ar: "اخطُ أول خطوة" },
              ].map((row) => (
                <li key={row.n} className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl font-semibold tabular-nums text-terracotta">
                    {row.n}
                  </span>
                  <span className="text-ink-soft">
                    {lang === "ar" ? row.ar : row.en}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* Stat band */}
      <Reveal delay={0.05}>
        <div className="grid grid-cols-3 divide-x divide-hairline border-y border-hairline rtl:divide-x-reverse">
          {[
            { big: t.landingStat1, sub: t.landingStat1Sub },
            { big: t.landingStat2, sub: t.landingStat2Sub },
            { big: t.landingStat3, sub: t.landingStat3Sub },
          ].map((s, i) => (
            <div key={i} className="px-4 py-7 text-center sm:py-8">
              <div className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                {s.big}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
