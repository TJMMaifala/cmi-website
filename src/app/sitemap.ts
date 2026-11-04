import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { practiceAreas } from "@/data/practice-areas";
import { insights } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/about", "/practice-areas", "/team", "/insights", "/contact", "/privacy"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  return [
    ...statics,
    ...practiceAreas.map((p) => ({ url: `${SITE_URL}/practice-areas/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...insights.map((i) => ({ url: `${SITE_URL}/insights/${i.slug}`, lastModified: new Date(i.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
