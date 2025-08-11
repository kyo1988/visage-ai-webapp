"use client";
import Image from "next/image";
import { useTranslations } from "@/app/lib/intl";

export default function Story() {
  const t = useTranslations("landing.story");
  return (
    <section className="scroll-mt-28 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="h-0.5 w-10 rounded bg-sky-500 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{t("lead")}</p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Image
            src="/images/our-story-tokyo-illustration.png"
            alt={t("alt") ?? "Tokyo illustration"}
            width={1200}
            height={800}
            className="rounded-2xl border shadow-sm w-full h-auto object-cover"
          />
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">{t("storyTitle")}</h3>
            <p className="text-sm leading-7 mb-6">
              {t("storyLead")}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t("appNote")}
            </p>
            <div className="text-right">
              <a
                href="https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-600 hover:underline"
              >
                → App Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
