'use client';

import { useTranslations } from '@/app/lib/intl';

export const FeaturesSection = () => {
  const t = useTranslations();
  
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t("FeaturesSection.title")}
        </h3>
        <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          {t("FeaturesSection.subtitle")}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* CVR Improvement */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("FeaturesSection.item1_title")}</h4>
            <p className="text-gray-600">{t("FeaturesSection.item1_desc")}</p>
          </div>
          
          {/* AOV Increase */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("FeaturesSection.item2_title")}</h4>
            <p className="text-gray-600">{t("FeaturesSection.item2_desc")}</p>
          </div>
          
          {/* LTV Growth */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("FeaturesSection.item3_title")}</h4>
            <p className="text-gray-600">{t("FeaturesSection.item3_desc")}</p>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          {t("FeaturesSection.footnote")}
        </div>
      </div>
    </section>
  );
};