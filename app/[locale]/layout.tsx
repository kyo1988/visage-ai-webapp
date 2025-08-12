import '../globals.css';
import { StickyHeader } from '@/components/layout/StickyHeader';
import MobileStickyCta from '@/components/layout/MobileStickyCta';
import { I18nProvider } from '@/app/lib/intl';
import type { Metadata } from "next";

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
  
  return (
    <html lang={locale} className="h-full">
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
      </body>
    </html>
  );
}
