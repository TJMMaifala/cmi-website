import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";

export function InsightsPreview({ limit = 3, showHeading = true }: { limit?: number; showHeading?: boolean }) {
  const items = insights.slice(0, limit);
  return (
    <section className="bg-ivory-50 py-24 md:py-32">
      <div className="container-wide">
        {showHeading ? (
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Legal insights</p>
              <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] text-navy-900">Perspectives on South African law.</h2>
            </div>
            <Link href="/insights" className="link-underline inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
              All insights <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        ) : null}

        {items.length === 0 ? (
          <Reveal delay={0.1} className="mt-14 flex flex-col items-start gap-5 border border-dashed border-gold-600/50 bg-ivory-100 p-10 md:flex-row md:items-center md:p-14">
            <Newspaper size={40} strokeWidth={1.2} className="text-gold-600" aria-hidden />
            <div>
              <h3 className="text-2xl text-navy-900">Articles are on their way.</h3>
              <p className="mt-2 max-w-xl text-charcoal-500">
                Our legal insights and South African legal updates will be published here. In the meantime, contact us to discuss your matter.
              </p>
            </div>
          </Reveal>
        ) : (
          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {items.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-navy-800">
                    {a.thumbnail ? (
                      <Image src={a.thumbnail} alt={a.thumbnailAlt ?? a.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : null}
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-700">
                    {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time>
                  </p>
                  <h3 className="mt-3 text-2xl leading-snug text-navy-900 transition-colors group-hover:text-gold-700">{a.title}</h3>
                  <p className="mt-3 text-charcoal-500">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy-900">
                    Read more <ArrowUpRight size={14} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
