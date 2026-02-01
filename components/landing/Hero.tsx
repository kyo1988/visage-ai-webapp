'use client';

import { useTranslations, useLocale } from '@/app/lib/intl';
import { gaEvent } from '@/app/lib/gtag';

export const HeroSection = () => {
  const t = useTranslations("landing.hero");
  const locale = useLocale();
  return (
    <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="hero-text">
          {/* バッジエリア */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
              {t("badges.0")}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
              {t("badges.1")}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
              {t("badges.2")}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: t("title") }}>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {t("lead")}
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/${locale}/demo`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-center"
              onClick={() => {
                console.log('[CTA] Hero Demo button clicked');
                gaEvent('cta_click', {
                  destination: 'demo_booking',
                  placement: 'hero',
                  campaign: 'main_cta'
                });
              }}
            >
              {t("primaryCta")}
            </a>
            <a
              href="#"
              className="inline-block bg-transparent text-white border-2 border-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all text-center"
              onClick={() => {
                console.log('[CTA] Hero Examples button clicked');
                gaEvent('cta_click', {
                  destination: 'report_examples',
                  placement: 'hero',
                  campaign: 'secondary_cta'
                });
              }}
            >
              {t("secondaryCta")}
            </a>
          </div>

          {/* Trusted by */}
          <div className="mt-8">
            <p className="text-gray-300 text-sm mb-2">Trusted by:</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-gray-600 rounded flex items-center justify-center text-gray-400 text-xs">Partner</div>
              <div className="w-16 h-8 bg-gray-600 rounded flex items-center justify-center text-gray-400 text-xs">Client</div>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="relative z-10">
            <img
              src="/images/hero_v2.png"
              alt="Visage AI Deep Skin Analysis App Interface"
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-gray-900/50 mx-auto max-w-[320px] md:max-w-sm"
              style={{ transform: 'rotate(-2deg)' }}
            />
            {/* Optional secondary image or decoration could go here */}
          </div>
        </div>
      </div>
    </section>
  );
}