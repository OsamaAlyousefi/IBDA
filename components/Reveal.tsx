"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Restrained entrance animation: a short fade + rise, optionally staggered by
 * index. Honours prefers-reduced-motion (renders static). Nothing bouncy —
 * easing is a calm cubic, in keeping with the editorial tone.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "header" | "span";
}) {
  const reduce = useReducedMotion();
  // Cast away framer-motion's very wide union to keep TS happy with a dynamic tag.
  const MotionTag = motion[as] as ElementType;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
