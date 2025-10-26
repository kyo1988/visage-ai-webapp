import { CrystalAIRecommendationDemo } from "@/components/landing/CrystalAIRecommendationDemo";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = locale === 'ja'
    ? 'CrystalAI レコメンデーション - Visage AI'
    : 'CrystalAI Recommendations - Visage AI';
  const description = locale === 'ja'
    ? 'リアルタイムでスキンケア製品レコメンデーションを試す'
    : 'Try real-time skincare product recommendations';
  
  return {
    title,
    description,
    openGraph: { title, description, images: ['/og.jpg'], url: `/${locale}/recommendation-demo` },
    alternates: { canonical: `/${locale}/recommendation-demo` }
  };
}

export default function RecommendationDemoPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return (
    <CrystalAIRecommendationDemo locale={locale as 'ja' | 'en'} />
  );
}

