import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { OfficeCards } from "@/components/sections/OfficeCards";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Clarrence Mangena Inc. in Polokwane (015 880 1882) or Sandton (010 157 3065), or request a consultation online.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ type?: string; area?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const kind = sp.type === "consultation" ? "consultation" : "contact";

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Get in touch."
        lead="We are always ready to hear from you. Get in touch with us for a consultation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-wide">
          <OfficeCards />
        </div>
      </section>

      <section id="enquiry" className="bg-ivory-50 py-20 md:py-28">
        <div className="container-wide grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Enquiry</p>
            <h2 className="mt-5 text-4xl leading-tight text-navy-900">Review your case with us.</h2>
            <p className="mt-6 leading-relaxed text-charcoal-500">
              Tell us briefly about your matter and which office suits you. Your details are used only to respond to your enquiry.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <EnquiryForm key={kind} initialKind={kind} defaultArea={sp.area} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
