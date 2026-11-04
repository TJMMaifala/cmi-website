import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { company, mapsDirectionsUrl, offices, whatsappHref } from "@/data/company";

export function OfficeCards() {
  return (
    <div>
      <Stagger className="grid gap-px border border-ivory-300 bg-ivory-300 md:grid-cols-2" gap={0.12}>
        {offices.map((o) => (
          <StaggerItem key={o.id} className="bg-ivory-50">
            <address className="flex h-full flex-col p-8 not-italic md:p-10">
              <p className="eyebrow">{o.role}</p>
              <h3 className="mt-3 text-3xl text-navy-900">{o.label}</h3>
              <p className="mt-6 flex gap-3 leading-relaxed text-charcoal-700">
                <MapPin size={18} className="mt-1 shrink-0 text-gold-600" aria-hidden />
                <span>
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
              <a href={o.phoneHref} className="link-underline mt-4 flex w-fit items-center gap-3 text-charcoal-700 hover:text-navy-900">
                <Phone size={18} className="text-gold-600" aria-hidden /> {o.phoneDisplay}
              </a>
              <a
                href={mapsDirectionsUrl(o.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark mt-8 w-full sm:w-fit"
              >
                <Navigation size={15} /> Get directions<span className="sr-only"> to the {o.label} office (opens Google Maps)</span>
              </a>
            </address>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1} className="mt-px grid gap-px border border-t-0 border-ivory-300 bg-ivory-300 md:grid-cols-2">
        <div className="flex gap-4 bg-ivory-50 p-8 md:p-10">
          <Mail size={18} className="mt-1 shrink-0 text-gold-600" aria-hidden />
          <div>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${company.email}`} className="link-underline mt-2 block text-lg text-navy-900">
              {company.email}
            </a>
            {whatsappHref ? (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 flex w-fit items-center gap-2 text-charcoal-700">
                <MessageCircle size={16} className="text-gold-600" aria-hidden /> Message us on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex gap-4 bg-ivory-50 p-8 md:p-10">
          <Clock size={18} className="mt-1 shrink-0 text-gold-600" aria-hidden />
          <div>
            <p className="eyebrow">Working hours</p>
            <dl className="mt-2 space-y-1 text-charcoal-700">
              {company.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <dt>{h.days}</dt>
                  <dd className="text-navy-900">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
