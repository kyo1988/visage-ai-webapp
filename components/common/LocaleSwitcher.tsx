'use client';

import {useLocale} from '@/app/lib/intl';
import {usePathname, useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'ja' ? 'en' : 'ja';
    // Remove the current locale from the pathname
    const newPathname = pathname?.startsWith(`/${locale}`) ? pathname.substring(`/${locale}`.length) : pathname || '';

    startTransition(() => {
      router.replace(`/${nextLocale}${newPathname}`);
    });
  };

  return (
    <button onClick={toggleLocale} disabled={isPending}>
      {locale === 'ja' ? 'English' : '日本語'}
    </button>
  );
};