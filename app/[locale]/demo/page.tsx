import type { Metadata } from "next";
import DemoRequestForm from "./DemoRequestForm";

type Props = {
  params: { locale: string };
};

export const dynamic = "force-static";

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: locale === "ja" ? "Visage AI | 無料デモ予約" : "Visage AI | Book a Demo",
    description:
      locale === "ja"
        ? "店舗向けAI接客支援 Visage AI の無料デモ予約フォームです。"
        : "Book a free demo of Visage AI for inbound retail consultation support.",
  };
}

export default function DemoPage({ params: { locale } }: Props) {
  const lang = locale === "en" ? "en" : "ja";
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CAL_URL ??
    process.env.CALCOM_URL ??
    "";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <DemoRequestForm locale={lang} calendlyUrl={calendlyUrl} />
    </main>
  );
}
