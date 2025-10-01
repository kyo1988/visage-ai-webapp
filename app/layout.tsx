import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import AnalyticsListener from "./analytics-listener";
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
        {!!GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  send_page_view: false,
                  linker: {
                    domains: ['www.visageaiconsulting.com','visageaiconsulting.com','kyo1988.github.io']
                  }
                });
              `}
            </Script>
          </>
        )}
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
