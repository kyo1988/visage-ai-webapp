import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportServer } from "@/components/report/ReportServer";
import { fetchReportById } from "@/app/lib/report-api";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 300;

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

export default async function Page({ params, searchParams }: Props) {
  const loc = params.locale === "ja" ? "ja" : "en";
  const forceFirebase = searchParams.source === 'firebase';
  const data = await fetchReportById(params.id, loc, forceFirebase);
  if (!data) return notFound();
  
  // デバッグ情報を一時表示（開発後に削除可）
  const pickedSource = data.id ? 'firebase' : 'mock'; // 簡易判定
  
  return (
    <>
      <ReportServer id={params.id} locale={loc} />
      {/* source: {pickedSource} runtime: {process.env.NEXT_RUNTIME || "node"} */}
    </>
  );
}