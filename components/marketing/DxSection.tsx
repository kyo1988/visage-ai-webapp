"use client";
import { useTranslations } from "@/app/lib/intl";

export default function DxSection() {
    const t = useTranslations("landing.dx");

    const cards = [
        {
            id: "wipe",
            badge: "bg-blue-100 text-blue-800",
            title: t("subsidyTitle"),
            desc: t("subsidyDesc"),
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            id: "ondevice",
            badge: "bg-emerald-100 text-emerald-800",
            title: t("licenseTitle"),
            desc: t("licenseDesc"),
            icon: (
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
        {
            id: "subsidy",
            badge: "bg-amber-100 text-amber-800",
            title: t("subsidyTitle3"),
            desc: t("subsidyDesc3"),
            icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">{t("lead")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow"
                        >
                            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium mb-4 ${card.badge}`}>
                                {card.icon}
                                <span>{card.title}</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
