# Clarrence Mangena Inc. Website

Premium redesign of https://cmincattorneys.co.za/ for **Clarrence Mangena Incorporated Attorneys**, built by TJM Technology Group.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion (Framer Motion), Lucide icons, Zod.

## 1. Before first run: download the firm's existing photographs

All photographs are the firm's own images from the current website. They could not be fetched while the site was built (restricted network), so until you do this step every image shows a clearly labelled navy placeholder. No stock photos or invented portraits are used.

```bash
npm install
npm run fetch-images     # downloads every image listed in src/data/images.ts into /public/images
```

Then review which photo is used where in `src/data/images.ts`:

- `heroImage` (default: first gallery photo) and `introImage` (default: the About image).
- The director portrait is `clarrence.png` from the About page.
- If the logo is downloaded it is not required: the site uses a code-built wordmark.

Confirm with the client that they are happy for these images to be reused, and check each one looks right when cropped (the hero uses `object-position: 50% 30%`).

## 2. Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server at http://localhost:3000 |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

## 3. Environment variables

Copy `.env.example` to `.env.local`. Never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URLs, sitemap, Open Graph |
| `RESEND_API_KEY` | For forms | Resend API key (server-side only) |
| `CONTACT_FROM_EMAIL` | For forms | Sender on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | For forms | Firm inbox (default `info@cmincattorneys.co.za`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Recommended | Cloudflare Turnstile spam protection |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Digits only, e.g. `27158801882`. No WhatsApp number is published on the existing site, so WhatsApp buttons are hidden until this is set |

**Forms never fake success.** `POST /api/contact` validates input (Zod, shared with the browser), blocks spam (honeypot, minimum fill time, same-origin check, rate limit, optional Turnstile) and only returns success if Resend accepted the email. Without the three email variables it returns 503 and the visitor is shown the phone and email fallback.

## 4. Deployment

**Vercel (recommended for Next.js):** push to GitHub, import the repo in Vercel, add the environment variables, deploy, then add `cmincattorneys.co.za` under Domains and update DNS as instructed.

**Cloudflare Pages:** supported via the OpenNext Cloudflare adapter (`@opennextjs/cloudflare`); the API route needs the Workers runtime, so use Vercel unless the client specifically wants Cloudflare hosting.

After go-live: submit `https://cmincattorneys.co.za/sitemap.xml` to Google Search Console and redirect the old WordPress URLs (`/about/`, `/practice-areas/`, `/contact/`) if trailing-slash behaviour differs.

## 5. Content management

All content lives in typed files in `src/data/`:

- `company.ts`: contact details, hours, offices, values, verified credentials
- `practice-areas.ts`: six practice areas (each gets its own page)
- `team.ts`: add team members here and add their photo
- `insights.ts`: **empty by design** (the old site has no articles). Add entries and they appear on `/insights`, in the sitemap and in structured data

## 6. Outstanding items before launch

1. Run `npm run fetch-images` and review the photographs.
2. Configure Resend (and ideally Turnstile) and send a test enquiry.
3. Have the firm's practitioners / Information Officer approve `/privacy` (it is a draft).
4. Confirm a WhatsApp business number, if wanted.
5. **Address discrepancy:** the existing site's home, About and footer say *25* Rhodesdrift Street, but its Contact page heading says *28*. This build uses 25 (matches the map embed, Facebook and the attorneys.co.za listing). Confirm with the client.
6. Insights articles, social media links and further attorneys: none were verified on the existing site, so none are shown.
7. The existing About page says "Recognized by" but lists no recognitions; none are claimed here.
