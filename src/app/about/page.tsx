import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, ImageReveal } from "@/components/animations/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { images } from "@/data/images";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Clarrence Mangena Incorporated: a 100% Black-owned, B-BBEE Level 1 commercial, corporate and public law firm established in 2021, with offices in Polokwane and Sandton.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Accessible and efficient commercial and corporate law attorneys."
        lead="Commercial, corporate and public law practitioners who believe in efficiency and results."
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="bg-ivory-100 py-24 md:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-5 text-4xl leading-tight text-navy-900 md:text-5xl">Our clients tell it on our behalf.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-charcoal-700 lg:col-span-7">
            <p>
              The firm was established in {company.established} under the name and style Clarrence Mangena Incorporated and was incorporated in {company.incorporated}. It is{" "}
              {company.ownership.toLowerCase()} and a {company.bbbee}: {company.procurementRecognition}.
            </p>
            <p>
              We believe in work etiquette, collegiality and client service. Since we started practising, we have managed to overcome injustices for the benefit of our
              clients. We take every day as a day of growth for ourselves and our clients. We value time because we value our services, and we use time to protect our craft.
            </p>
            <p>{company.community}</p>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-ivory-50 md:py-28">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow eyebrow-dark">Reach and access</p>
            <h2 className="mt-5 text-3xl leading-tight md:text-5xl">Courts and institutions we have access to.</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xl text-gold-300">Courts</h3>
                <ul className="mt-3 space-y-2 text-ivory-100/70">
                  {company.courts.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl text-gold-300">Institutions</h3>
                <ul className="mt-3 space-y-2 text-ivory-100/70">
                  {company.institutions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <ImageReveal className="relative aspect-[4/3] w-full">
              <SafeImage image={images.about} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" placeholderLabel="Firm photograph" />
            </ImageReveal>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <section className="bg-ivory-100 pb-24 md:pb-32" aria-labelledby="gallery-h">
        <div className="container-wide">
          <h2 id="gallery-h" className="eyebrow mb-8">
            From the firm
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.gallery.slice(0, 4).map((g, i) => (
              <Reveal key={g.src} delay={i * 0.06}>
                <SafeImage image={g} sizes="(min-width:768px) 25vw, 50vw" className="aspect-[4/3] w-full" placeholderLabel={`Photograph ${i + 1}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
