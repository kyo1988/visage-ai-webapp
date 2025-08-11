'use client';

import { useTranslations } from '@/app/lib/intl';
import { track } from '../../app/lib/analytics';

export function Faq() {
  const t = useTranslations();

  const faqs = [
    {
      id: 1,
      question: t("FaqSection.q1"),
      answer: (
        <>
          <p>{t("FaqSection.a1_p1")}</p>
          <p dangerouslySetInnerHTML={{ __html: t("FaqSection.a1_p2") }}></p>
          <p dangerouslySetInnerHTML={{ __html: t("FaqSection.a1_p3") }}></p>
        </>
      ),
    },
    {
      id: 2,
      question: t("faq.q2.question"),
      answer: t("faq.q2.answer"),
    },
    {
      id: 3,
      question: t("faq.q3.question"),
      answer: t("faq.q3.answer"),
    },
  ];

  const handleToggle = (qId: number) => {
    track('faq_open', { id: `q${qId}` });
  };

  return (
    <section id="faq" className="py-10 md:py-12 bg-gray-50 mb-0">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8 text-gray-900">
          {t("FaqSection.title")}
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <details key={faq.id} className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-all" onToggle={() => handleToggle(faq.id)}>
              <summary className="font-medium cursor-pointer text-gray-900 flex items-center justify-between">
                {faq.question}
                <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}