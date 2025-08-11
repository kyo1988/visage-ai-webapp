'use client';

import { useTranslations } from '@/app/lib/intl';
import Link from 'next/link';

const FloatingCta = () => {
  const t = useTranslations('FloatingCta');
  const handleDemoClick = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'cta_click',
      cta_name: 'demo_booked_floating',
    });
  };

  return (
    <Link
      href="[YOUR_CAL_COM_URL]"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-white shadow-lg transition-transform duration-300 hover:scale-105"
      onClick={handleDemoClick}
    >
      <span className="font-semibold">{t('text')}</span>
    </Link>
  );
};

export default FloatingCta;