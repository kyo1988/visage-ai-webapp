'use client';
import { useTranslations } from '@/app/lib/intl';
import { useLocale } from '@/app/lib/intl';
import { track } from '../../app/lib/analytics';

export default function MobileStickyCta() {
  const t = useTranslations('cta');
  const locale = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden px-4 pb-4">
      <a
        href={`/${locale}/demo`}
        className="block rounded-2xl bg-indigo-600 text-white text-center px-5 py-3 text-base font-semibold shadow-lg"
        data-analytics-id="mobile_sticky_cta"
        onClick={() => track('mobile_sticky_cta_click', { page: `/${locale}` })}
      >{t('mobile')}</a>
    </div>
  );
}
