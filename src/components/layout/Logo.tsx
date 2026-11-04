import Link from "next/link";
import { cn } from "@/lib/utils";

/** Styled wordmark: monogram + name. Built in code so it stays crisp at every size. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="Clarrence Mangena Inc. Attorneys & Notaries, home" className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "relative flex h-11 w-11 items-center justify-center border font-serif text-lg tracking-tight transition-colors duration-500",
          dark
            ? "border-navy-900 text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-300"
            : "border-gold-400 text-gold-300 group-hover:bg-gold-500 group-hover:text-navy-900",
        )}
      >
        CM
        <span className="absolute -bottom-px left-1/2 h-px w-5 -translate-x-1/2 bg-current opacity-60" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[1.15rem] tracking-tight", dark ? "text-navy-900" : "text-ivory-50")}>
          Clarrence Mangena Inc.
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em]",
            dark ? "text-gold-700" : "text-gold-400",
          )}
        >
          Attorneys &amp; Notaries
        </span>
      </span>
    </Link>
  );
}
