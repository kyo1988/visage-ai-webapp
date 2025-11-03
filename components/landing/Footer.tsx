'use client';

import Link from 'next/link';
import intl from '@/app/lib/intl';

export default function Footer() {
  const t = intl.useTranslations();
  const locale = intl.useLocale();
  const base = `/${locale}`;

  const nav = [
    { href: `${base}`, label: t("footer.sitemap.product") },
    { href: `${base}/cases`, label: t("footer.sitemap.cases") },
    { href: `${base}/docs`, label: t("footer.sitemap.docs") },
    { href: `${base}/pricing`, label: t("footer.sitemap.pricing") },
    { href: `${base}/docs/security`, label: t("footer.sitemap.security") },
    { href: `${base}/privacy`, label: t("footer.sitemap.privacy") }
  ];

  return (
    <footer className="mt-0 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 md:py-10 grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-white font-semibold">Visage AI</div>
          <p className="mt-2 text-sm text-gray-400">{t("footer.tagline")}</p>
          <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} Visage AI</p>
          <div className="mt-4">
            <a
              href="https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-400 hover:text-sky-300"
            >
              → App Store
            </a>
          </div>
        </div>

        <nav>
          <div className="text-white font-medium">{t("footer.sitemap.title")}</div>
          <ul className="mt-3 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="text-white font-medium">{t("footer.follow.title")}</div>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-white" aria-label="X/Twitter">X (Twitter)</a></li>
            <li><a href="#" className="hover:text-white" aria-label="GitHub">GitHub</a></li>
            <li><a href="#" className="hover:text-white" aria-label="LinkedIn">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}