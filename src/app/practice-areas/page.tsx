import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { PracticeIcon } from "@/components/cards/PracticeIcon";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { additionalAreas, practiceAreas } from "@/data/practice-areas";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Commercial and corporate matters, trusts, wills and deceased estates, construction, mineral rights, municipal and procurement law, family law, notarial services and constitutional litigation.",
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title="How can we help you?"
        lead="Six core areas of practice, serving clients from our Polokwane and Sandton offices."
        crumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
      />

      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-wide">
          <ul className="divide-y divide-ivory-300 border-y border-ivory-300">
            {practiceAreas.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={0.04}>
                <Link href={`/practice-areas/${p.slug}`} className="group grid items-center gap-6 py-10 md:grid-cols-12 md:gap-8">
                  <span className="font-serif text-3xl text-gold-600/60 md:col-span-1">{p.number}</span>
                  <div className="flex items-start gap-5 md:col-span-5">
                    <PracticeIcon name={p.icon} size={34} className="mt-1 shrink-0 text-gold-600" />
                    <h2 className="text-2xl leading-snug text-navy-900 transition-colors group-hover:text-gold-700 md:text-[1.75rem]">{p.title}</h2>
                  </div>
                  <p className="leading-relaxed text-charcoal-500 md:col-span-5">{p.summary}</p>
                  <span className="flex md:col-span-1 md:justify-end" aria-hidden={i < 0}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/20 text-navy-900 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500">
                      <ArrowUpRight size={18} />
                    </span>
                    <span className="sr-only">Learn more about {p.shortTitle}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-ivory-50 md:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow eyebrow-dark">Also</p>
            <h2 className="mt-5 text-3xl leading-tight md:text-4xl">The firm also specialises in the following.</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {additionalAreas.map((a) => (
                <li key={a} className="flex gap-3 border-b border-gold-500/15 pb-4 text-ivory-100/75">
                  <span className="mt-3 h-px w-4 shrink-0 bg-gold-500" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
