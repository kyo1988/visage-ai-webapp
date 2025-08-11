"use client";
import { useTranslations } from "@/app/lib/intl";

export function KpiSection() {
  const t = useTranslations("landing.kpi");
  
  return (
    <section className="scroll-mt-28 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
        </header>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("cards.cvr.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("cards.cvr.desc")}</p>
          </div>
          
          <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("cards.nps.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("cards.nps.desc")}</p>
          </div>
          
          <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("cards.ltv.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("cards.ltv.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}