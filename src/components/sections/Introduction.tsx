import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal, ImageReveal } from "@/components/animations/Reveal";
import { Counter } from "@/components/animations/Counter";
import { SafeImage } from "@/components/ui/SafeImage";
import { introImage } from "@/data/images";
import { company, stats } from "@/data/company";

export function Introduction() {
  return (
    <section id="introduction" className="relative bg-ivory-100 py-24 md:py-36">
      <div className="container-wide grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-5">
          <ImageReveal className="relative aspect-[4/5] w-full">
            <SafeImage
              image={introImage}
              sizes="(min-width:1024px) 40vw, 100vw"
              className="h-full w-full"
              placeholderLabel="Firm photograph"
            />
          </ImageReveal>
          <div className="absolute -bottom-6 -right-2 hidden border border-gold-500/50 bg-ivory-100 p-6 md:block lg:-right-10" aria-hidden>
            <p className="font-serif text-5xl text-navy-900">{company.established}</p>
            <p className="eyebrow mt-1">Established</p>
          </div>
          <span className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold-500 md:block" aria-hidden />
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <Reveal>
            <p className="eyebrow">About the firm</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] text-navy-900">
              Accessible, efficient commercial and corporate law in South Africa.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal-700">
              Clarrence Mangena Incorporated was established in {company.established} and incorporated in {company.incorporated}. We are commercial, corporate
              and public law practitioners who believe in efficiency and results. Hard work and discipline are our lifeblood.
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-charcoal-500">
              {company.community} The firm has access to the Polokwane High Court and Magistrate Court, the Polokwane Deeds Office, the Department of Mineral
              Resources and the Master of the High Court.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {[company.ownership, `${company.bbbee}: ${company.procurementRecognition}`].map((t) => (
                <li key={t} className="flex items-start gap-3 border-l-2 border-gold-500 bg-ivory-200/60 px-4 py-3.5 text-[0.95rem] text-navy-900">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-ivory-300 pt-10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 mt-2 max-w-[9rem] text-xs uppercase leading-snug tracking-[0.14em] text-charcoal-500">{s.label}</dt>
                  <dd className="font-serif text-4xl text-navy-900 md:text-5xl">
                    <Counter value={s.value} suffix={"suffix" in s ? s.suffix : ""} format={"format" in s ? s.format : undefined} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.25}>
            <Link href="/about" className="link-underline mt-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
              Our story <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
