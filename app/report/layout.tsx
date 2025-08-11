import { ReactNode } from "react";
import { headers } from "next/headers";
import { I18nProvider } from "@/app/lib/intl";
import { getMessages } from "@/app/lib/messages";
import "../globals.css";

function negotiateLocale(acceptLang: string | null): "ja" | "en" {
  const raw = (acceptLang ?? "").toLowerCase();
  return raw.startsWith("ja") ? "ja" : "en";
}

export default async function ReportLayout({ children }: { children: ReactNode }) {
  const h = headers();
  const locale = negotiateLocale(h.get("accept-language"));
  const messages = await getMessages(locale);
  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
