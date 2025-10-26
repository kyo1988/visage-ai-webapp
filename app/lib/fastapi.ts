const BASE = process.env.NEXT_PUBLIC_FASTAPI_URL || process.env.FASTAPI_URL;
const TOKEN = process.env.NEXT_PUBLIC_FASTAPI_TOKEN || process.env.FASTAPI_TOKEN;

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

// ======================================================================
// CrystalAI API Integration
// ======================================================================

import type { RecommendationItem } from "@/types/recommendation";

// Re-export for external usage
export type { RecommendationItem };

export interface CrystalAIRecommendationRequest {
  skinType: string;
  skinAnalysis?: Record<string, number>;
  limit?: number;
  context?: 'lp_demo' | 'mobile' | 'premium';
  user_id?: string;
}

export interface CrystalAIRecommendationResponse {
  recommendations: RecommendationItem[];
  message: string;
  accuracy_note?: string;
  session_id?: string;
}

export interface DemoRecommendationRequest {
  skinType: string;
  email?: string;
  session_id?: string;
}

export interface ModelStatusResponse {
  status: string;
  models_count: number;
  ensemble_weight?: number | null;
  last_updated?: string | null;
  performance?: Record<string, number> | null;
}

export async function fastapiCrystalAIRecommendations(input: CrystalAIRecommendationRequest): Promise<CrystalAIRecommendationResponse> {
  if (!BASE) throw new Error("FASTAPI_URL not set");
  
  const res = await fetch(`${BASE}/api/v2/crystalai/recommendations`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json", 
      ...authHeaders() 
    },
    body: JSON.stringify(input)
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`FastAPI /api/v2/crystalai/recommendations: ${res.status} - ${error}`);
  }
  
  return res.json();
}

export async function fastapiCrystalAIModelsStatus(): Promise<ModelStatusResponse> {
  if (!BASE) throw new Error("FASTAPI_URL not set");
  
  const res = await fetch(`${BASE}/api/v2/crystalai/models/status`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store"
  });
  
  if (!res.ok) {
    throw new Error(`FastAPI /api/v2/crystalai/models/status: ${res.status}`);
  }
  
  return res.json();
}

export async function fastapiCrystalAIDemo(input: DemoRecommendationRequest): Promise<CrystalAIRecommendationResponse> {
  if (!BASE) throw new Error("FASTAPI_URL not set");
  
  const res = await fetch(`${BASE}/api/v2/crystalai/demo`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`FastAPI /api/v2/crystalai/demo: ${res.status} - ${error}`);
  }
  
  return res.json();
}

export async function fastapiCrystalAIDemoRateLimit(session_id: string): Promise<{ remaining_requests: number; max_requests: number; window_minutes: number }> {
  if (!BASE) throw new Error("FASTAPI_URL not set");
  
  const res = await fetch(`${BASE}/api/v2/crystalai/demo/rate-limit?session_id=${session_id}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  });
  
  if (!res.ok) {
    throw new Error(`FastAPI /api/v2/crystalai/demo/rate-limit: ${res.status}`);
  }
  
  return res.json();
}
