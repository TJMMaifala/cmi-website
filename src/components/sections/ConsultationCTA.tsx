import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { offices, whatsappHref } from "@/data/company";

export function ConsultationCTA() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-950 py-24 text-ivory-50 md:py-36">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="container-wide relative text-center">
        <Reveal>
          <p className="eyebrow eyebrow-dark">Ready to get answers from a qualified lawyer?</p>
          <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,6.4vw,5.4rem)] leading-[1.02]">
            Let&rsquo;s discuss <span className="italic text-gold-300">your legal needs.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/contact?type=consultation#enquiry" className="btn btn-gold">
            Request a Consultation <ArrowRight size={16} />
          </Link>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              <MessageCircle size={16} /> WhatsApp
            </a>
          ) : null}
          {offices.map((o) => (
            <a key={o.id} href={o.phoneHref} className="btn btn-outline-light">
              <Phone size={15} /> {o.label}: {o.phoneDisplay}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
