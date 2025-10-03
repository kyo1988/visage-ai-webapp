'use client';

import { useTranslations } from '@/app/lib/intl';
import { gaEvent } from '@/app/lib/gtag';

export const CTASection = () => {
  const t = useTranslations();
  
  return (
    <>
      {/* Implementation Steps Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("howItWorks.title")}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1: Design */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("howItWorks.step1.title")}</h4>
              <p className="text-gray-600">
                {t("howItWorks.step1.description")}
              </p>
            </div>
            
            {/* Step 2: Implementation */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("howItWorks.step2.title")}</h4>
              <p className="text-gray-600">
                {t("howItWorks.step2.description")}
              </p>
            </div>
            
            {/* Step 3: Verification */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-display text-xl font-bold mb-4 text-gray-900">{t("howItWorks.step3.title")}</h4>
              <p className="text-gray-600">
                {t("howItWorks.step3.description")}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="#" 
              className="inline-block text-blue-600 hover:text-blue-700 font-medium text-lg"
              onClick={() => gaEvent('click_cta', {
                destination: 'documentation',
                placement: 'how_it_works',
                campaign: 'docs_link'
              })}
            >
              {t("howItWorks.docsLink")} →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            {t("finalCta.title")}
          </h3>
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            {t("finalCta.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-center"
              onClick={() => gaEvent('click_cta', {
                destination: 'demo_booking',
                placement: 'final_cta',
                campaign: 'primary_cta'
              })}
            >
              {t("finalCta.ctaPrimary")}
            </a>
            <a 
              href="#" 
              className="inline-block bg-transparent text-white border-2 border-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all text-center"
              onClick={() => gaEvent('click_cta', {
                destination: 'download_materials',
                placement: 'final_cta',
                campaign: 'secondary_cta'
              })}
            >
              {t("finalCta.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};