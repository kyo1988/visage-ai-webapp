import type { Metadata } from "next";
import "./globals.css";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.visageaiconsulting.com";

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
        {children}
      </body>
    </html>
  );
}
