import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/data/company";
import { getInsight, insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

// With no articles yet this is empty; the route then 404s for any slug.
export const dynamicParams = false;
export function generateStaticParams() {
  return insights.length ? insights.map((i) => ({ slug: i.slug })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/insights/${a.slug}` } };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          datePublished: a.date,
          description: a.excerpt,
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: `${SITE_URL}/insights/${a.slug}`,
        }}
      />
      <PageHero
        eyebrow={`${a.category} · ${formatDate(a.date)}`}
        title={a.title}
        lead={a.excerpt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Legal Insights", href: "/insights" }, { label: a.category }]}
      />
      <article className="bg-ivory-100 py-20 md:py-28">
        <div className="container-wide max-w-3xl">
          {a.thumbnail ? (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden">
              <Image src={a.thumbnail} alt={a.thumbnailAlt ?? a.title} fill sizes="768px" className="object-cover" />
            </div>
          ) : null}
          <div className="space-y-6 text-lg leading-relaxed text-charcoal-700">
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-14 border-t border-ivory-300 pt-6 text-sm text-charcoal-400">
            General information only; this article is not legal advice.
          </p>
        </div>
      </article>
      <ConsultationCTA />
    </>
  );
}
