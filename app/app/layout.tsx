import type { Metadata } from "next";
import Script from "next/script";
import AppCookieBanner from "./AppCookieBanner";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

const TITLE = "Visage AI — One Clear Beauty Priority";
const DESCRIPTION =
  "Take a photo, understand what to focus on today, check whether your routine already covers it, and return later to compare measured results.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(base),
  itunes: {
    appId: "6748892785",
  },
  alternates: {
    canonical: `${base}/app`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${base}/app`,
    siteName: "Visage AI",
    images: ["/og.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AppLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {GA_ID && (
        <>
          {/* Consent Mode v2: default denied; CookieBanner updates to 'granted' on accept.
              Scoped to this route only — the shared [locale] layout has its own
              equivalent script, so this is intentionally not added to the app-wide
              root layout to avoid double-initializing GA on /en and /ja. */}
          <Script id="app-gtag-consent-default" strategy="beforeInteractive">
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
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="app-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: '/app' });
            `}
          </Script>
        </>
      )}
      {children}
      <AppCookieBanner />
    </>
  );
}
