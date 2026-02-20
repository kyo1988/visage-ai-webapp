"use client";
import { useTranslations } from "@/app/lib/intl";

export default function OmotenashiSection() {
    const t = useTranslations("landing.omotenashi");

    const techCards = [
        {
            id: "color",
            icon: (
                <svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            label: t("card1.label"),
            title: t("card1.title"),
            desc: t("card1.desc"),
            color: "bg-rose-50",
        },
        {
            id: "tone",
            icon: (
                <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: t("card2.label"),
            title: t("card2.title"),
            desc: t("card2.desc"),
            color: "bg-amber-50",
        },
        {
            id: "archetype",
            icon: (
                <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: t("card3.label"),
            title: t("card3.title"),
            desc: t("card3.desc"),
            color: "bg-violet-50",
        },
    ];

    return (
        <section id="omotenashi" className="scroll-mt-28 py-12 md:py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="max-w-3xl mb-10">
                    <div className="h-0.5 w-10 rounded bg-rose-400 mb-3" />
                    <h2 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h2>
                    <p className="mt-3 text-muted-foreground">{t("lead")}</p>
                </header>

                <div className="grid gap-8 lg:grid-cols-2 items-start">
                    {/* Left: actual ShowToStaff screen photo */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                            <img
                                src="/images/omotenashi_screen.png"
                                alt={t("mockup.caption")}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <p className="mt-3 text-xs text-center text-muted-foreground">{t("mockup.caption")}</p>
                    </div>

                    {/* Right: Tech feature cards */}
                    <div className="space-y-4">
                        {techCards.map((card) => (
                            <div
                                key={card.id}
                                className={`rounded-xl border p-5 shadow-sm flex gap-4 items-start ${card.color}`}
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <div>
                                    <span className="inline-block text-xs font-medium text-muted-foreground mb-1">
                                        {card.label}
                                    </span>
                                    <h3 className="font-semibold text-slate-900">{card.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
