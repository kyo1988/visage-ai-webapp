'use client';

import { useTranslations } from '@/app/lib/intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('message')}</p>
    </div>
  );
}