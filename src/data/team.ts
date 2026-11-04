/**
 * Team profiles. Only information published on https://cmincattorneys.co.za/ is used.
 * To add a team member, append an entry here and add their photo to /public/images/team/.
 */

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  image: "director";
  bio: string[];
  qualifications: string[];
  experience: { period: string; text: string }[];
  quote?: string;
};

export const team: TeamMember[] = [
  {
    slug: "clarrence-mangena",
    name: "Mr Clarrence Mangena",
    title: "Director · Attorney · Notary Public",
    image: "director",
    bio: [
      "Mr Mangena obtained his LLB from the University of Venda in 2017, officially conferred on 17 May 2018. He was admitted as an Attorney of the High Court on 29 November 2019 after completing his articles with Espag Magwai Attorneys.",
      "The firm is led by a director with experience in public law litigation gained through the Constitutional Court's law researcher programme.",
    ],
    qualifications: [
      "LLB, University of Venda (2017; conferred 17 May 2018)",
      "Admitted Attorney of the High Court (29 November 2019)",
      "Practical Legal Training, Polokwane (six-month course)",
    ],
    experience: [
      {
        period: "From 3 Sep 2018",
        text: "Joined Espag Magwai Attorneys for articles, after a six-month practical legal training course in Polokwane.",
      },
      {
        period: "29 Nov 2019 – 25 Jun 2020",
        text: "Associate at Espag Magwai Attorneys following admission as an attorney.",
      },
      {
        period: "2020 – 2021",
        text: "Law Researcher to Justice Tshiqi at the Constitutional Court of South Africa.",
      },
      {
        period: "February 2021",
        text: "Director of Clarrence Mangena Incorporated, incorporated in February 2021.",
      },
    ],
    quote:
      "A nation that is without the law is a hopeless nation. It is the law that wraps its arms around us. And because of the law, our firm wraps its arms around you in vindicating your rights.",
  },
];
