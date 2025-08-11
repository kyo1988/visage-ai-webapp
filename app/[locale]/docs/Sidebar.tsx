'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';

type Props = { locale: 'ja' | 'en' };

export default function Sidebar({locale}: Props) {
  const pathname = usePathname();
  const base = `/${locale}/docs`;
  const [messages, setMessages] = useState<any>(null);
  
  useEffect(() => {
    import(`../../../messages/${locale}.json`).then(m => setMessages(m.default));
  }, [locale]);

  const nav = [
    { href: `${base}`, key: 'overview' },
    { href: `${base}/sdk-js`, key: 'sdkJs' },
    { href: `${base}/sdk-swift`, key: 'sdkSwift' },
    { href: `${base}/sdk-kotlin`, key: 'sdkKotlin' },
    { href: `${base}/security`, key: 'security' }
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    // トップは完全一致、それ以外は prefix マッチでハイライト
    return href === base ? pathname === href : pathname.startsWith(href);
  };

  if (!messages) {
    return (
      <aside className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-600">
          {locale === 'ja' ? '目次' : 'Contents'}
        </h2>
        <nav className="flex flex-col gap-2">
          <div className="rounded-lg px-3 py-2 text-sm text-slate-400">Loading...</div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-600">
        {locale === 'ja' ? '目次' : 'Contents'}
      </h2>
      <nav className="flex flex-col gap-2">
        {nav.map((item) => {
          const active = isActive(item.href);
          const title = messages.docs.cards[item.key]?.title || item.key;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              ].join(' ')}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
