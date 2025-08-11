import { useTranslations, useLocale } from '@/app/lib/intl';

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();

  const steps = [
    { id: 1, title: t('step1.title'), description: t('step1.description') },
    { id: 2, title: t('step2.title'), description: t('step2.description') },
    { id: 3, title: t('step3.title'), description: t('step3.description') },
  ];

  return (
    <section className="section bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-12">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="rounded-brand border bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition">
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-right mt-8">
          <a href={`/${locale}/docs`} className="text-brand hover:underline">
            {t('docsLink')} →
          </a>
        </div>
      </div>
    </section>
  );
}