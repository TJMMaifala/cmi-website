import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { TeamPortrait } from "@/components/cards/TeamCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/data/company";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet Clarrence Mangena, Director, Attorney and Notary Public, formerly Law Researcher at the Constitutional Court of South Africa.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      {team.map((m) => (
        <JsonLd
          key={m.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: m.name.replace(/^Mr /, ""),
            jobTitle: "Director, Attorney and Notary Public",
            worksFor: { "@id": `${SITE_URL}/#organization` },
            alumniOf: { "@type": "CollegeOrUniversity", name: "University of Venda" },
          }}
        />
      ))}
      <PageHero
        eyebrow="Our team"
        title="Led by experience in public law."
        lead="Meet the director who leads the firm."
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Team" }]}
      />

      {team.map((m) => (
        <section key={m.slug} className="bg-ivory-100 py-20 md:py-28">
          <div className="container-wide grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <TeamPortrait member={m} priority />
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <Reveal>
                <h2 className="text-4xl leading-tight text-navy-900 md:text-6xl">{m.name}</h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-700">{m.title}</p>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal-700">
                  {m.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="mt-14 text-2xl text-navy-900">Qualifications</h3>
                <ul className="mt-4 space-y-3 text-charcoal-700">
                  {m.qualifications.map((q) => (
                    <li key={q} className="flex gap-3">
                      <span className="mt-3 h-px w-4 shrink-0 bg-gold-500" aria-hidden />
                      {q}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15}>
                <h3 className="mt-14 text-2xl text-navy-900">Professional experience</h3>
                <ol className="mt-6 border-l border-gold-500/50">
                  {m.experience.map((e) => (
                    <li key={e.period} className="relative pb-8 pl-8 last:pb-0">
                      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold-500" aria-hidden />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{e.period}</p>
                      <p className="mt-1 text-charcoal-700">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {m.quote ? (
                <Reveal delay={0.1}>
                  <blockquote className="mt-14 border-l-2 border-gold-500 pl-6 font-serif text-2xl italic leading-snug text-charcoal-700">
                    &ldquo;{m.quote}&rdquo;
                  </blockquote>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <ConsultationCTA />
    </>
  );
}
