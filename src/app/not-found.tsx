import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[100svh] items-center overflow-hidden bg-navy-900 text-ivory-50">
      <div className="grid-motif pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-wide relative py-32">
        <p className="eyebrow eyebrow-dark">Error 404</p>
        <h1 className="mt-5 font-serif text-[clamp(4rem,14vw,10rem)] leading-none text-gold-300">404</h1>
        <p className="mt-6 max-w-lg text-xl text-ivory-100/75">This page could not be found. It may have moved, or the address may be incorrect.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-gold">
            Back to home <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn btn-outline-light">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
