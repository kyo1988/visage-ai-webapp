'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

type Props = { locale: 'ja' | 'en' | string };

export default function SidebarNav({ locale }: Props) {
  const pathname = usePathname();
  const base = `/${locale}/docs`;
  const isJa = locale === 'ja';

  const nav = [
    { href: `${base}`, ja: 'ドキュメント概要', en: 'Overview' },
    { href: `${base}/sdk-js`, ja: 'JavaScript SDK', en: 'JavaScript SDK' },
    { href: `${base}/sdk-swift`, ja: 'Swift SDK', en: 'Swift SDK' },
    { href: `${base}/sdk-kotlin`, ja: 'Kotlin SDK', en: 'Kotlin SDK' },
    { href: `${base}/security`, ja: 'セキュリティ', en: 'Security' }
  ];

  return (
    <nav className="flex flex-col gap-2">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm ${
              active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            {isJa ? item.ja : item.en}
          </Link>
        );
      })}
    </nav>
  );
}
