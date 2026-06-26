"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Copy } from "@/lib/i18n";

/**
 * Calm loading state shown while the AI generates — a content skeleton that
 * mirrors the real plan layout (no spinner gif), with a soft shimmer sweep and
 * rotating microcopy so the wait feels considered, not stalled.
 */
export default function PlanSkeleton({ t }: { t: Copy }) {
  const [msgIndex, setMsgIndex] = useState(0);

  // Cycle the reassuring microcopy every couple of seconds.
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % t.loadingMessages.length);
    }, 2200);
    return () => clearInterval(id);
  }, [t.loadingMessages.length]);

  return (
    <div className="animate-fade-in" aria-live="polite" aria-busy="true">
      <p className="eyebrow mb-5">{t.loadingTitle}</p>

      {/* Masthead placeholder */}
      <div className="space-y-4">
        <Bar className="h-12 w-3/4 sm:h-16" />
        <Bar className="h-5 w-2/3" />
      </div>

      {/* Rotating status line */}
      <div className="mt-7 flex items-center gap-2.5 text-ink-soft">
        <Loader2 size={16} className="animate-spin text-terracotta" aria-hidden="true" />
        <span key={msgIndex} className="animate-fade-in text-sm">
          {t.loadingMessages[msgIndex]}
        </span>
      </div>

      {/* Three step placeholders */}
      <div className="mt-14 divide-y divide-hairline">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-6 py-7">
            <Bar className="h-12 w-12 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-3 pt-1">
              <Bar className="h-6 w-1/2" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>

      {/* Section card placeholder */}
      <div className="card mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Bar className="h-3 w-24" />
            <Bar className="h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A single shimmering placeholder bar. */
function Bar({ className = "" }: { className?: string }) {
  return <div className={"shimmer rounded bg-sand-dark " + className} />;
}
