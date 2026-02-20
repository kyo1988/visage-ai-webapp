"use client";
import { useTranslations } from "@/app/lib/intl";

export default function CaseStudies() {
  const t = useTranslations("landing.cases");

  return (
    <section id="cases" className="scroll-mt-28 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="h-0.5 w-10 rounded bg-sky-500 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("lead")}</p>
        </header>

        <div className="mt-8 grid gap-4 md:gap-5 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 md:p-5 shadow-sm text-center relative">
            <div className="w-16 h-16 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-sky-600 mb-2">{t("cards.0.value")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("cards.0.label")}</p>
            <div className="absolute bottom-3 right-3">
              <a href="#disclaimer" className="text-xs text-muted-foreground hover:underline">*</a>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 md:p-5 shadow-sm text-center relative">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-emerald-600 mb-2">{t("cards.1.value")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("cards.1.label")}</p>
            <div className="absolute bottom-3 right-3">
              <a href="#disclaimer" className="text-xs text-muted-foreground hover:underline">*</a>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 md:p-5 shadow-sm text-center relative">
            <div className="w-16 h-16 mx-auto mb-4 bg-violet-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-violet-600 mb-2">{t("cards.2.value")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("cards.2.label")}</p>
            <div className="absolute bottom-3 right-3">
              <a href="#disclaimer" className="text-xs text-muted-foreground hover:underline">*</a>
            </div>
          </div>
        </div>


        <div id="disclaimer" className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}