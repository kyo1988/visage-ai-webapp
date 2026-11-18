'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from '@/app/lib/intl';
import { LocaleSwitcher } from '../common/LocaleSwitcher';

export function StickyHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu open.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Privacy is a consumer-facing destination, not a B2B sales page.
  // Keep all hooks above this route-specific return unconditionally called.
  if (pathname === '/en/privacy' || pathname === '/ja/privacy') {
    return null;
  }

  // B2B suspension (2026-11-18): navigation now points only to pages that
  // remain public — the consumer app page, the guides, and contact.
  const navItems = [
    { href: '/app', label: t('app') },
    { href: locale === 'ja' ? '/ja/learn' : '/learn', label: t('learn') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/app"
            aria-label="Visage AI"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/logo.png"
              alt="Visage AI"
              width={240}
              height={64}
              className="h-7 w-auto md:h-8"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wide text-slate-600 transition hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 md:inline-flex">
              <LocaleSwitcher />
            </div>

            {/* Mobile controls */}
            <div className="md:hidden">
              <LocaleSwitcher />
            </div>
            <button
              type="button"
              aria-label={open ? t('menuClose') : t('menuOpen')}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
            >
              {open ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-nav"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200/70 pb-28 pt-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className="text-slate-400">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
