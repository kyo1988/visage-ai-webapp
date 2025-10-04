import '../globals.css';
import { StickyHeader } from '@/components/layout/StickyHeader';
import MobileStickyCta from '@/components/layout/MobileStickyCta';
import { I18nProvider } from '@/app/lib/intl';
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import AnalyticsListener from "../analytics-listener";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(base),
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: 'ja' | 'en'};
}) {
  const messages = (await import(`../../messages/${locale}.json`)).default as any;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang={locale} className="h-full">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                console.log('[GA4] Initializing with ID:', '${GA_ID}');
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                  linker: {
                    domains: ['www.visageaiconsulting.com', 'visageaiconsulting.com', 'kyo1988.github.io']
                  }
                });
                console.log('[GA4] Configuration complete');
                console.log('[GA4] dataLayer:', window.dataLayer);
              `}
            </Script>
          </>
        )}
      </head>
      <body className="h-full">
        <I18nProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <StickyHeader />
            <main className="flex-grow">
              {children}
            </main>
            <MobileStickyCta />
          </div>
        </I18nProvider>
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
      </body>
    </html>
  );
}
