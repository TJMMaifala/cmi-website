import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { PracticeIcon } from "@/components/cards/PracticeIcon";
import { practiceAreas } from "@/data/practice-areas";

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="on-dark relative overflow-hidden bg-navy-900 py-24 text-ivory-50 md:py-36">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container-wide relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow eyebrow-dark">Our areas of practice</p>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.06]">How can we help you?</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ivory-100/65">
              A wide range of practice areas, led by commercial and corporate matters and public law.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-px border border-gold-500/20 bg-gold-500/20 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {practiceAreas.map((p) => (
            <StaggerItem key={p.slug} className="bg-navy-900">
              <Link
                href={`/practice-areas/${p.slug}`}
                className="group relative flex h-full min-h-[22rem] flex-col p-8 transition-colors duration-500 hover:bg-navy-800 md:p-10"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-x-100" aria-hidden />
                <div className="flex items-start justify-between">
                  <PracticeIcon name={p.icon} size={38} className="text-gold-400 transition-transform duration-500 group-hover:-translate-y-1" />
                  <span className="font-serif text-sm tracking-widest text-ivory-100/35">{p.number}</span>
                </div>
                <h3 className="mt-10 text-[1.45rem] leading-snug">{p.shortTitle}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory-100/60">{p.summary}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                  Learn more
                  <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
