"use client";
import { useTranslations } from "@/app/lib/intl";

export default function DxSection() {
    const t = useTranslations("landing.dx");

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        {t("lead")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Subsidy Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                            {t("subsidyTitle")}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            {t("subsidyTitle")}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {t("subsidyDesc")}
                        </p>
                    </div>

                    {/* License Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
                            {t("licenseTitle")}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">
                            {t("licenseTitle")}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {t("licenseDesc")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
