"use client";

import Link from "next/link";
import { track } from "@/app/lib/analytics";
import type { Hypothesis } from "@/content/b2c-search-pages";

export default function LearnCta({
  slug,
  hypothesis,
  heading,
  body,
  label,
}: {
  slug: string;
  hypothesis: Hypothesis;
  heading: string;
  body: string;
  label: string;
}) {
  return (
    <section className="mx-auto mt-14 max-w-2xl rounded-3xl border border-[#E0D6F5] bg-white/70 px-6 py-10 text-center md:px-10">
      <h2 className="text-2xl font-bold text-[#231C38] md:text-3xl">
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#4b4560]">
        {body}
      </p>
      <div className="mt-7 flex justify-center">
        <Link
          href="/app"
          data-analytics-id="seo_app_cta_click"
          onClick={() =>
            track("seo_app_cta_click", { slug, hypothesis, from: "learn" })
          }
          className="inline-flex items-center justify-center rounded-2xl bg-[#5F46BE] px-7 py-4 text-base font-semibold text-white shadow-[0_15px_30px_rgba(95,70,190,0.25)] transition hover:opacity-90"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
