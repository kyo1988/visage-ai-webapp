import { useTranslations } from '@/app/lib/intl';
// app/[locale]/pricing/page.tsx
async function getT(locale: string, ns: string) {
  const messages = (await import(`../../../messages/${locale}.json`)).default as Record<string, any>;
  const scope = ns.split('.').reduce<any>((o, k) => (o ? o[k] : undefined), messages) ?? {};
  return (key: string) => key.split('.').reduce<any>((o, k) => (o ? o[k] : undefined), scope) ?? key;
}

export const dynamic = 'force-static';

export default async function PricingPage({params:{locale}}:{params:{locale:'ja'|'en'}}){
  const t = await getT(locale, 'pricing');
  
  const base = `/${locale}`;
  const tiers = [
    {
      name: t('tiers.starter.name'),
      price: t('tiers.starter.price'),
      description: t('tiers.starter.description'),
      features: [
        t('tiers.starter.features.analyses'),
        t('tiers.starter.features.support'),
        t('tiers.starter.features.api'),
        t('tiers.starter.features.docs')
      ],
      cta: `${base}/demo`,
      popular: false
    },
    {
      name: t('tiers.pro.name'),
      price: t('tiers.pro.price'),
      description: t('tiers.pro.description'),
      features: [
        t('tiers.pro.features.analyses'),
        t('tiers.pro.features.support'),
        t('tiers.pro.features.xai'),
        t('tiers.pro.features.analytics'),
        t('tiers.pro.features.integration')
      ],
      cta: `${base}/demo`,
      popular: true
    },
    {
      name: t('tiers.enterprise.name'),
      price: t('tiers.enterprise.price'),
      description: t('tiers.enterprise.description'),
      features: [
        t('tiers.enterprise.features.sla'),
        t('tiers.enterprise.features.onprem'),
        t('tiers.enterprise.features.security'),
        t('tiers.enterprise.features.support'),
        t('tiers.enterprise.features.custom')
      ],
      cta: `${base}/demo`,
      popular: false
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                {t('hero.cta')}
              </button>
              <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                {t('hero.secondaryCta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <div key={tier.name} className={`relative rounded-2xl border p-8 ${
                tier.popular 
                  ? 'ring-2 ring-purple-600 shadow-lg scale-105' 
                  : 'shadow-md'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {t('popular')}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{tier.price}</div>
                  {tier.price !== t('tiers.enterprise.price') && (
                    <p className="text-gray-500 text-sm">{t('perMonth')}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={tier.cta} className={`w-full text-center inline-flex justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  {tier.name === t('tiers.enterprise.name') ? t('contactSales') : t('getStarted')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('faq.q1.question')}</h3>
              <p className="text-gray-600">{t('faq.q1.answer')}</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('faq.q2.question')}</h3>
              <p className="text-gray-600">{t('faq.q2.answer')}</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">{t('faq.q3.question')}</h3>
              <p className="text-gray-600">{t('faq.q3.answer')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 text-purple-100">{t('cta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('cta.primary')}
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              {t('cta.secondary')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}