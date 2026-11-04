/**
 * Verified company information.
 * Source: https://cmincattorneys.co.za/ (home, about, practice-areas, contact), retrieved 2 Nov 2026.
 * Do not add claims here that are not confirmed by the firm.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cmincattorneys.co.za").replace(/\/$/, "");

export type Office = {
  id: "polokwane" | "sandton";
  label: string;
  role: string;
  lines: string[];
  city: string;
  region: string;
  phoneDisplay: string;
  phoneHref: string;
  mapQuery: string;
};

export const company = {
  name: "Clarrence Mangena Inc.",
  legalName: "Clarrence Mangena Incorporated",
  tagline: "Attorneys & Notaries",
  shortName: "CMI Attorneys",
  established: 2021,
  incorporated: "February 2021",
  email: "info@cmincattorneys.co.za",
  ownership: "100% Black-owned",
  bbbee: "B-BBEE Level 1 contributor",
  procurementRecognition: "135% Procurement Recognition",
  courts: ["Polokwane High Court", "Polokwane Magistrate Court"],
  institutions: ["Polokwane Deeds Office", "Department of Mineral Resources", "Master of the High Court"],
  hours: [
    { days: "Monday – Thursday", time: "07h30 – 16h30" },
    { days: "Friday", time: "07h30 – 16h00" },
    { days: "Saturday", time: "By appointment only" },
  ],
  community:
    "CMI believes in community development and has developed an annual constitutional litigation competition for students at chosen universities.",
  values: [
    {
      title: "Strong ethics of practice",
      text: "Hard work and discipline are the firm's lifeblood. Work etiquette, collegiality and client service guide every matter.",
    },
    {
      title: "Excellent legal services",
      text: "A well-trained team that offers efficient legal services and attains finality in matters.",
    },
    {
      title: "Reasonable and affordable fees",
      text: "Accessible commercial and corporate legal services without unnecessary cost.",
    },
    {
      title: "Always informed",
      text: "Clients are kept informed of developments, and only their interests are furthered, in line with the law.",
    },
  ],
} as const;

export const offices: Office[] = [
  {
    id: "polokwane",
    label: "Polokwane",
    role: "Main office",
    lines: ["25 Rhodesdrift Street", "Rhodesdrift Office Park", "ROP 3, Suite 3", "Polokwane, Limpopo"],
    city: "Polokwane",
    region: "Limpopo",
    phoneDisplay: "015 880 1882",
    phoneHref: "tel:+27158801882",
    mapQuery: "25 Rhodesdrift Street, Rhodesdrift Office Park, Polokwane, Limpopo, South Africa",
  },
  {
    id: "sandton",
    label: "Sandton",
    role: "Branch office",
    lines: ["2 Maude Street", "The Forum, 11th Floor", "Sandton, Gauteng"],
    city: "Sandton",
    region: "Gauteng",
    phoneDisplay: "010 157 3065",
    phoneHref: "tel:+27101573065",
    mapQuery: "The Forum, 2 Maude Street, Sandton, South Africa",
  },
];

export const mapsSearchUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsDirectionsUrl = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

/** WhatsApp is only shown when a verified number is configured (no number was found on the existing site). */
export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello CMI Attorneys, I would like to request a consultation.")}`
  : null;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/team", label: "Our Team" },
  { href: "/insights", label: "Legal Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/** Verified headline figures used for counters. */
export const stats = [
  { value: 2021, label: "Established", format: "year" as const },
  { value: 135, label: "Procurement recognition", suffix: "%" },
  { value: 6, label: "Core practice areas" },
  { value: 2, label: "Offices: Polokwane & Sandton" },
];
