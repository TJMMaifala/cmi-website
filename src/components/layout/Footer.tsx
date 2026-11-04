import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { company, mapsSearchUrl, navLinks, offices, whatsappHref } from "@/data/company";
import { practiceAreas } from "@/data/practice-areas";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-ivory-100/80">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden />

      <div className="container-wide relative grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ivory-100/65">
            Commercial, corporate and public law practitioners who believe in efficiency and results. Established in {company.established};{" "}
            {company.ownership.toLowerCase()} and a {company.bbbee}.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-400">Polokwane · Sandton</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="eyebrow mb-5 !font-sans">Navigate</h2>
          <ul className="space-y-3 text-[0.95rem]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-ivory-100/80 hover:text-ivory-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Practice areas" className="lg:col-span-3">
          <h2 className="eyebrow mb-5 !font-sans">Practice Areas</h2>
          <ul className="space-y-3 text-[0.95rem]">
            {practiceAreas.map((p) => (
              <li key={p.slug}>
                <Link href={`/practice-areas/${p.slug}`} className="link-underline text-ivory-100/80 hover:text-ivory-50">
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 lg:col-span-3">
          <h2 className="eyebrow !font-sans">Offices</h2>
          {offices.map((o) => (
            <address key={o.id} className="not-italic text-[0.95rem] leading-relaxed">
              <p className="mb-2 font-serif text-lg text-ivory-50">{o.label}</p>
              <a
                href={mapsSearchUrl(o.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 text-ivory-100/70 hover:text-ivory-50"
              >
                <MapPin size={15} className="mt-1 shrink-0 text-gold-500" />
                <span>
                  {o.lines.join(", ")}
                  <ArrowUpRight size={13} className="ml-1 inline opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </a>
              <a href={o.phoneHref} className="mt-2 flex items-center gap-2 text-ivory-100/70 hover:text-ivory-50">
                <Phone size={15} className="shrink-0 text-gold-500" /> {o.phoneDisplay}
              </a>
            </address>
          ))}
          <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-[0.95rem] text-ivory-100/80 hover:text-ivory-50">
            <Mail size={15} className="shrink-0 text-gold-500" /> {company.email}
          </a>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full">
              WhatsApp us
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative border-t border-gold-500/15">
        <div className="container-wide flex flex-col gap-3 py-6 text-xs text-ivory-100/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="link-underline hover:text-ivory-100">
              Privacy Policy
            </Link>
            <span>
              Website by{" "}
              <span className="text-ivory-100/70">TJM Technology Group</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
