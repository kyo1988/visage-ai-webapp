import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReportServer } from "@/components/report/ReportServer";
import { fetchReportById } from "@/app/lib/report-api";

export const revalidate = 300;

type Props = { 
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function negotiateLocale(h: string | null): "ja" | "en" { 
  return (h ?? "").toLowerCase().startsWith("ja") ? "ja" : "en"; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const h = headers();
  const loc = negotiateLocale(h.get("accept-language"));
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

export default async function Page({ params, searchParams }: Props) {
  const loc = negotiateLocale(headers().get("accept-language"));
  const forceFirebase = searchParams.source === 'firebase';
  const data = await fetchReportById(params.id, loc, { forceFirebase });
  if (!data) return notFound();
  return <ReportServer id={params.id} locale={loc} report={data} />;
}
