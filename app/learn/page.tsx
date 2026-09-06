import type { Metadata } from "next";
import Link from "next/link";
import { b2cSearchPages } from "@/content/b2c-search-pages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

const TITLE = "Skincare Routine Guides — Visage AI";
const DESCRIPTION =
  "Straight answers to the skincare-routine questions people actually search for — whether your routine is enough, when a product is worth buying, and how to track real change.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/learn`,
    languages: {
      en: `${SITE_URL}/learn`,
      ja: `${SITE_URL}/ja/learn`,
      "x-default": `${SITE_URL}/learn`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/learn`,
    siteName: "Visage AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LearnHubPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38]">
      <section className="mx-auto w-full max-w-2xl px-6 pt-12 text-center md:pt-20">
        <div className="text-sm font-bold tracking-[0.2em] text-[#5F46BE]">
          VISAGE AI
        </div>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold leading-tight text-[#231C38] md:text-5xl">
          Skincare routine questions, answered plainly
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-[#4b4560] md:text-xl">
          Practical answers to the questions people actually search before
          they buy — grounded in checking what you already use, not in hype.
        </p>
      </section>

      <section className="mx-auto mt-14 grid w-full max-w-4xl gap-6 px-6 pb-20 sm:grid-cols-2 md:pb-28">
        {b2cSearchPages.map((page) => (
          <Link
            key={page.slug}
            href={`/learn/${page.slug}`}
            className="flex flex-col rounded-3xl border border-[#E0D6F5] bg-white/70 p-6 transition hover:border-[#5F46BE] hover:bg-white"
          >
            <h2 className="text-lg font-bold text-[#231C38] md:text-xl">
              {page.h1}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b4560] md:text-base">
              {page.shortAnswer}
            </p>
            <span className="mt-4 text-sm font-semibold text-[#5F46BE]">
              Read more →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
