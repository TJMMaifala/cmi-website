"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  /** "year" prevents thousands separators (2021, not 2,021). */
  format?: "year";
  duration?: number;
};

/** Counts up to a verified figure once it scrolls into view. Shows the final value immediately for reduced motion. */
export function Counter({ value, suffix = "", format, duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const current = reduce ? value : n;
  const shown = format === "year" ? String(current) : current.toLocaleString("en-ZA");
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {shown}
        {suffix}
      </span>
    </span>
  );
}
