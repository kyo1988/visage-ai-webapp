"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "@/app/lib/intl";
import { track } from "@/app/lib/analytics";

export default function FinalCta() {
  const t = useTranslations("landing.finalCta");
  const locale = useLocale();

  return (
    <section className="scroll-mt-28 py-10 md:py-12">
      <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-8 text-center shadow-md">
        <div className="h-0.5 w-10 rounded bg-sky-500 mx-auto mb-3" />
        <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}/demo`}
            onClick={() => track("final_demo_click")}
            className="rounded-xl bg-black px-5 py-3 text-white shadow-sm hover:opacity-90"
          >
            {t("primary")}
          </Link>
          <Link
            href={`/${locale}/docs`}
            className="rounded-xl border px-5 py-3 shadow-sm hover:bg-accent"
          >
            {t("secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}