//
// visage-ai-webapp/app/page.tsx
// 【最終完成形コード - Tailwindネイティブ / App Router準拠】
//

// このページはサーバーコンポーネントなので 'use client' は不要です。
// これにより、SEOと初期表示速度が最大化されます。

// --- コンポーネントのインポート ---
// components/landingフォルダに作成した、再利用可能なUI部品をインポートします。
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/Features";
import { StorySection } from "@/components/landing/Story";
import { TechnologySection } from "@/components/landing/Technology";
import { ResultsSection } from "@/components/landing/Results";
import { PrivacySection } from "@/components/landing/Privacy";
import { ScalabilitySection } from "@/components/landing/Scalability";
import { CTASection } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";


/**
 * トップページ（ランディングページ）
 * このコンポーネントの役割は、各セクションのコンポーネントを
 * 正しい順番で配置することだけです。
 * 実際のロジックやスタイルは、各コンポーネントファイルに完全に分離されています。
 */
export default function HomePage() {
  return (
    // <main>タグや、特定の<div className="App">のようなラッパーは、
    // 各コンポーネントが必要に応じて持つべきであり、
    // page.tsx自体はクリーンに保ちます。
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StorySection />
        <TechnologySection />
        <ResultsSection />
        <PrivacySection />
        <ScalabilitySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}