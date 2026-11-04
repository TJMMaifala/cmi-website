import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, ImageReveal } from "@/components/animations/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { images } from "@/data/images";
import { SITE_URL } from "@/data/company";
import { getPracticeArea, practiceAreas } from "@/data/practice-areas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPracticeArea(slug);
  if (!p) return {};
  return {
    title: p.shortTitle,
    description: p.summary,
    keywords: p.seoKeywords,
    alternates: { canonical: `/practice-areas/${p.slug}` },
    openGraph: { title: `${p.shortTitle} | Clarrence Mangena Inc.`, description: p.summary, url: `${SITE_URL}/practice-areas/${p.slug}` },
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const p = getPracticeArea(slug);
  if (!p) notFound();

  const idx = practiceAreas.findIndex((x) => x.slug === slug);
  const next = practiceAreas[(idx + 1) % practiceAreas.length];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.title,
          description: p.summary,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: ["Polokwane", "Sandton", "South Africa"],
          url: `${SITE_URL}/practice-areas/${p.slug}`,
        }}
      />
      <PageHero
        eyebrow={`Practice area ${p.number}`}
        title={p.title}
        lead={p.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas", href: "/practice-areas" }, { label: p.shortTitle }]}
      />

      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-wide grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Overview</p>
              <p className="mt-6 text-xl leading-relaxed text-charcoal-700">{p.overview}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-14 text-3xl text-navy-900">What we do</h2>
              <ul className="mt-6 divide-y divide-ivory-300 border-y border-ivory-300">
                {p.services.map((s) => (
                  <li key={s} className="flex gap-4 py-4 text-charcoal-700">
                    <Check size={18} className="mt-1 shrink-0 text-gold-600" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 text-sm leading-relaxed text-charcoal-400">
                This page is general information about the firm&rsquo;s services and is not legal advice. Please contact us to discuss your specific matter.
              </p>
              <Link href={`/contact?type=consultation&area=${encodeURIComponent(p.shortTitle)}#enquiry`} className="btn btn-navy mt-8">
                Request a consultation <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <ImageReveal className="relative aspect-[4/5] w-full lg:sticky lg:top-28">
              <SafeImage image={images[p.image]} sizes="(min-width:1024px) 40vw, 100vw" className="h-full w-full" placeholderLabel={p.shortTitle} />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ivory-300 bg-ivory-50 py-14">
        <div className="container-wide">
          <Link href={`/practice-areas/${next.slug}`} className="group flex items-center justify-between gap-6">
            <span>
              <span className="eyebrow block">Next practice area</span>
              <span className="mt-2 block font-serif text-2xl text-navy-900 transition-colors group-hover:text-gold-700 md:text-4xl">{next.shortTitle}</span>
            </span>
            <ArrowRight size={28} className="shrink-0 text-gold-600 transition-transform duration-500 group-hover:translate-x-2" aria-hidden />
          </Link>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
