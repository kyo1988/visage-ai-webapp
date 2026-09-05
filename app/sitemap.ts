import type {MetadataRoute} from 'next';
import { b2cSearchPages } from '@/content/b2c-search-pages';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.visageaiconsulting.com';
  const paths = [
    '/', '/ja', '/en', '/app',
    '/ja/docs','/ja/docs/sdk-js','/ja/docs/sdk-swift','/ja/docs/sdk-kotlin','/ja/docs/security',
    '/en/docs','/en/docs/sdk-js','/en/docs/sdk-swift','/en/docs/sdk-kotlin','/en/docs/security',
    '/ja/pricing','/en/pricing','/ja/demo','/en/demo',
    '/ja/privacy','/en/privacy',
    '/learn', ...b2cSearchPages.map(p => `/learn/${p.slug}`)
  ];
  const now = new Date();
  return paths.map(p=>({ url: base + p, lastModified: now, changeFrequency:'weekly', priority: p==='/ja'||p==='/en'||p==='/app'?0.9:0.7 }));
}
