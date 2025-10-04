import { Suspense } from 'react';
import { loadWhitepaperContent, markdownToHtml } from '@/app/lib/markdown';
import WhitepaperForm from './WhitepaperForm';

export default async function WhitepaperPage({
  params: { locale }
}: {
  params: { locale: 'ja' | 'en' };
}) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default as any;
  const content = await loadWhitepaperContent();
  
  // Helper function to get translations
  const t = (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t('whitepaper.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-2">
            {t('whitepaper.subtitle')}
          </p>
          <p className="text-lg text-blue-200 mb-8">
            {t('whitepaper.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#download"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t('whitepaper.downloadCta')}
            </a>
            <a
              href={`/${locale}/whitepaper/ebm-2025/print`}
              className="inline-block bg-transparent text-white border-2 border-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all"
            >
              {t('whitepaper.printVersion')}
            </a>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cover Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.cover) }}
              />
            </div>
          </section>

          {/* TL;DR Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.tldr')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.tldr) }}
              />
            </div>
          </section>

          {/* Architecture Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.architecture')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.architecture) }}
              />
              
              {/* Pipeline Diagram */}
              <div className="my-8">
                <img 
                  src="/whitepaper/ebm-2025/assets/pipeline.svg" 
                  alt="Evidence-Based Marketing Pipeline"
                  className="w-full h-auto rounded-lg border"
                />
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.caseStudies')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.caseStudies) }}
              />
              
              {/* Quantile Bands Chart */}
              <div className="my-8">
                <img 
                  src="/whitepaper/ebm-2025/assets/quantile-bands.svg" 
                  alt="Conversion Rate Improvement Distribution"
                  className="w-full h-auto rounded-lg border"
                />
              </div>
            </div>
          </section>

          {/* Implementation Guide Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.reproduction')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.reproduction) }}
              />
            </div>
          </section>

          {/* Decision Bridge Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.decisionBridge')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.decisionBridge) }}
              />
            </div>
          </section>

          {/* Legal Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {t('whitepaper.sections.legal')}
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content.legal) }}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Download Form Section */}
      <section id="download" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('whitepaper.formTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('whitepaper.formDescription')}
            </p>
            <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
              <WhitepaperForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
