import type { MetadataRoute } from 'next';
import { b2cSearchPages } from '@/content/b2c-search-pages';

// B2C-focused sitemap (2026-11-18): B2B pages are temporarily suspended
// (see middleware.ts), so only consumer-facing pages are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.visageaiconsulting.com';
  const paths = [
    '/app',
    '/ja/privacy', '/en/privacy',
    '/ja/dsr', '/en/dsr',
    '/ja/contact', '/en/contact',
    '/learn', ...b2cSearchPages.map((p) => `/learn/${p.slug}`),
    '/ja/learn',
    '/ja/learn/skincare-routine-review',
    '/ja/learn/do-i-need-another-skincare-product',
    '/ja/learn/skincare-before-buying-checklist'
  ];
  const now = new Date();
  return paths.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/app' ? 0.9 : 0.7,
  }));
}
