import '../globals.css';
import { StickyHeader } from '@/components/layout/StickyHeader';
import MobileStickyCta from '@/components/layout/MobileStickyCta';
import { I18nProvider } from '@/app/lib/intl';
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import AnalyticsListener from "../analytics-listener";
import MetaPixelListener from "../meta-pixel-listener";
import CookieBanner from "@/components/CookieBanner";

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
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const isMetaPixelEnabled =
    process.env.VERCEL_ENV === "production" && Boolean(META_PIXEL_ID);
  
  return (
    <html lang={locale} className="h-full">
      <head>
        {GA_ID && (
          <>
            {/* Consent Mode v2: デフォルト拒否。CookieBanner が同意後に 'granted' に更新する */}
            <Script id="gtag-consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  wait_for_update: 500
                });
                // セッションストレージ or localStorage に同意済みなら即時復元
                try {
                  var saved = localStorage.getItem('ga_consent');
                  if (saved === 'granted') {
                    gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
                  }
                } catch(e) {}
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                  linker: {
                    domains: ['www.visageaiconsulting.com', 'visageaiconsulting.com', 'kyo1988.github.io']
                  }
                });
              `}
            </Script>
          </>
        )}
        {isMetaPixelEnabled && (
          <Script id="meta-pixel-base" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="h-full">
        {isMetaPixelEnabled && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`,
            }}
          />
        )}
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
        <MetaPixelListener enabled={isMetaPixelEnabled} />
        <CookieBanner />
      </body>
    </html>
  );
}
