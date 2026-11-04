import { Hero } from "@/components/hero/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { OfficeCards } from "@/components/sections/OfficeCards";
import { Reveal } from "@/components/animations/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <PracticeAreas />
      <WhyChooseUs />
      <TeamPreview />
      <InsightsPreview />
      <ConsultationCTA />
      <section className="bg-ivory-100 py-24 md:py-32" aria-labelledby="home-contact">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Find us</p>
            <h2 id="home-contact" className="mt-5 mb-14 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] text-navy-900">
              Polokwane and Sandton.
            </h2>
          </Reveal>
          <OfficeCards />
        </div>
      </section>
    </>
  );
}
