import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2500;

// Best-effort per-instance rate limit. For stronger protection use Cloudflare WAF / Turnstile.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });

  // Same-origin check against cross-site form posts.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 });
  }

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Please try again later or call us." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0] ?? "form")] ??= i.message;
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }
  const d = parsed.data;

  // Spam: honeypot filled, or submitted faster than a human could. Pretend success to give bots no signal.
  if (d.website || (d.startedAt && Date.now() - d.startedAt < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(d.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, message: "Spam check failed. Please try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    // No fake success: be explicit that delivery is not configured.
    return NextResponse.json(
      { ok: false, message: "Online enquiries are not available right now, so your message was not sent." },
      { status: 503 },
    );
  }

  const subject = `${d.kind === "consultation" ? "Consultation request" : "Website enquiry"} from ${d.name.replace(/[\r\n]/g, " ")}`;
  const html = `
    <h2>${d.kind === "consultation" ? "Consultation request" : "Website enquiry"}</h2>
    <p><strong>Name:</strong> ${esc(d.name)}</p>
    <p><strong>Email:</strong> ${esc(d.email)}</p>
    <p><strong>Phone:</strong> ${esc(d.phone || "not provided")}</p>
    <p><strong>Area of law:</strong> ${esc(d.area || "not specified")}</p>
    <p><strong>Preferred office:</strong> ${esc(d.office || "not specified")}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(d.message).replace(/\n/g, "<br>")}</p>
    <hr><p style="color:#666;font-size:12px">POPIA consent given on submission. Sent via the CMI website form.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: d.email, subject, html }),
    });
    if (!res.ok) throw new Error(`Provider responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry delivery failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, message: "We could not send your message. Please call or email us." }, { status: 502 });
  }
}
