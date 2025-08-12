"use client";
import { useTranslations } from "@/app/lib/intl";

export default function Scalability() {
  const t = useTranslations("landing.scalability");
  
  return null; // 一時的に非表示
  
  // 元のコード（コメントアウト）
  /*
  return (
    <section className="scroll-mt-28 py-10 md:py-12 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <div className="h-0.5 w-10 rounded bg-sky-500 mb-3" />
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">{t("lead")}</p>
        </header>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [t("item1.title"), t("item1.desc")],
            [t("item2.title"), t("item2.desc")],
            [t("item3.title"), t("item3.desc")]
          ].map(([title, desc], i) => (
            <div key={i} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  */
}
