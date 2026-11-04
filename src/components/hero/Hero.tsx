"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { heroImage } from "@/data/images";
import { company } from "@/data/company";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = ["Legal Excellence.", "Built on Trust.", "Driven by Innovation."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-ivory-50">
      {/* Background photograph with slow parallax and a Ken-Burns-style settle */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20 h-[116%]">
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <SafeImage
            image={heroImage}
            sizes="100vw"
            priority
            className="h-full w-full"
            position="50% 30%"
            placeholderLabel="Hero photograph: run npm run fetch-images"
          />
        </motion.div>
      </motion.div>

      {/* Navy overlays for legibility and brand tone */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/55" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-900/40 to-transparent" aria-hidden />
      <div className="grid-motif animate-drift pointer-events-none absolute -inset-16 -z-10 opacity-50" aria-hidden />

      <motion.div style={{ y: textY, opacity: fade }} className="container-wide relative pb-28 pt-40 md:pb-36">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="flex items-center gap-4"
        >
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            style={{ transformOrigin: "left" }}
            className="block h-px w-14 bg-gold-500"
            aria-hidden
          />
          <p className="eyebrow eyebrow-dark">
            Attorneys &amp; Notaries · Polokwane · Sandton
          </p>
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-[clamp(2.75rem,8.4vw,7rem)] leading-[0.98] tracking-[-0.025em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={i === 1 ? "block italic text-gold-300" : "block"}
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
          className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ivory-100/80 md:text-lg"
        >
          Delivering strategic legal solutions through expertise, integrity and a forward-thinking approach to the evolving South African legal landscape.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/practice-areas" className="btn btn-gold">
            Explore Our Expertise <ArrowRight size={16} />
          </Link>
          <Link href="/contact?type=consultation#enquiry" className="btn btn-outline-light">
            Request a Consultation
          </Link>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-300/90"
        >
          <li>{company.ownership}</li>
          <li>{company.bbbee}</li>
          <li>Est. {company.established}</li>
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#introduction"
        aria-label="Scroll to introduction"
        className="absolute bottom-8 right-5 hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-ivory-100/60 transition-colors hover:text-gold-300 md:flex md:right-10"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-ivory-100/20">
          <span className="animate-scroll-cue absolute inset-0 bg-gold-400" />
        </span>
      </a>
    </section>
  );
}
