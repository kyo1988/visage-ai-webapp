import { useTranslations } from '@/app/lib/intl';
// app/[locale]/cases/page.tsx

async function getT(locale: string, ns: string) {
  const messages = (await import(`../../../messages/${locale}.json`)).default as Record<string, any>;
  const scope = ns.split('.').reduce<any>((o, k) => (o ? o[k] : undefined), messages) ?? {};
  return (key: string) => key.split('.').reduce<any>((o, k) => (o ? o[k] : undefined), scope) ?? key;
}

export default async function CasesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getT(locale, 'cases');
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                {t('hero.cta')}
              </button>
              <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                {t('hero.secondaryCta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('metrics.title')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">+20%</div>
              <div className="text-gray-600">{t('metrics.cvr')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">+15%</div>
              <div className="text-gray-600">{t('metrics.aov')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">+25%</div>
              <div className="text-gray-600">{t('metrics.retention')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">+10%</div>
              <div className="text-gray-600">{t('metrics.ltv')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('caseStudies.title')}</h2>
          <div className="space-y-12">
            {/* Case Study 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-blue-600">A</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t('caseStudies.study1.company')}</h3>
                      <p className="text-gray-600">{t('caseStudies.study1.industry')}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.challenge')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study1.challenge')}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.solution')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study1.solution')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{t('caseStudies.study1.kpi1.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study1.kpi1.label')}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{t('caseStudies.study1.kpi2.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study1.kpi2.label')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>{t('caseStudies.chartPlaceholder')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center order-2 lg:order-1">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>{t('caseStudies.chartPlaceholder')}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-green-600">B</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t('caseStudies.study2.company')}</h3>
                      <p className="text-gray-600">{t('caseStudies.study2.industry')}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.challenge')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study2.challenge')}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.solution')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study2.solution')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{t('caseStudies.study2.kpi1.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study2.kpi1.label')}</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{t('caseStudies.study2.kpi2.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study2.kpi2.label')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-purple-600">C</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t('caseStudies.study3.company')}</h3>
                      <p className="text-gray-600">{t('caseStudies.study3.industry')}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.challenge')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study3.challenge')}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('caseStudies.solution')}</h4>
                    <p className="text-gray-600">{t('caseStudies.study3.solution')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{t('caseStudies.study3.kpi1.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study3.kpi1.label')}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{t('caseStudies.study3.kpi2.value')}</div>
                      <div className="text-sm text-gray-600">{t('caseStudies.study3.kpi2.label')}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p>{t('caseStudies.chartPlaceholder')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('implementation.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('implementation.step1.title')}</h3>
              <p className="text-gray-600">{t('implementation.step1.description')}</p>
              <div className="mt-4 text-sm text-blue-600 font-semibold">{t('implementation.step1.duration')}</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('implementation.step2.title')}</h3>
              <p className="text-gray-600">{t('implementation.step2.description')}</p>
              <div className="mt-4 text-sm text-green-600 font-semibold">{t('implementation.step2.duration')}</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('implementation.step3.title')}</h3>
              <p className="text-gray-600">{t('implementation.step3.description')}</p>
              <div className="mt-4 text-sm text-purple-600 font-semibold">{t('implementation.step3.duration')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 text-green-100">{t('cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('cta.primary')}
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {t('cta.secondary')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}