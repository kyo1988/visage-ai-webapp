"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "@/app/lib/intl";
import { track } from "@/app/lib/analytics";

export default function Hero() {
  const t = useTranslations("landing.hero");
  const locale = useLocale();

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="flex gap-2 mb-4">
            {["A/B growth", "Explainable AI", "SDK & API"].map((b: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
              >
                {b}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            {t("lead")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/demo`}
              aria-label={t("primaryCta")}
              onClick={() => track("hero_demo_click")}
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white shadow-sm hover:opacity-90"
            >
              {t("primaryCta")}
            </Link>

            <a
              href="#cases"
              aria-label={t("secondaryCta")}
              onClick={() => track("hero_examples_click")}
              className="inline-flex items-center justify-center rounded-xl border px-5 py-3 shadow-sm hover:bg-accent"
            >
              {t("secondaryCta")}
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {t("deployedNote")}
          </p>
        </div>

        <div className="relative">
          <Image
            src="/images/hero-report-ui.png"
            alt={t("previewAlt") ?? "Visage AI report preview"}
            width={900}
            height={700}
            priority
            className="w-full rounded-2xl border shadow-md"
          />
        </div>
      </div>
    </section>
  );
}