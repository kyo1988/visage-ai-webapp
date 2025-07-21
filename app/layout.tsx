// layout.tsx
import type { Metadata } from "next";
// next/font から必要なモジュールをインポート
import { Noto_Sans_JP, Lato, Montserrat } from "next/font/google";
import "./globals.css";
// 作成したLanguageProviderをインポート
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Visage AI",
  description: "Weave the Next-Gen 'Skin Story' with AI and Data.",
};

// フォント設定 (Tailwindのテーマと合わせる)
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: '--font-noto-sans-jp', // Tailwindで使うための変数名
  display: 'swap',
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: '--font-lato',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // htmlタグにフォント変数を適用
    <html lang="ja" className={`${notoSansJp.variable} ${lato.variable} ${montserrat.variable}`}>
      {/* headタグ内の古いlinkタグは不要なので削除 */}
      <head /> 
      <body>
        {/* LanguageProviderでchildrenを囲む */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}