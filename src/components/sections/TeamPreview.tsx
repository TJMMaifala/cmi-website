import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { TeamPortrait } from "@/components/cards/TeamCard";
import { team } from "@/data/team";

export function TeamPreview() {
  const m = team[0];
  return (
    <section className="bg-ivory-100 py-24 md:py-36">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">Meet the director</p>
        </Reveal>
        <div className="mt-8 grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TeamPortrait member={m} />
          </div>
          <div className="lg:col-span-7 lg:pl-10">
            <Reveal>
              <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] text-navy-900">{m.name}</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-700">{m.title}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal-700">
                {m.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-8 space-y-2 border-t border-ivory-300 pt-6 text-[0.95rem] text-charcoal-500">
                {m.qualifications.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-gold-500" aria-hidden />
                    {q}
                  </li>
                ))}
              </ul>
              <Link href="/team" className="btn btn-navy mt-10">
                Full profile <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
