import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportServer } from "@/components/report/ReportServer";
import { fetchReportById } from "@/app/lib/report-api";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Props = {
  params: { locale: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = params.locale === "ja" ? "ja" : "en";
  const data = await fetchReportById(params.id, loc);
  if (!data) return {};
  const title = loc === "ja" ? "パーソナルスキンケア診断レポート" : "Personal Skin Care Diagnostic Report";
  const description = data.summary?.slice(0, 120) ?? (loc === "ja" ? "AIによる肌解析レポート" : "AI skin analysis report");
  const ogImage = data.ogImage ?? "/og.jpg";
  return {
    title,
    description,
    alternates: { languages: { "en": `/en/report/${params.id}`, "ja": `/ja/report/${params.id}` } },
    openGraph: { title, description, images: [{ url: ogImage }], type: "article" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

// Fallback mock data generator if imports fail or manual construction needed
function createEmergencyMock(id: string, locale: "ja" | "en"): any {
  return {
    id,
    title: "Skin Analysis Report",
    generatedAt: Date.now(),
    score: { skinAge: 29, rank: 75, label: "Good" },
    radar: { labels: ["Texture", "Hydration", "Pores", "Wrinkles", "Pigmentation", "Sensitivity"], values: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
    insights: ["Hydration needed", "UV care recommended"],
    routine: { am: { steps: ["Cleanse", "Moisturize", "SPF"] }, pm: { steps: ["Cleanse", "Retinol", "Cream"] }, ingredients: ["Retinol", "Ceramides"] },
    ingredients: { items: [{ name: "Retinol", desc: "Anti-aging" }] },
    products: [],
    skinType: "normal"
  };
}

export default async function Page({ params, searchParams }: Props) {
  const loc = params.locale === "ja" ? "ja" : "en";
  const forceFirebase = searchParams.source === 'firebase';
  const storeId = typeof searchParams.store_id === 'string' ? searchParams.store_id : undefined;

  let data = await fetchReportById(params.id, loc, { forceFirebase });

  // If fetch fails but we have a store_id, FORCE a mock report to show the store products
  if (!data && storeId) {
    console.log("⚠️ Fetch failed but store_id present, forcing mock report for OMO demo");
    data = createEmergencyMock(params.id, loc);
  }

  if (!data) return notFound();

  return <ReportServer id={params.id} locale={loc} report={data} storeId={storeId} />;
}