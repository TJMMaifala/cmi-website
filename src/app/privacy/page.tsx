import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { company, offices } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Clarrence Mangena Inc. processes personal information submitted through this website, in line with POPIA.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; body: string[] }[] = [
  {
    h: "1. Who we are",
    body: [
      `${company.legalName} ("we", "us") is the responsible party for personal information collected through this website. Our offices are at ${offices[0].lines.join(", ")} and ${offices[1].lines.join(", ")}. You can contact us at ${company.email}.`,
    ],
  },
  {
    h: "2. What we collect",
    body: [
      "Only what you choose to submit through our enquiry or consultation forms: your name, email address, optional phone number, optional area of law, preferred office and the message you write. We ask you not to include ID numbers, banking details or other special personal information in the form.",
      "If you email or call us, we receive whatever information you give us.",
    ],
  },
  {
    h: "3. Why we collect it",
    body: ["To respond to your enquiry and, if you request one, to arrange a consultation. We do not sell personal information or use it for unrelated marketing."],
  },
  {
    h: "4. Legal basis and consent",
    body: [
      "We process this information with your consent, given by ticking the consent box when you submit a form, and because it is necessary to respond to a request you make. You may withdraw consent at any time by contacting us.",
    ],
  },
  {
    h: "5. Sharing and storage",
    body: [
      "Form submissions are delivered to the firm's email inbox through a transactional email provider that processes them on our behalf. Where a spam-protection service is enabled, it may process technical data such as your IP address to tell humans from bots. Information may be processed outside South Africa where these providers operate; we require appropriate safeguards.",
      "We keep enquiry information only for as long as needed to deal with your enquiry and meet our professional and legal obligations.",
    ],
  },
  {
    h: "6. Your rights under POPIA",
    body: [
      "You may ask us to confirm whether we hold your personal information, to access, correct or delete it, and to object to its processing. You may also lodge a complaint with the Information Regulator (South Africa) at inforeg.org.za.",
    ],
  },
  {
    h: "7. Cookies",
    body: ["This website does not use advertising or analytics cookies. Essential technical features may store minimal data in your browser."],
  },
  {
    h: "8. No legal advice",
    body: ["Information on this website is general and is not legal advice. Submitting a form does not create an attorney-client relationship."],
  },
  {
    h: "9. Changes",
    body: ["We may update this policy. The current version is always published on this page."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="How we handle personal information, in line with the Protection of Personal Information Act (POPIA)." crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-wide max-w-3xl space-y-10">
          <p className="rounded-sm border border-gold-500/40 bg-ivory-50 p-4 text-sm text-charcoal-500">
            Draft prepared for the firm&rsquo;s review. It should be checked by the firm&rsquo;s practitioners and its Information Officer before going live.
          </p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl text-navy-900">{s.h}</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-charcoal-700">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
