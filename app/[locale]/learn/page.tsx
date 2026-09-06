import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { japaneseB2CSearchPages } from "@/content/b2c-search-pages-ja";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  if (locale !== "ja") return {};
  const title = "スキンケア見直しガイド — Visage AI";
  const description = "買う前に、今のルーティンで足りているかを考えるための実用ガイド。追加購入しないという選択肢も含めて整理します。";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/ja/learn`,
      languages: {
        en: `${SITE_URL}/learn`,
        ja: `${SITE_URL}/ja/learn`,
        "x-default": `${SITE_URL}/learn`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/ja/learn`,
      siteName: "Visage AI",
      locale: "ja_JP",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default function JapaneseLearnHub({ params: { locale } }: { params: { locale: string } }) {
  if (locale !== "ja") notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38]">
      <section className="mx-auto w-full max-w-2xl px-6 pt-12 text-center md:pt-20">
        <div className="text-sm font-bold tracking-[0.2em] text-[#5F46BE]">VISAGE AI</div>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold leading-tight md:text-5xl">
          買う前に、今のスキンケアを見直す
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-[#4b4560] md:text-xl">
          新しい商品を足す前に、今のルーティンですでに足りているかを考えるためのガイドです。
        </p>
      </section>

      <section className="mx-auto mt-14 grid w-full max-w-4xl gap-6 px-6 pb-20 sm:grid-cols-2 md:pb-28">
        {japaneseB2CSearchPages.map((page) => (
          <Link
            key={page.slug}
            href={`/ja/learn/${page.slug}`}
            className="flex flex-col rounded-3xl border border-[#E0D6F5] bg-white/70 p-6 transition hover:border-[#5F46BE] hover:bg-white"
          >
            <h2 className="text-lg font-bold md:text-xl">{page.h1}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b4560] md:text-base">{page.shortAnswer}</p>
            <span className="mt-4 text-sm font-semibold text-[#5F46BE]">読む →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
