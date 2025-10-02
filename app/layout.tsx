import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Visage AI",
  description: "AI-powered skin analysis and ingredient recommendations",
  metadataBase: new URL(base),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {GA_ID ? (
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
                  page_path: window.location.pathname,
                });
                console.log('[GA4] Configuration complete');
                console.log('[GA4] dataLayer:', window.dataLayer);
              `}
            </Script>
          </>
        ) : (
          <Script id="ga-debug" strategy="afterInteractive">
            {`
              console.log('[GA4] GA_ID not found');
              console.log('[GA4] NODE_ENV:', '${process.env.NODE_ENV}');
            `}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
