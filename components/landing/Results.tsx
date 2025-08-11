'use client';

import { useTranslations } from '@/app/lib/intl';

export const ResultsSection = () => {
  const t = useTranslations();
  
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t("ResultsSection.results_main_title")}
        </h3>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          {t("ResultsSection.results_main_subtitle")}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Case Study 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
            <div className="w-16 h-16 mb-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
              {t("caseStudies.study1.logo")}
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.challenge")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study1.challenge")}</p>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.solution")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study1.solution")}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study1.kpi1.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study1.kpi1.value")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study1.kpi2.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study1.kpi2.value")}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">{t("caseStudies.study1.duration")}</div>
            <a href="#" className="inline-block text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t("caseStudies.cta")} →
            </a>
          </div>
          
          {/* Case Study 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
            <div className="w-16 h-16 mb-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
              {t("caseStudies.study2.logo")}
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.challenge")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study2.challenge")}</p>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.solution")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study2.solution")}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study2.kpi1.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study2.kpi1.value")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study2.kpi2.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study2.kpi2.value")}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">{t("caseStudies.study2.duration")}</div>
            <a href="#" className="inline-block text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t("caseStudies.cta")} →
            </a>
          </div>
          
          {/* Case Study 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
            <div className="w-16 h-16 mb-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
              {t("caseStudies.study3.logo")}
            </div>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.challenge")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study3.challenge")}</p>
            <h4 className="font-semibold text-gray-900 mb-3">{t("caseStudies.solution")}</h4>
            <p className="text-gray-600 mb-4">{t("caseStudies.study3.solution")}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study3.kpi1.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study3.kpi1.value")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("caseStudies.study3.kpi2.label")}</span>
                <span className="font-semibold text-green-600">{t("caseStudies.study3.kpi2.value")}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">{t("caseStudies.study3.duration")}</div>
            <a href="#" className="inline-block text-blue-600 hover:text-blue-700 text-sm font-medium">
              {t("caseStudies.cta")} →
            </a>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("ResultsSection.results_conclusion")}
          </p>
        </div>
      </div>
    </section>
  );
};