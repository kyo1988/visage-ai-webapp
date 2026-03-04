import "server-only";
import { getDbOrNull } from "@/app/lib/firebaseAdmin";

export type ResultSku = {
  sku_id: string;
  name: string;
  price_jpy: number;
  ec_url: string;
  rank: number;
  image_url?: string;
};

export type ResultDocument = {
  result_id: string;
  store_id: string;
  locale: string;
  short_path: string;
  created_at?: string;
  analysis_summary: {
    skin_concerns: string[];
    style_tags: string[];
  };
  recommended_skus: ResultSku[];
  store_info: {
    store_name: string;
    logo_url?: string;
  };
};

export async function fetchResultByShortPath(
  shortCode: string,
): Promise<ResultDocument | null> {
  const db = getDbOrNull();
  if (!db) return null;

  const normalizedCode = shortCode.trim();
  if (!normalizedCode) return null;

  const byShortPath = await db
    .collection("results")
    .where("short_path", "==", `r/${normalizedCode}`)
    .limit(1)
    .get();

  const doc = byShortPath.docs[0];
  if (!doc) return null;
  const data = (doc.data() ?? {}) as Record<string, any>;

  const recommendedSkus = Array.isArray(data.recommended_skus)
    ? data.recommended_skus
        .map((row) => ({
          sku_id: String(row?.sku_id ?? ""),
          name: String(row?.name ?? ""),
          price_jpy: Number(row?.price_jpy ?? 0),
          ec_url: String(row?.ec_url ?? ""),
          rank: Number(row?.rank ?? 999),
          image_url: row?.image_url ? String(row.image_url) : undefined,
        }))
        .filter((row) => row.sku_id && row.name && row.ec_url)
        .sort((a, b) => a.rank - b.rank)
    : [];

  const result: ResultDocument = {
    result_id: String(data.result_id ?? doc.id),
    store_id: String(data.store_id ?? ""),
    locale: String(data.locale ?? "ja"),
    short_path: String(data.short_path ?? `r/${normalizedCode}`),
    created_at:
      typeof data.created_at?.toDate === "function"
        ? data.created_at.toDate().toISOString()
        : undefined,
    analysis_summary: {
      skin_concerns: Array.isArray(data.analysis_summary?.skin_concerns)
        ? data.analysis_summary.skin_concerns.map((v: unknown) => String(v))
        : [],
      style_tags: Array.isArray(data.analysis_summary?.style_tags)
        ? data.analysis_summary.style_tags.map((v: unknown) => String(v))
        : [],
    },
    recommended_skus: recommendedSkus,
    store_info: {
      store_name: String(data.store_info?.store_name ?? "Store"),
      logo_url: data.store_info?.logo_url
        ? String(data.store_info.logo_url)
        : undefined,
    },
  };

  return result;
}
