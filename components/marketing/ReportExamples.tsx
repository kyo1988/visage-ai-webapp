'use client';

import Image from 'next/image';
import { useTranslations } from '@/app/lib/intl';

export function ReportExamples() {
  const t = useTranslations('examples');

  const reports = [
    { id: 1, src: '/mock/report-1.png', caption: 'Report Example 1' },
    { id: 2, src: '/mock/report-2.png', caption: 'Report Example 2' },
    { id: 3, src: '/mock/report-3.png', caption: 'Report Example 3' },
  ];

  return (
    <section className="section bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-12">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div key={report.id} className="rounded-brand border border-gray-200 bg-white shadow-sm overflow-hidden">
              <Image
                src={report.src}
                alt={report.caption}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <p className="text-sm text-gray-600 mt-3 p-4">{report.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}