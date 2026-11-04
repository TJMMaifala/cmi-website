import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL, company, offices } from "@/data/company";

export const viewport: Viewport = {
  themeColor: "#0a1428",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Clarrence Mangena Inc. | Commercial & Corporate Attorneys in Polokwane and Sandton",
    template: "%s | Clarrence Mangena Inc.",
  },
  description:
    "Clarrence Mangena Inc. is a 100% Black-owned commercial, corporate and public law firm with offices in Polokwane and Sandton. Debt collection, trusts and estates, construction and municipal law, family law, notarial services and constitutional litigation.",
  applicationName: "Clarrence Mangena Inc.",
  keywords: [
    "attorneys in Polokwane",
    "attorneys in Sandton",
    "commercial law South Africa",
    "corporate law attorneys",
    "construction law",
    "municipal law",
    "constitutional litigation",
    "notary public Polokwane",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: company.name,
    title: "Clarrence Mangena Inc. | Attorneys & Notaries",
    description: "Commercial, corporate and public law attorneys in Polokwane and Sandton.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarrence Mangena Inc. | Attorneys & Notaries",
    description: "Commercial, corporate and public law attorneys in Polokwane and Sandton.",
  },
  robots: { index: true, follow: true },
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  email: company.email,
  foundingDate: String(company.established),
  description:
    "Commercial, corporate and public law attorneys and notaries with offices in Polokwane and Sandton, South Africa.",
  areaServed: [
    { "@type": "City", name: "Polokwane" },
    { "@type": "City", name: "Sandton" },
    { "@type": "Country", name: "South Africa" },
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:30", closes: "16:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:30", closes: "16:00" },
  ],
  location: offices.map((o) => ({
    "@type": "LegalService",
    name: `${company.name} (${o.label})`,
    telephone: o.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: o.lines.slice(0, o.lines.length - 1).join(", "),
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: "ZA",
    },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-gold-500 px-4 py-3 text-sm font-semibold text-navy-900 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd data={legalServiceSchema} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
