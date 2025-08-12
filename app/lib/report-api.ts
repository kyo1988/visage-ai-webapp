import { Report } from "@/types/report";
import { buildDynamicRecommendations } from "./recommend-assembler";
import { getMessages } from "./messages";

// 言語に応じたフォールバック商品データを生成する関数
function createFallbackProducts(locale: "ja" | "en") {
  return locale === "ja" ? [
    { id: "p1", name: "保湿ジェル", brand: "ブランドA", image: "/mock/product-1.svg", url: "https://example.com/a", price: "¥2,400" },
    { id: "p2", name: "レチノールセラム", brand: "ブランドB", image: "/mock/product-2.svg", url: "https://example.com/b", price: "¥3,900" },
    { id: "p3", name: "ブライトニングローション", brand: "ブランドC", image: "/mock/product-3.svg", url: "https://example.com/c", price: "¥3,200" }
  ] : [
    { id: "p1", name: "Hydrating Gel", brand: "Brand A", image: "/mock/product-1.svg", url: "https://example.com/a", price: "$24" },
    { id: "p2", name: "Retinol Serum", brand: "Brand B", image: "/mock/product-2.svg", url: "https://example.com/b", price: "$39" },
    { id: "p3", name: "Brightening Lotion", brand: "Brand C", image: "/mock/product-3.svg", url: "https://example.com/c", price: "$32" }
  ];
}

// 言語に応じたMOCKデータを生成する関数
function createMockData(locale: "ja" | "en"): Report {
  return {
    id: "XsTJOTBDbbZVs0T4iRtL",
    title: locale === "ja" ? "パーソナルスキンケア診断レポート" : "Personal Skin Care Diagnostic Report",
    generatedAt: Date.now(),
    score: { 
      skinAge: 29, 
      rank: 75, 
      label: locale === "ja" ? "良好" : "Good" 
    },
    radar: {
      labels: locale === "ja" 
        ? ["テクスチャ", "水分", "毛穴", "シワ", "色素沈着", "敏感度"]
        : ["Texture","Hydration","Pores","Wrinkles","Pigmentation","Sensitivity"],
      values: [0.72, 0.58, 0.64, 0.40, 0.55, 0.68]
    },
    insights: locale === "ja" ? [
      "水分がやや不足しています — 水分保持剤を増やしてください。",
      "シワ指数は初期段階を示しています — 夜間レチノイドルーチンが推奨されます。",
      "UV関連の色素沈着リスクは中程度です — 毎日のSPFが推奨されます。"
    ] : [
      "Hydration is slightly below optimal — increase water-binding agents.",
      "Wrinkle index shows early lines — night retinoid routine recommended.",
      "UV-linked pigmentation risk is moderate — daily SPF is advised."
    ],
    routine: {
      am: {
        goal: locale === "ja" ? "保湿と保護" : "Hydrate & protect",
        steps: locale === "ja" 
          ? ["優しくクレンジング", "HAセラム", "モイスチャライザー", "ブロードスペクトラムSPF 30+"]
          : ["Gentle cleanse", "HA serum", "Moisturizer", "Broad-spectrum SPF 30+"],
        ingredients: ["Hyaluronic Acid", "Niacinamide 3–5%", "Ceramides"],
        caution: locale === "ja" 
          ? "夜に酸を使用する場合は、朝はシンプルにしてください。"
          : "If using acids at night, keep AM simple."
      },
      pm: {
        goal: locale === "ja" ? "修復と更新" : "Repair & renew",
        steps: locale === "ja"
          ? ["クレンジング", "レチノール (0.1%) 週2-3回 → 毎晩", "バリアクリーム"]
          : ["Cleanse", "Retinol (0.1%) 2–3x/week → nightly", "Barrier cream"],
        ingredients: ["Retinol 0.1%", "Panthenol", "Squalane"],
        caution: locale === "ja"
          ? "レチノイドは徐々に導入し、刺激がある場合は目の周りを避けてください。"
          : "Introduce retinoids gradually; avoid around eyes if irritation."
      },
      weekly: {
        goal: locale === "ja" ? "優しいリサーフェシング" : "Gentle resurfacing",
        steps: locale === "ja"
          ? ["PHA/AHA 週1-2回", "シートマスク保湿"]
          : ["PHA/AHA 1–2x/week", "Sheet mask hydration"],
        ingredients: ["Lactobionic acid", "Gluconolactone"],
      }
    },
    ingredients: {
      items: locale === "ja" ? [
        { name: "ナイアシンアミド 5%", desc: "トーン調整、皮脂バランス、バリアサポート。" },
        { name: "レチノール 0.1%", desc: "細かいシワに臨床的に証明された効果。徐々に増量してください。" },
        { name: "ヒアルロン酸", desc: "保湿剤。オクルーシブクリームの下に重ねて使用。" },
        { name: "尿素 5%", desc: "角質溶解 + 保湿。テクスチャーケアに。" }
      ] : [
        { name: "Niacinamide 5%", desc: "Tone-evening, sebum balance, barrier support." },
        { name: "Retinol 0.1%", desc: "Clinically proven for fine lines; ramp slowly." },
        { name: "Hyaluronic Acid", desc: "Humectant; layer under occlusive moisturizer." },
        { name: "Urea 5%", desc: "Keratolytic + humectant for texture care." }
      ]
    },
    products: createFallbackProducts(locale),
    ogImage: "/og.jpg",
    summary: locale === "ja" 
      ? "パーソナライズされたルーチン、成分、製品選択を備えたAI駆動の肌分析。"
      : "AI-driven skin analysis with personalized routines, ingredients, and product picks."
  };
}

export async function fetchReportById(id: string, locale: "ja"|"en" = "ja", forceFirebase: boolean = false): Promise<Report | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const envApi = !!(process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE_URL);
  console.info("[report] start", { envApi, id, locale, forceFirebase });
  console.log("🔍 fetchReportById called with id:", id, "locale:", locale);
  console.log("🔍 NEXT_PUBLIC_API_BASE:", apiBase);
  
  // 1) API 優先（設定があれば、かつforceFirebaseがfalseの場合のみ）
  if (apiBase && !forceFirebase) {
    try {
      const res = await fetch(`${apiBase}/reports/${id}`, {
        cache: "force-cache",
        next: { revalidate: 300 }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Report;
      
      // データの妥当性チェック
      if (!data || !data.id) {
        console.warn("[report] api invalid shape:", { id, locale });
        throw new Error("Invalid API response");
      }
      
      // 欠落補完（UI欠落を避ける）
      if (!data.products?.length) data.products = createFallbackProducts(locale);
      if (!data.routine) data.routine = createMockData(locale).routine;
      if (!data.ingredients) data.ingredients = createMockData(locale).ingredients;
      if (!data.insights?.length) data.insights = createMockData(locale).insights;
      
      // 2) FastAPIから動的レコメンド
      const dyn = await buildDynamicRecommendations(data, locale);
      console.log("🔍 FastAPI recommendations:", dyn);
      console.log("🔍 Original data insights:", data.insights);
      
      // 3) マージ（FastAPI優先・空なら既存/モック）
      const merged: Report = {
        ...data,
        insights: dyn.insights?.length ? dyn.insights : (data.insights || []),
        ingredients:
          dyn.ingredients?.length
            ? { items: dyn.ingredients.map(name => ({ name })) }
            : data.ingredients ?? null,
        products:
          dyn.products?.length
            ? dyn.products.map(p => ({
                id: p.id, name: p.name, brand: p.brand, image: p.image,
                url: p.url, price: p.price
              }))
            : (data.products ?? [])
      };
      
      console.log("🔍 Final merged insights:", merged.insights);
      console.info("[report] decided", { pick: 'api', id, locale, runtime: process.env.NEXT_RUNTIME || "node" });
      return merged;
    } catch (error) {
      console.warn("[report] api fetch failed, falling back to Firebase:", { id, err: String(error) });
    }
  } else if (forceFirebase) {
    console.info("[report] forceFirebase=true, skipping API, going directly to Firebase");
  }

  // 2) Firebase フォールバック
  try {
    console.log("🔍 Attempting to fetch from Firestore...");
    
    // 新しいfirebaseAdminからDBを取得（フェイルソフト）
    const { getDbOrNull } = await import("@/app/lib/firebaseAdmin");
    const db = getDbOrNull();
    
    if (!db) {
      console.warn("[report] firestore unavailable (db=null), using mock:", { id });
      throw new Error("Firebase DB not available");
    }
    
    console.log("🔍 Firebase Admin DB imported successfully");
    
    const docRef = db.collection('diagnostics').doc(id);
    console.log("🔍 Document reference created:", docRef.path);
    
    const doc = await docRef.get();
    console.log("🔍 Document fetch completed, exists:", doc.exists);
    
    if (doc.exists) {
      const firestoreData = doc.data();
      console.log("🔍 Firestore data:", firestoreData);
      console.log("🔍 skinType from Firestore:", firestoreData?.skinType);
      console.log("🔍 skinAge from Firestore:", firestoreData?.skinAge);
      
      // データの妥当性チェック
      if (!firestoreData || (!firestoreData.skinAge && !firestoreData.textureScore)) {
        console.warn("[report] firestore invalid shape:", { id, locale });
        throw new Error("Invalid Firestore data");
      }
      
      // メッセージファイルから言語データを取得
      const messages = await getMessages(locale);
      console.log("🔍 Messages loaded for locale:", locale, messages.report);
      
      // FirestoreデータをReport形式に変換
      const base: Report = {
        id,
        title: messages.report?.title || "Personal Skin Care Diagnostic Report",
        generatedAt: firestoreData?.createdAt?.toDate?.() || Date.now(),
        score: { 
          skinAge: firestoreData?.skinAge || 29, 
          rank: 75, 
          label: messages.report?.score?.label || "Good" 
        },
        radar: {
          labels: messages.report?.radar?.labels || ["Texture", "Hydration", "Pores", "Wrinkles", "Pigmentation", "Sensitivity"],
          values: [
            firestoreData?.textureScore || 0.72,
            firestoreData?.brighteningScore || 0.58,
            firestoreData?.poresScore || 0.64,
            firestoreData?.wrinklesScore || 0.40,
            firestoreData?.spotsScore || 0.55,
            0.68
          ]
        },
        insights: locale === "ja" 
          ? (firestoreData?.insights?.ja ? [firestoreData.insights.ja] : [])
          : (firestoreData?.insights?.en ? [firestoreData.insights.en] : []),
        routine: createMockData(locale).routine, // 言語に応じたルーチンを使用
        ingredients: {
          items: messages.report?.ingredients?.items || [
            // 言語に応じたデフォルト成分データ
            ...(locale === 'ja' ? [
              { name: "ナイアシンアミド 5%", desc: "トーン調整、皮脂バランス、バリアサポート。" },
              { name: "レチノール 0.1%", desc: "細かいシワに臨床的に証明された効果。徐々に増量してください。" },
              { name: "ヒアルロン酸", desc: "保湿剤。オクルーシブクリームの下に重ねて使用。" },
              { name: "尿素 5%", desc: "角質溶解 + 保湿。テクスチャーケアに。" }
            ] : [
              { name: "Niacinamide 5%", desc: "Tone-evening, sebum balance, barrier support." },
              { name: "Retinol 0.1%", desc: "Clinically proven for fine lines; ramp slowly." },
              { name: "Hyaluronic Acid", desc: "Humectant; layer under occlusive moisturizer." },
              { name: "Urea 5%", desc: "Keratolytic + humectant for texture care." }
            ])
          ]
        },
        products: createFallbackProducts(locale),
        ogImage: "/og.jpg",
        summary: "AI-driven skin analysis with personalized routines, ingredients, and product picks.",
        // 肌タイプ情報を追加（複数のフィールド名を試行）
        skinType: firestoreData?.skinType || firestoreData?.skin_type || firestoreData?.type || "normal"
      };
      
      // 2) FastAPIから動的レコメンド
      const dyn = await buildDynamicRecommendations(base, locale);
      
      // 3) マージ（FastAPI優先・空なら既存/モック）
      const merged: Report = {
        ...base,
        insights: dyn.insights?.length ? dyn.insights : (base.insights || []),
        ingredients:
          dyn.ingredients?.length
            ? { items: dyn.ingredients.map(name => ({ name })) }
            : base.ingredients ?? null,
        products:
          dyn.products?.length
            ? dyn.products.map(p => ({
                id: p.id, name: p.name, brand: p.brand, image: p.image,
                url: p.url, price: p.price
              }))
            : (base.products ?? [])
      };
      
      console.info("[report] decided", { pick: 'firebase', id, locale, runtime: process.env.NEXT_RUNTIME || "node" });
      return merged;
    } else {
      console.warn("[report] firestore not found:", { id });
    }
  } catch (error) {
    console.warn("[report] firestore fetch failed, using mock:", { id, err: String(error) });
  }
  
  // 3) Mock フォールバック
  console.log("🔍 Falling back to mock data");
  const base = { ...createMockData(locale), id };
  
  // 2) FastAPIから動的レコメンド（開発環境でも試行）
  try {
    const dyn = await buildDynamicRecommendations(base, locale);
    
    // 3) マージ（FastAPI優先・空なら既存/モック）
    const merged: Report = {
      ...base,
      insights: dyn.insights?.length ? dyn.insights : (base.insights || []),
      ingredients:
        dyn.ingredients?.length
          ? { items: dyn.ingredients.map(name => ({ name })) }
          : base.ingredients ?? null,
      products:
        dyn.products?.length
          ? dyn.products.map(p => ({
              id: p.id, name: p.name, brand: p.brand, image: p.image,
              url: p.url, price: p.price
            }))
          : (base.products ?? [])
    };
    
    console.info("[report] decided", { pick: 'mock', id, locale, runtime: process.env.NEXT_RUNTIME || "node" });
    return merged;
  } catch (error) {
    console.error("🔍 FastAPI recommendations failed:", error);
    console.info("[report] decided", { pick: 'mock-fallback', id, locale, runtime: process.env.NEXT_RUNTIME || "node" });
    return base;
  }
}
