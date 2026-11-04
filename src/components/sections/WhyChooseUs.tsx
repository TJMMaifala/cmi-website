import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { company } from "@/data/company";

export function WhyChooseUs() {
  return (
    <section className="bg-ivory-50 py-24 md:py-36">
      <div className="container-wide grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <p className="eyebrow">Why choose us</p>
          <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] text-navy-900">
            Furthering only your interests, in line with the law.
          </h2>
          <blockquote className="mt-10 border-l-2 border-gold-500 pl-6">
            <p className="font-serif text-xl italic leading-snug text-charcoal-700">
              &ldquo;It is the law that wraps its arms around us. And because of the law, our firm wraps its arms around you in vindicating your rights.&rdquo;
            </p>
            <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-charcoal-500">C. Mangena, Director</footer>
          </blockquote>
        </Reveal>

        <Stagger className="lg:col-span-7" gap={0.12}>
          <ol className="divide-y divide-ivory-300 border-y border-ivory-300">
            {company.values.map((v, i) => (
              <StaggerItem key={v.title}>
                <li className="group grid grid-cols-[3.5rem_1fr] gap-4 py-9 md:grid-cols-[5rem_1fr]">
                  <span className="font-serif text-4xl text-gold-600/60 transition-colors duration-500 group-hover:text-gold-600 md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl text-navy-900">{v.title}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-charcoal-500">{v.text}</p>
                  </div>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}
