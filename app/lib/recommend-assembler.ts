import type { Report } from "@/types/report";
import type { RakutenItem } from "@/types/recommendation";
import {
  fastapiRecommendTags,
  fastapiRecommendProducts,
  fastapiRecommendInsights
} from "./fastapi";

export async function buildDynamicRecommendations(report: Report, locale: "ja"|"en") {
  // レーダー配列→連想配列
  const metrics =
    (report.radar.labels || []).reduce((acc, label, i) => {
      acc[label.toLowerCase()] = report.radar.values?.[i] ?? 0;
      return acc;
    }, {} as Record<string, number>);

  const skinType = (report as any).skinType;
  const concerns = (report as any).concerns || [];

  // 1) タグ/成分/インサイト（FastAPIのルール）を取得
  let tags: string[] = [];
  let ingredients: string[] = [];
  let insights: string[] = [];
  try {
    const rules = await fastapiRecommendTags({ locale, skinType, concerns, metrics });
    tags = rules.tags || [];
    ingredients = rules.ingredients || [];
    insights = rules.insights || [];
  } catch {
    // FastAPI未起動など → 後段のMOCK/既存値に委譲
    console.log("⚠️ FastAPI tags call failed, using fallback");
  }

  // 既存のFirestoreデータからインサイトを取得（FastAPIが空の場合）
  if (!insights.length && report.insights?.length) {
    insights = report.insights;
    console.log("🔍 Using existing Firestore insights:", insights);
  } else {
    console.log("🔍 FastAPI insights:", insights);
    console.log("🔍 Report insights:", report.insights);
  }

  // 2) 楽天商品を取得（FastAPI側でRakutenキー保持）
  let products: RakutenItem[] = [];
  try {
    // 肌タイプに基づく基本的なタグを設定
    const baseTags = ["美容液", "クリーム", "化粧水"];
    if (skinType) {
      if (skinType === "dry") baseTags.push("保湿", "乾燥");
      else if (skinType === "oily") baseTags.push("皮脂", "毛穴");
      else if (skinType === "combination") baseTags.push("バランス", "Tゾーン");
    }
    
    const out = await fastapiRecommendProducts({ locale, tags: baseTags, limit: 12 });
    products = (out.items || []).map((i: any) => ({
      id: i.id, name: i.name, brand: i.brand, price: i.price,
      image: i.image, url: i.url, source: "rakuten", keyword: i.keyword || ""
    }));
    
    console.log("✅ Rakuten products fetched:", products.length);
  } catch (error) {
    console.error("❌ FastAPI products call failed:", error);
    // FastAPI未起動など → productsは空のまま（後でMOCKにフォールバック）
  }

  // 3) インサイト直取得があるなら上書き（任意）
  try {
    if (!insights.length) {
      const res = await fastapiRecommendInsights({ locale, skinType, concerns, metrics });
      insights = res.insights || insights;
    }
  } catch {}

  return { tags, ingredients, insights, products };
}
