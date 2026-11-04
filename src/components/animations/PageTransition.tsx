"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Gentle fade/rise on every route change. Never hides content from crawlers or delays interaction. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
