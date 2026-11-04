import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";

export const metadata: Metadata = {
  title: "Legal Insights",
  description: "Articles and South African legal updates from Clarrence Mangena Inc.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal insights"
        title="Perspectives on South African law."
        lead="Articles and legal updates from our practitioners."
        crumbs={[{ label: "Home", href: "/" }, { label: "Legal Insights" }]}
      />
      <InsightsPreview limit={50} showHeading={false} />
      <ConsultationCTA />
    </>
  );
}
