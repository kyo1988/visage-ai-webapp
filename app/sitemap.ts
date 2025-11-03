import type {MetadataRoute} from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://example.com';
  const paths = [
    '/', '/ja', '/en',
    '/ja/docs','/ja/docs/sdk-js','/ja/docs/sdk-swift','/ja/docs/sdk-kotlin','/ja/docs/security',
    '/en/docs','/en/docs/sdk-js','/en/docs/sdk-swift','/en/docs/sdk-kotlin','/en/docs/security',
    '/ja/pricing','/en/pricing','/ja/demo','/en/demo',
    '/ja/privacy','/en/privacy'
  ];
  const now = new Date();
  return paths.map(p=>({ url: base + p, lastModified: now, changeFrequency:'weekly', priority: p==='/ja'||p==='/en'?0.9:0.7 }));
}
