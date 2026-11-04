/**
 * Practice areas, preserved from https://cmincattorneys.co.za/practice-areas/.
 * Descriptions are condensed from the firm's own text; no services have been added.
 */

export type PracticeArea = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: "briefcase" | "scroll" | "landmark" | "users" | "stamp" | "scale";
  summary: string;
  overview: string;
  services: string[];
  image: "pa1" | "pa2" | "pa3" | "pa4" | "pa5" | "pa6";
  seoKeywords: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "commercial-and-corporate-matters",
    number: "01",
    title: "Commercial and Corporate Matters",
    shortTitle: "Commercial & Corporate",
    icon: "briefcase",
    summary:
      "Debt collection, commercial contracts and statutory compliance, together with sequestration, business rescue and liquidation proceedings.",
    overview:
      "In the commercial department, debt collection is the firm's specialty and an area in which it has considerable experience. The firm also drafts commercial contracts and assists with statutory compliance, and handles insolvency-related proceedings.",
    services: [
      "Debt collection (the firm's specialty)",
      "Drafting commercial contracts",
      "Drafting, amending and managing trusts, sale and joint venture agreements",
      "Statutory compliance",
      "Sequestration proceedings",
      "Business rescue",
      "Liquidation proceedings",
    ],
    image: "pa1",
    seoKeywords: ["commercial law attorneys Polokwane", "corporate law attorneys Sandton", "debt collection attorneys", "business rescue attorneys"],
  },
  {
    slug: "trust-law-wills-and-deceased-estates",
    number: "02",
    title: "Trust Law, Wills and Administration of Deceased Estates",
    shortTitle: "Trusts, Wills & Estates",
    icon: "scroll",
    summary: "Trust establishment, last wills and testaments, living wills and the administration of deceased estates.",
    overview:
      "The firm provides services across trust law, wills and the administration of deceased estates, helping clients plan for the future and administer estates properly.",
    services: ["Trust establishment", "Drawing last wills and testaments", "Drawing living wills", "Deceased estate administration"],
    image: "pa2",
    seoKeywords: ["wills and estates attorneys Polokwane", "deceased estate administration", "trust attorneys Limpopo"],
  },
  {
    slug: "construction-mineral-rights-municipal-and-procurement-law",
    number: "03",
    title: "Construction Law, Mineral Rights Law, Municipal Law, Procurement and Administration",
    shortTitle: "Construction, Municipal & Procurement",
    icon: "landmark",
    summary:
      "Legal support for State departments and municipalities, and drafting and review of government contracts including EPC and turnkey agreements.",
    overview:
      "The firm intends to assist State departments and local municipalities with litigation, legal training and drafting. Mr Mangena has experience reviewing applications and drafting government contracts and documents.",
    services: [
      "Litigation on evictions of illegal occupants for State departments and municipalities",
      "Legal training for municipalities on understanding legal documents",
      "Drafting of by-laws",
      "Drafting of contracts and general litigation",
      "Public law matters",
      "Development Agreements",
      "Land Availability Agreements",
      "General Conditions of Contract",
      "Engineering, Procurement and Construction (EPC / Turnkey) Agreements",
    ],
    image: "pa3",
    seoKeywords: ["municipal law attorneys South Africa", "construction law attorneys", "mineral rights law", "procurement law attorneys"],
  },
  {
    slug: "family-and-marriage-law",
    number: "04",
    title: "Family Law, or Marriage Law",
    shortTitle: "Family & Marriage Law",
    icon: "users",
    summary: "Advice on matrimonial property systems, ante-nuptial contracts, divorce proceedings and children's rights including custody.",
    overview:
      "The firm provides legal advice on matrimonial property systems and drafts ante-nuptial and other matrimonial contracts. It represents clients in divorce proceedings and advises on children's rights.",
    services: [
      "Advice on matrimonial property systems",
      "Drafting of ante-nuptial contracts and other matrimonial law contracts",
      "Representation in divorce proceedings",
      "Children's rights law, including custody",
    ],
    image: "pa4",
    seoKeywords: ["divorce attorneys Polokwane", "family law attorneys Sandton", "ante-nuptial contracts"],
  },
  {
    slug: "notarial-services",
    number: "05",
    title: "Notarial Services",
    shortTitle: "Notarial Services",
    icon: "stamp",
    summary: "Notarial work including antenuptial agreements, notarial bonds, servitudes, notarial leases and authentication of documents.",
    overview:
      "The firm does notarial work across a range of instruments and documents, and handles all other related matters.",
    services: [
      "Antenuptial and post-nuptial agreements",
      "Notarial bonds",
      "Servitudes",
      "Notarial deeds for Sectional Title Schemes",
      "Notarial leases",
      "Wills, trusts and donations",
      "Authentication of documents",
    ],
    image: "pa5",
    seoKeywords: ["notary public Polokwane", "notarial services Sandton", "notarial bonds", "authentication of documents"],
  },
  {
    slug: "constitutional-litigation",
    number: "06",
    title: "Constitutional Litigation (Public Law)",
    shortTitle: "Constitutional Litigation",
    icon: "scale",
    summary:
      "Public law litigation led by a director with Constitutional Court law researcher experience, plus High Court civil litigation and debt collection for banks.",
    overview:
      "According to the firm, Mr Mangena worked with Constitutional Court Justices on various major cases during 2020 and 2021 and holds high expertise in public law litigation. The firm also aims to build its profile in High Court civil litigation.",
    services: [
      "Constitutional and public law litigation",
      "High Court civil litigation",
      "Car repossession matters and debt collection for banks",
      "General damages claims, contractual or delictual",
      "Correspondence work, including court appearances",
    ],
    image: "pa6",
    seoKeywords: ["constitutional litigation attorneys South Africa", "public law attorneys", "civil litigation Polokwane"],
  },
];

/** "The firm also specializes in the following" (verbatim list from the practice areas page). */
export const additionalAreas = [
  "Litigious (High and Magistrates' Courts) and non-litigious work",
  "Constitutional litigation",
  "Commercial law (commercial contracts and debt collection)",
  "Corporate or company law",
  "Immigration and emigration law",
  "Trust law, wills and administration of deceased estates",
  "Municipal law and administration",
  "Insurance claims",
  "Family and marriage law",
  "Debt review applications in terms of the National Credit Act",
  "Evictions",
  "Common law and statutory review applications",
  "Insolvency and liquidations",
];

export const getPracticeArea = (slug: string) => practiceAreas.find((p) => p.slug === slug);
