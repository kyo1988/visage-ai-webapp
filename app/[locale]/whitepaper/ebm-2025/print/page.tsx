import { loadWhitepaperContent, markdownToHtml } from '@/app/lib/markdown';

export default async function WhitepaperPrintPage({
  params: { locale }
}: {
  params: { locale: 'ja' | 'en' };
}) {
  const messages = (await import(`../../../../../messages/${locale}.json`)).default as any;
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
    <div className="min-h-screen bg-white print:bg-white">
      {/* Print-specific styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body {
              margin: 0;
              padding: 0;
              font-size: 12pt;
              line-height: 1.4;
            }
            
            .print-page {
              page-break-after: always;
              margin: 20mm;
              padding: 0;
            }
            
            .print-page:last-child {
              page-break-after: avoid;
            }
            
            h1 {
              font-size: 24pt;
              margin-bottom: 20pt;
              color: #1f2937;
            }
            
            h2 {
              font-size: 18pt;
              margin-bottom: 15pt;
              margin-top: 20pt;
              color: #374151;
            }
            
            h3 {
              font-size: 14pt;
              margin-bottom: 10pt;
              margin-top: 15pt;
              color: #4b5563;
            }
            
            p {
              margin-bottom: 10pt;
              text-align: justify;
            }
            
            ul, ol {
              margin-bottom: 15pt;
              padding-left: 20pt;
            }
            
            li {
              margin-bottom: 5pt;
            }
            
            .print-header {
              border-bottom: 2pt solid #3b82f6;
              padding-bottom: 10pt;
              margin-bottom: 20pt;
            }
            
            .print-footer {
              border-top: 1pt solid #e5e7eb;
              padding-top: 10pt;
              margin-top: 20pt;
              font-size: 10pt;
              color: #6b7280;
            }
            
            .print-chart {
              max-width: 100%;
              height: auto;
              margin: 15pt 0;
              border: 1pt solid #e5e7eb;
            }
            
            .no-print {
              display: none;
            }
          }
        `
      }} />

      {/* Cover Page */}
      <div className="print-page">
        <div className="print-header">
          <h1 className="text-center">{t('whitepaper.title')}</h1>
          <p className="text-center text-lg">{t('whitepaper.subtitle')}</p>
          <p className="text-center text-base text-gray-600">{t('whitepaper.description')}</p>
        </div>
        
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.cover) }}
        />
        
        <div className="print-footer">
          <p className="text-center">
            Visage AI Consulting • September 2025 • Executive Preview v0.1
          </p>
        </div>
      </div>

      {/* TL;DR Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.tldr) }}
        />
      </div>

      {/* Architecture Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.architecture) }}
        />
        
        {/* Pipeline Diagram */}
        <div className="my-8">
          <img 
            src="/whitepaper/ebm-2025/assets/pipeline.svg" 
            alt="Evidence-Based Marketing Pipeline"
            className="print-chart"
          />
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.caseStudies) }}
        />
        
        {/* Quantile Bands Chart */}
        <div className="my-8">
          <img 
            src="/whitepaper/ebm-2025/assets/quantile-bands.svg" 
            alt="Conversion Rate Improvement Distribution"
            className="print-chart"
          />
        </div>
      </div>

      {/* Implementation Guide Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.reproduction) }}
        />
      </div>

      {/* Decision Bridge Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.decisionBridge) }}
        />
      </div>

      {/* Legal Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.legal) }}
        />
      </div>

      {/* Print Button (hidden in print) */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
        >
          Print Document
        </button>
      </div>
    </div>
  );
}
