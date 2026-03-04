"use client";

import { useEffect } from "react";
import Image from "next/image";
import { track } from "@/app/lib/analytics";
import type { ResultDocument, ResultSku } from "@/app/lib/result-api";

type Props = {
  locale: "ja" | "en";
  result: ResultDocument;
};

const concernEmoji: Record<string, string> = {
  dryness: "💧",
  melanin_high: "☀️",
  pores_visible: "🫧",
  wrinkles_visible: "✨",
};

const copy = {
  ja: {
    heading: "診断結果ビューア",
    summary: "解析サマリ",
    recommendations: "おすすめ商品",
    store: "店舗情報",
    buy: "購入する",
    noSummary: "解析サマリがありません",
    noProducts: "おすすめ商品はありません",
    disclaimer:
      "本ページは美容提案を目的とした参考情報です。医療診断を行うものではありません。",
  },
  en: {
    heading: "Result Viewer",
    summary: "Analysis Summary",
    recommendations: "Recommended Products",
    store: "Store Information",
    buy: "Buy",
    noSummary: "No analysis summary",
    noProducts: "No recommendations available",
    disclaimer:
      "This page is for beauty support and prevention guidance only, not medical diagnosis.",
  },
} as const;

function domainOnly(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function onEcClick(result: ResultDocument, sku: ResultSku) {
  track("ec_clicked", {
    result_id: result.result_id,
    store_id: result.store_id,
    sku_id: sku.sku_id,
    sku_name: sku.name,
    ec_url: domainOnly(sku.ec_url),
    rank: sku.rank,
    surface: "web_viewer",
  });
}

export default function ResultViewerClient({ locale, result }: Props) {
  const t = copy[locale];

  useEffect(() => {
    track("result_viewed", {
      result_id: result.result_id,
      store_id: result.store_id,
      locale,
      surface: "web_viewer",
    });
  }, [locale, result.result_id, result.store_id]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{t.heading}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {result.store_info.store_name} / {result.result_id}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">{t.summary}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {result.analysis_summary.skin_concerns.length === 0 &&
          result.analysis_summary.style_tags.length === 0 ? (
            <span className="text-sm text-slate-500">{t.noSummary}</span>
          ) : (
            <>
              {result.analysis_summary.skin_concerns.map((concern) => (
                <span
                  key={`concern-${concern}`}
                  className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                >
                  <span>{concernEmoji[concern] ?? "•"}</span>
                  <span>{concern}</span>
                </span>
              ))}
              {result.analysis_summary.style_tags.map((tag) => (
                <span
                  key={`tag-${tag}`}
                  className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">{t.recommendations}</h2>
        {result.recommended_skus.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">{t.noProducts}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {result.recommended_skus.map((sku) => (
              <li
                key={`${sku.sku_id}-${sku.rank}`}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                  {sku.image_url ? (
                    <Image
                      src={sku.image_url}
                      alt={sku.name}
                      fill
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                      SKU
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    #{sku.rank} {sku.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ¥{Number.isFinite(sku.price_jpy) ? sku.price_jpy.toLocaleString() : 0}
                  </p>
                </div>
                <a
                  href={sku.ec_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onEcClick(result, sku)}
                  className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
                >
                  {t.buy}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">{t.store}</h2>
        <div className="mt-3 flex items-center gap-3">
          {result.store_info.logo_url ? (
            <Image
              src={result.store_info.logo_url}
              alt={result.store_info.store_name}
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 rounded-md object-contain"
            />
          ) : null}
          <p className="text-sm font-medium text-slate-800">{result.store_info.store_name}</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-500">
        <p>{t.disclaimer}</p>
        <p className="mt-1 font-semibold text-slate-600">Visage AI</p>
      </section>
    </div>
  );
}
