'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from '@/app/lib/intl';
import { LocaleSwitcher } from '../common/LocaleSwitcher';
import { DemoButton } from '../common/DemoButton';

export function StickyHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${locale}`} aria-label="Visage AI" className="block h-8">
              <Image
                src="/logo.png"
                alt="Visage AI"
                width={240}
                height={64}
                className="h-8 w-auto block"
                priority
              />
            </Link>

            <div className="ml-10 hidden lg:flex lg:space-x-8">
              <Link href={`/${locale}/#technology`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {t('product')}
              </Link>
              <Link href={`/${locale}/#cases`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {t('cases')}
              </Link>
              <Link href={`/${locale}/docs`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {t('docs')}
              </Link>
              <Link href={`/${locale}/pricing`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {t('pricing')}
              </Link>
              <Link href={`/${locale}/docs/security`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {t('security')}
              </Link>
            </div>
          </div>
          <div className="ml-10 flex items-center space-x-4">
            <div className="hidden md:inline-flex">
              <DemoButton label={t('demo')} />
            </div>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
