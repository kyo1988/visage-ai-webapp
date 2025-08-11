'use client';

import Image from 'next/image';
import { useTranslations } from '@/app/lib/intl';

export default function Scalability() {
  const t = useTranslations();

  return (
    <section id="scale" className="scroll-mt-28 py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-semibold">{t("scalability.title")}</h2>
          <p className="mt-3 text-slate-600">{t("scalability.subtitle")}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-medium">{t("scalability.cards.region.title")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("scalability.cards.region.desc")}</p>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-medium">{t("scalability.cards.sdk.title")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("scalability.cards.sdk.desc")}</p>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-medium">{t("scalability.cards.security.title")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("scalability.cards.security.desc")}</p>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <h3 className="font-medium">{t("scalability.cards.cost.title")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("scalability.cards.cost.desc")}</p>
            </div>
          </div>
        </div>

        <div>
          <Image
            src="/mock/scalability-1.png" // ない場合は差し替え
            alt={t("scalability.imageAlt")}
            width={960}
            height={640}
            className="w-full h-auto rounded-xl border bg-white object-cover"
          />
        </div>
      </div>
    </section>
  );
}