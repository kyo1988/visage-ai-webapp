const BASE = process.env.FASTAPI_URL;
const TOKEN = process.env.FASTAPI_TOKEN;

function authHeaders(): Record<string, string> {
  return TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
}

export async function fastapiGet(path: string, params?: Record<string, string>) {
  if (!BASE) throw new Error("FASTAPI_URL not set");
  const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await fetch(`${BASE}${path}${qs}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "force-cache",
    next: { revalidate: 300 }
  });
  if (!res.ok) throw new Error(`FastAPI ${path}: ${res.status}`);
  return res.json();
}

export async function fastapiRecommendTags(input: {
  locale: "ja" | "en";
  skinType?: string;
  concerns?: string[];
  metrics?: Record<string, number>;
}) {
  // 既存のエンドポイントがないため、デフォルト値を返す
  // 実際の実装では、Firestoreから既存のインサイトを取得する
  return {
    tags: ["美容液", "クリーム", "化粧水"],
    ingredients: ["ヒアルロン酸", "セラミド", "ビタミンC"],
    insights: [] // 空配列にして、既存のFirestoreデータを使用
  };
}

export async function fastapiRecommendProducts(input: {
  locale: "ja" | "en";
  tags: string[];
  limit?: number;
}) {
  // main.pyの /api/v1/recommendations エンドポイントを正しく呼び出し
  if (!BASE) throw new Error("FASTAPI_URL not set");
  
  // 肌タイプを決定（tagsから推測、またはデフォルト値）
  let skinType = "normal";
  if (input.tags.some(tag => tag.includes("乾燥") || tag.includes("dry"))) {
    skinType = "dry";
  } else if (input.tags.some(tag => tag.includes("脂性") || tag.includes("oily"))) {
    skinType = "oily";
  } else if (input.tags.some(tag => tag.includes("混合") || tag.includes("combination"))) {
    skinType = "combination";
  }
  
  const res = await fetch(`${BASE}/api/v1/recommendations`, {
    method: 'POST',
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ skinType })
  });
  
  if (!res.ok) throw new Error(`FastAPI /api/v1/recommendations: ${res.status}`);
  const data = await res.json();
  
  // main.pyのレスポンス形式に合わせて変換
  return {
    items: (data.products || []).map((p: any) => ({
      id: p.id || p.itemCode,
      name: p.productName || p.itemName,
      brand: p.brandName || p.shopName,
      price: undefined, // 楽天APIには価格情報がない
      image: p.imageUrl,
      url: p.purchaseUrl || p.itemUrl,
      source: "rakuten",
      keyword: undefined
    }))
  };
}

export async function fastapiRecommendInsights(input: {
  locale: "ja" | "en";
  skinType?: string;
  concerns?: string[];
  metrics?: Record<string, number>;
}) {
  // 既存のエンドポイントがないため、デフォルト値を返す
  // 実際の実装では、Firestoreから既存のインサイトを取得する
  return {
    insights: [] // 空配列にして、既存のFirestoreデータを使用
  };
}
