import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LearnCta from "@/app/learn/LearnCta";
import { japaneseB2CSearchPages } from "@/content/b2c-search-pages-ja";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return japaneseB2CSearchPages.map((page) => ({ locale: "ja", slug: page.slug }));
}

function getPage(slug: string) {
  return japaneseB2CSearchPages.find((page) => page.slug === slug);
}

export function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Metadata {
  if (locale !== "ja") return {};
  const page = getPage(slug);
  if (!page) return {};
  const url = `${SITE_URL}/ja/learn/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Visage AI",
      locale: "ja_JP",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default function JapaneseLearnArticle({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (locale !== "ja") notFound();
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38]">
      <header className="mx-auto w-full max-w-3xl px-6 pt-12 md:pt-20">
        <a href="/ja/learn" className="text-sm font-semibold text-[#5F46BE] hover:underline">
          ← スキンケア見直しガイド
        </a>
        <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">{page.h1}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[#4b4560] md:text-xl">{page.shortAnswer}</p>
      </header>

      <div className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10 md:pb-32">
        <div className="space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold md:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#4b4560] md:text-lg">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <LearnCta
          slug={`ja/${page.slug}`}
          hypothesis={page.hypothesis}
          heading={page.cta.heading}
          body={page.cta.body}
          label={page.cta.label}
        />

        <section className="mt-12 border-t border-[#D8CEEE] pt-8">
          <h2 className="text-xl font-bold">関連ガイド</h2>
          <div className="mt-4 flex flex-col gap-3">
            {japaneseB2CSearchPages
              .filter((related) => related.slug !== page.slug)
              .map((related) => (
                <a
                  key={related.slug}
                  href={`/ja/learn/${related.slug}`}
                  className="font-semibold text-[#5F46BE] hover:underline"
                >
                  {related.h1} →
                </a>
              ))}
          </div>
        </section>
      </div>
    </article>
  );
}
