import type { RecommendationItem } from "@/types/recommendation";

const PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SERVER_API_BASE_URL = process.env.API_BASE_URL || process.env.FASTAPI_URL;

// Canonical production backend truth.
const BASE =
  PUBLIC_API_BASE_URL ||
  SERVER_API_BASE_URL ||
  "https://visage-ai-api.vercel.app";

// Server-only auth token. Intentionally no NEXT_PUBLIC fallback.
const SERVER_API_TOKEN = process.env.API_AUTH_TOKEN || process.env.FASTAPI_TOKEN;

const ROUTES = {
  recommendations: "/api/v2/recommendations",
  modelsStatus: "/api/v2/models/status",
  demo: "/api/v2/demo",
  demoRateLimit: "/api/v2/demo/rate-limit",
} as const;

function authHeaders(): Record<string, string> {
  if (typeof window !== "undefined") {
    return {};
  }
  return SERVER_API_TOKEN ? { Authorization: `Bearer ${SERVER_API_TOKEN}` } : {};
}

export async function fastapiGet(path: string, params?: Record<string, string>) {
  if (!BASE) throw new Error("API base URL not set");
  const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await fetch(`${BASE}${path}${qs}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "force-cache",
    next: { revalidate: 300 },
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
  void input;
  return {
    tags: ["美容液", "クリーム", "化粧水"],
    ingredients: ["ヒアルロン酸", "セラミド", "ビタミンC"],
    insights: [],
  };
}

export async function fastapiRecommendProducts(input: {
  locale: "ja" | "en";
  tags: string[];
  limit?: number;
}) {
  if (!BASE) throw new Error("API base URL not set");

  let skinType = "normal";
  if (input.tags.some((tag) => tag.includes("乾燥") || tag.includes("dry"))) {
    skinType = "dry";
  } else if (input.tags.some((tag) => tag.includes("脂性") || tag.includes("oily"))) {
    skinType = "oily";
  } else if (
    input.tags.some((tag) => tag.includes("混合") || tag.includes("combination"))
  ) {
    skinType = "combination";
  }

  const res = await fetch(`${BASE}/api/v1/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ skinType }),
  });

  if (!res.ok) throw new Error(`FastAPI /api/v1/recommendations: ${res.status}`);
  const data = await res.json();

  return {
    items: (data.products || []).map((p: any) => ({
      id: p.id || p.itemCode,
      name: p.productName || p.itemName,
      brand: p.brandName || p.shopName,
      price: undefined,
      image: p.imageUrl,
      url: p.purchaseUrl || p.itemUrl,
      source: "rakuten",
      keyword: undefined,
    })),
  };
}

export async function fastapiRecommendInsights(input: {
  locale: "ja" | "en";
  skinType?: string;
  concerns?: string[];
  metrics?: Record<string, number>;
}) {
  void input;
  return { insights: [] };
}

// ======================================================================
// Recommendation Engine API Integration
// ======================================================================

export type { RecommendationItem };

export interface RecommendationEngineRequest {
  skinType: string;
  skinAnalysis?: Record<string, number>;
  limit?: number;
  context?: "lp_demo" | "mobile" | "premium";
  user_id?: string;
}

export interface RecommendationEngineResponse {
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

export async function fastapiRecommendations(
  input: RecommendationEngineRequest,
): Promise<RecommendationEngineResponse> {
  if (!BASE) throw new Error("API base URL not set");

  const res = await fetch(`${BASE}${ROUTES.recommendations}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(
      `FastAPI ${ROUTES.recommendations}: ${res.status} - ${error}`,
    );
  }

  return res.json();
}

export async function fastapiModelsStatus(): Promise<ModelStatusResponse> {
  if (!BASE) throw new Error("API base URL not set");

  const res = await fetch(`${BASE}${ROUTES.modelsStatus}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`FastAPI ${ROUTES.modelsStatus}: ${res.status}`);
  }

  return res.json();
}

export async function fastapiDemo(
  input: DemoRecommendationRequest,
): Promise<RecommendationEngineResponse> {
  if (!BASE) {
    throw new Error(
      "API base URL is not set. Configure NEXT_PUBLIC_API_BASE_URL or API_BASE_URL (server).",
    );
  }

  const res = await fetch(`${BASE}${ROUTES.demo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`FastAPI ${ROUTES.demo}: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function fastapiDemoRateLimit(session_id: string): Promise<{
  remaining_requests: number;
  max_requests: number;
  window_minutes: number;
}> {
  if (!BASE) {
    throw new Error(
      "API base URL is not set. Configure NEXT_PUBLIC_API_BASE_URL or API_BASE_URL (server).",
    );
  }

  const res = await fetch(
    `${BASE}${ROUTES.demoRateLimit}?session_id=${session_id}`,
    {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`FastAPI ${ROUTES.demoRateLimit}: ${res.status}`);
  }

  return res.json();
}
