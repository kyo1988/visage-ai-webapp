import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportServer } from "@/components/report/ReportServer";
import { fetchReportById } from "@/app/lib/report-api";

export const revalidate = 300;

type Props = { params: { locale: string; id: string } };

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

export default async function Page({ params }: Props) {
  const loc = params.locale === "ja" ? "ja" : "en";
  const data = await fetchReportById(params.id, loc);
  if (!data) return notFound();
  return <ReportServer id={params.id} locale={loc} />;
}