import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/** Dark editorial header used at the top of inner pages. The fixed navbar sits transparently over it. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 pb-16 pt-36 text-ivory-50 md:pb-24 md:pt-44">
      <div className="grid-motif animate-drift pointer-events-none absolute -inset-16 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="container-wide relative">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ivory-100/55">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="link-underline hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gold-300">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 ? <ChevronRight size={12} aria-hidden /> : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="eyebrow eyebrow-dark">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.04]">{title}</h1>
        {lead ? <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory-100/70">{lead}</p> : null}
        <div className="hairline mt-12 w-40" aria-hidden />
      </div>
    </section>
  );
}
