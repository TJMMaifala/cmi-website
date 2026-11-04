/**
 * Legal Insights content store.
 *
 * The existing website has no published articles, so this list is intentionally empty and
 * the UI shows a considered empty state. Nothing is fabricated.
 *
 * To publish an article, add an entry below (newest first) and, optionally, a thumbnail in
 * /public/images/insights/. Pages, listing, sitemap and structured data update automatically.
 */

export type Insight = {
  slug: string;
  title: string;
  category: string;
  /** ISO date, e.g. "2026-11-02" */
  date: string;
  excerpt: string;
  /** Paragraphs of body text */
  body: string[];
  /** Optional path under /public, e.g. "/images/insights/example.jpg" */
  thumbnail?: string;
  thumbnailAlt?: string;
};

export const insights: Insight[] = [];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
