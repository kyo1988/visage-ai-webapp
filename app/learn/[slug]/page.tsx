import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  b2cSearchPages,
  getB2CSearchPage,
  getRelatedPages,
} from "@/content/b2c-search-pages";
import LearnCta from "../LearnCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

export const dynamicParams = false;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return b2cSearchPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = getB2CSearchPage(params.slug);
  if (!page) return {};

  const url = `${SITE_URL}/learn/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Visage AI",
      images: [page.image.src],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image.src],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LearnArticlePage({ params }: Props) {
  const page = getB2CSearchPage(params.slug);
  if (!page) notFound();

  const related = getRelatedPages(page);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38]">
      <article className="mx-auto w-full max-w-2xl px-6 pt-12 pb-20 md:pt-20 md:pb-28">
        <Link
          href="/learn"
          className="text-sm font-semibold tracking-wide text-[#5F46BE] hover:opacity-80"
        >
          ← Skincare Routine Guides
        </Link>

        <h1 className="mt-5 text-3xl font-bold leading-tight text-[#231C38] md:text-5xl">
          {page.h1}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4b4560] md:text-xl">
          {page.shortAnswer}
        </p>

        <div className="mx-auto mt-10 w-full max-w-[240px] md:max-w-[280px]">
          <Image
            src={page.image.src}
            alt={page.image.alt}
            width={1320}
            height={1140}
            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(95,70,190,0.18)]"
          />
        </div>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-[#231C38] md:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs && (
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-[#4b4560] md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {section.list && (
                <ol className="mt-3 list-decimal space-y-3 pl-5">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="text-base leading-relaxed text-[#4b4560] md:text-lg"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#231C38] md:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-6">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold text-[#231C38] md:text-lg">
                  {faq.question}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#4b4560]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <LearnCta
          slug={page.slug}
          hypothesis={page.hypothesis}
          heading={page.cta.heading}
          body={page.cta.body}
          label={page.cta.label}
        />

        {related.length > 0 && (
          <section className="mt-14 border-t border-[#E0D6F5] pt-10">
            <h2 className="text-lg font-bold text-[#231C38]">
              Related reading
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((relatedPage) => (
                <li key={relatedPage.slug}>
                  <Link
                    href={`/learn/${relatedPage.slug}`}
                    className="text-base text-[#5F46BE] underline hover:opacity-80"
                  >
                    {relatedPage.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
