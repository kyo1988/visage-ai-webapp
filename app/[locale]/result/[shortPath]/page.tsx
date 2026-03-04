import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/landing/Footer";
import { fetchResultByShortPath } from "@/app/lib/result-api";
import ResultViewerClient from "./result-viewer-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = {
  params: { locale: string; shortPath: string };
};

function normalizeLocale(locale: string): "ja" | "en" {
  return locale === "en" ? "en" : "ja";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const result = await fetchResultByShortPath(params.shortPath);
  if (!result) return {};

  const title =
    locale === "ja"
      ? "Visage AI 診断結果ビューア"
      : "Visage AI Result Viewer";
  const description =
    locale === "ja"
      ? "店頭診断の結果とおすすめ商品を確認できます。"
      : "Review your in-store analysis summary and recommended products.";

  const ogImage =
    result.recommended_skus[0]?.image_url || result.store_info.logo_url || "/og.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const locale = normalizeLocale(params.locale);
  const result = await fetchResultByShortPath(params.shortPath);
  if (!result) return notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <ResultViewerClient locale={locale} result={result} />
      </main>
      <Footer />
    </div>
  );
}
