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
            @page { 
              size: A4; 
              margin: 14mm; 
            }
            
            body { 
              font: 12pt/1.5 system-ui; 
              color: #111; 
              margin: 0;
              padding: 0;
            }
            
            h1 { 
              font-size: 22pt; 
              margin: 0 0 8mm; 
              color: #1f2937;
            }
            
            h2 { 
              font-size: 14pt; 
              margin: 6mm 0 3mm; 
              color: #374151;
            }
            
            h3 {
              font-size: 12pt;
              margin: 4mm 0 2mm;
              color: #4b5563;
            }
            
            p {
              margin-bottom: 6pt;
              text-align: justify;
            }
            
            ul, ol {
              margin-bottom: 6pt;
              padding-left: 15pt;
            }
            
            li {
              margin-bottom: 3pt;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 6pt 0;
            }
            
            th, td {
              border: 1pt solid #ddd;
              padding: 4pt;
              text-align: left;
            }
            
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            
            img, pre, code { 
              page-break-inside: avoid; 
            }
            
            .print-page {
              page-break-after: always;
              margin: 0;
              padding: 0;
            }
            
            .print-page:last-child {
              page-break-after: avoid;
            }
            
            .print-header {
              border-bottom: 2pt solid #3b82f6;
              padding-bottom: 6pt;
              margin-bottom: 8mm;
            }
            
            .print-footer {
              border-top: 1pt solid #e5e7eb;
              padding-top: 6pt;
              margin-top: 8mm;
              font-size: 9pt;
              color: #6b7280;
            }
            
            .print-chart {
              max-width: 100%;
              height: auto;
              margin: 6pt 0;
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

      {/* Dirichlet Analysis Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.dirichlet) }}
        />
      </div>

      {/* CEP Analysis Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.cep) }}
        />
      </div>

      {/* Quantile Tails Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.quantileTails) }}
        />
        
        {/* Quantile Bands Chart */}
        <div className="my-8">
          <img 
            src="/whitepaper/ebm-2025/assets/quantile-bands.svg" 
            alt="Quantile Error Analysis: Q1-Q4 Buyer Segmentation"
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
      </div>

      {/* Decision Bridge Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.decisionBridge) }}
        />
      </div>

      {/* Reproduction Checklist Section */}
      <div className="print-page">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content.reproductionChecklist) }}
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
