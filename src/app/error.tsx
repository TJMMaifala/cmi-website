"use client";

import { offices, company } from "@/data/company";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-navy-900 text-ivory-50">
      <div className="container-wide py-32">
        <p className="eyebrow eyebrow-dark">Something went wrong</p>
        <h1 className="mt-5 text-4xl md:text-6xl">We hit an unexpected problem.</h1>
        <p className="mt-6 max-w-lg text-ivory-100/70">
          Please try again. If it continues, call {offices[0].phoneDisplay} or email {company.email}.
        </p>
        <button onClick={reset} className="btn btn-gold mt-10">
          Try again
        </button>
      </div>
    </section>
  );
}
