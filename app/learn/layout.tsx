import Script from "next/script";
import { Suspense } from "react";
import AnalyticsListener from "@/app/analytics-listener";
import AppCookieBanner from "@/app/app/AppCookieBanner";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {GA_ID && (
        <>
          {/* Consent Mode v2: default denied; AppCookieBanner updates to 'granted' on accept.
              Scoped to /learn only, mirroring app/app/layout.tsx, so GA isn't
              double-initialized on /en and /ja (which have their own equivalent script). */}
          <Script id="learn-gtag-consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                wait_for_update: 500
              });
              try {
                var saved = localStorage.getItem('ga_consent');
                if (saved === 'granted') {
                  gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
                }
              } catch(e) {}
            `}
          </Script>
          <Script
            id="learn-gtag-js"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="learn-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
      {children}
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
      <AppCookieBanner />
    </>
  );
}
