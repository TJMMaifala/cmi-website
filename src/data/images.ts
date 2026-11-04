/**
 * Image registry. Every image is an asset from the existing website
 * (https://cmincattorneys.co.za/wp-content/uploads/...). Run `npm run fetch-images`
 * to download them into /public/images. Until then components render a labelled
 * placeholder, never a substitute stock photo.
 */

export type SiteImage = {
  /** Local path under /public */
  src: string;
  /** Original URL on the existing site (used by scripts/fetch-images.mjs) */
  remote: string;
  alt: string;
};

const base = "https://cmincattorneys.co.za/wp-content/uploads";

export const images = {
  logo: {
    src: "/images/logo.png",
    remote: `${base}/2022/03/banner-logo-3-300x74.png`,
    alt: "Clarrence Mangena Inc. logo",
  },
  director: {
    src: "/images/team/clarrence-mangena.png",
    remote: `${base}/2022/03/clarrence.png`,
    alt: "Mr Clarrence Mangena, Director and Attorney",
  },
  about: {
    src: "/images/about.png",
    remote: `${base}/2022/03/personal-injury-lawyer-template-about-img.png`,
    alt: "Clarrence Mangena Inc. attorneys",
  },
  pa1: { src: "/images/practice/1.jpg", remote: `${base}/2022/03/1.jpg`, alt: "Commercial and corporate law" },
  pa2: { src: "/images/practice/2.jpg", remote: `${base}/2022/03/2.jpg`, alt: "Trust law, wills and deceased estates" },
  pa3: { src: "/images/practice/3.jpg", remote: `${base}/2022/03/3.jpg`, alt: "Construction, municipal and procurement law" },
  pa4: { src: "/images/practice/4.jpg", remote: `${base}/2022/03/4.jpg`, alt: "Family and marriage law" },
  pa5: { src: "/images/practice/5.jpg", remote: `${base}/2022/03/5.jpg`, alt: "Notarial services" },
  pa6: { src: "/images/practice/6.jpg", remote: `${base}/2022/03/6.jpg`, alt: "Constitutional litigation" },
  favicon: {
    src: "/images/favicon-source.png",
    remote: `${base}/2022/03/cropped-favicon-270x270.png`,
    alt: "CMI favicon",
  },
  gallery: [
    { src: "/images/gallery/1.jpg", remote: `${base}/2022/09/1-1024x770.jpg`, alt: "Clarrence Mangena Inc. gallery photograph 1" },
    { src: "/images/gallery/2.png", remote: `${base}/2022/09/2-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 2" },
    { src: "/images/gallery/3.png", remote: `${base}/2022/09/3-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 3" },
    { src: "/images/gallery/4.png", remote: `${base}/2022/09/4-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 4" },
    { src: "/images/gallery/5.png", remote: `${base}/2022/09/5-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 5" },
    { src: "/images/gallery/7.png", remote: `${base}/2022/09/7-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 7" },
    { src: "/images/gallery/8.png", remote: `${base}/2022/09/8-1024x770.png`, alt: "Clarrence Mangena Inc. gallery photograph 8" },
  ],
} satisfies Record<string, SiteImage | SiteImage[]>;

/**
 * Which existing photograph is used where. Review once the images are downloaded
 * and swap keys here if a different photo suits the hero better.
 */
export const heroImage: SiteImage = images.gallery[0];
export const introImage: SiteImage = images.about;
