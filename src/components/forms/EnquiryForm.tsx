"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { enquirySchema } from "@/lib/validation";
import { practiceAreas } from "@/data/practice-areas";
import { company, offices } from "@/data/company";

type Kind = "contact" | "consultation";
type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block !text-charcoal-500">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-charcoal-400">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#b3261e]">
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({ initialKind = "contact", defaultArea }: { initialKind?: Kind; defaultArea?: string }) {
  const areaDefault = practiceAreas.some((p) => p.shortTitle === defaultArea) ? defaultArea : "";
  const [kind, setKind] = useState<Kind>(initialKind);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      kind,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      area: String(fd.get("area") ?? ""),
      office: (fd.get("office") as string) || undefined,
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
      turnstileToken: String(fd.get("cf-turnstile-response") ?? "") || undefined,
    };

    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.message ?? "Something went wrong. Please call or email us instead.");
      setStatus("error");
    } catch {
      setServerMessage("We could not reach the server. Please check your connection, or call or email us instead.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-gold-500/60 bg-ivory-50 p-10 outline-none">
        <CheckCircle2 size={36} strokeWidth={1.3} className="text-gold-600" aria-hidden />
        <h3 className="mt-5 text-3xl text-navy-900">Thank you. Your enquiry has been sent.</h3>
        <p className="mt-3 max-w-md text-charcoal-500">
          A member of our team will respond during working hours. For urgent matters, please call us directly.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline-dark mt-8">
          Send another enquiry
        </button>
      </div>
    );
  }

  const a11y = (id: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8" aria-label={kind === "consultation" ? "Consultation request" : "Contact form"}>
      <fieldset>
        <legend className="eyebrow mb-3 !text-charcoal-500">I would like to</legend>
        <div className="grid grid-cols-2 border border-ivory-300">
          {(
            [
              ["contact", "Send an enquiry"],
              ["consultation", "Request a consultation"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-12 cursor-pointer items-center justify-center px-3 text-center text-xs font-semibold uppercase tracking-[0.12em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-500 ${
                kind === value ? "bg-navy-900 text-ivory-50" : "bg-transparent text-charcoal-500 hover:bg-ivory-200"
              }`}
            >
              <input type="radio" name="kind-choice" value={value} checked={kind === value} onChange={() => setKind(value)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        <Field id="name" label="Full name *" error={errors.name}>
          <input {...a11y("name")} type="text" autoComplete="name" className="field" required />
        </Field>
        <Field id="email" label="Email address *" error={errors.email}>
          <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" className="field" required />
        </Field>
        <Field id="phone" label="Phone number" error={errors.phone}>
          <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" className="field" />
        </Field>
        <Field id="area" label="Area of law" error={errors.area}>
          <select {...a11y("area")} className="field" defaultValue={areaDefault}>
            <option value="">Not sure / other</option>
            {practiceAreas.map((p) => (
              <option key={p.slug} value={p.shortTitle}>
                {p.shortTitle}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {kind === "consultation" ? (
        <Field id="office" label="Preferred office" error={errors.office}>
          <select {...a11y("office")} className="field" defaultValue="no-preference">
            {offices.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
            <option value="no-preference">No preference</option>
          </select>
        </Field>
      ) : null}

      <Field
        id="message"
        label={kind === "consultation" ? "Briefly describe your matter *" : "Your message *"}
        error={errors.message}
        hint="Please do not include ID numbers, banking details or other sensitive information here."
      >
        <textarea {...a11y("message")} rows={5} className="field resize-y" required />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {siteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
        </>
      ) : null}

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal-700">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[#a98746]"
          />
          <span>
            I consent to {company.name} processing the personal information I submit in order to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-navy-900" target="_blank">
              Privacy Policy
            </Link>
            . *
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-[#b3261e]">
            <AlertCircle size={14} aria-hidden /> {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="flex gap-3 border border-[#b3261e]/40 bg-[#b3261e]/5 p-4 text-sm text-charcoal-900 outline-none">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#b3261e]" aria-hidden />
          <div>
            <p>{serverMessage}</p>
            <p className="mt-2">
              Call{" "}
              <a className="underline" href={offices[0].phoneHref}>
                {offices[0].phoneDisplay}
              </a>{" "}
              or email{" "}
              <a className="underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-charcoal-400">
        Submitting an enquiry does not create an attorney-client relationship. Nothing on this website is legal advice.
      </p>

      <button type="submit" disabled={status === "sending"} className="btn btn-navy w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            {kind === "consultation" ? "Request consultation" : "Send enquiry"} <Send size={15} aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
