import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// B2B suspension (2026-11-18, owner-approved):
// Visage AI focuses on the consumer iPhone app. B2B pages are temporarily
// suspended WITHOUT deleting their sources, so B2B can resume by removing
// the rules below.
// - `/`, `/en`, `/ja` -> temporary 302 redirect to `/app`
// - B2B routes -> suspension notice with HTTP 404
// - `/api/demo-request`, `/api/whitepaper/submit` -> 410 Gone; the route
//   handlers never run, so no email is sent and nothing is stored
// - Legacy unprefixed redirects for kept pages (/privacy, /dsr, /contact)
//   are preserved from the previous middleware.

const LOCALES: readonly string[] = ['en', 'ja'];

// First path segment (after an optional locale prefix) of suspended routes.
const SUSPENDED_SEGMENTS = new Set([
  'cases',
  'product',
  'technology',
  'pricing',
  'demo',
  'recommendation-demo',
  'docs',
  'guide',
  'practices',
  'inbound-retail',
  'whitepaper',
  'store-demo',
  'direct-view',
  'security', // legacy unprefixed alias family for docs/security
]);

const STOPPED_APIS = new Set(['/api/demo-request', '/api/whitepaper/submit']);

// Unprefixed paths that keep their legacy 308 redirect to the /ja version.
const KEPT_UNPREFIXED = /^\/(privacy|dsr|contact)(\/|$)/;

function suspensionNotice(locale: string): NextResponse {
  const ja = locale === 'ja';
  const title = ja
    ? '法人向けサービスは一時休止しています'
    : 'Business services are temporarily suspended';
  const body = ja
    ? 'Visage AI は現在、消費者向けiPhoneアプリ「Visage AI: Skin Advisor」に注力しています。法人向け（B2B）サービスは一時休止中です。'
    : 'Visage AI is currently focused on our consumer iPhone app, Visage AI: Skin Advisor. Business (B2B) services are temporarily suspended.';
  const cta = ja ? 'アプリのページへ' : 'Go to the app page';
  const html = `<!doctype html>
<html lang="${ja ? 'ja' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} | Visage AI</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 48px 24px; color: #292723; background: #fbfaf7;">
<main style="max-width: 640px; margin: 0 auto;">
<h1 style="font-size: 24px; line-height: 1.4;">${title}</h1>
<p style="font-size: 15px; line-height: 1.8; color: #55504a;">${body}</p>
<p style="margin-top: 24px;"><a href="/app" style="color: #1f4fd8;">${cta} →</a></p>
</main>
</body>
</html>`;
  return new NextResponse(html, {
    status: 404,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const p = url.pathname;

  // Stop form-submission APIs first: the handlers never run.
  if (STOPPED_APIS.has(p)) {
    return NextResponse.json(
      { error: 'gone', message: 'Submissions are temporarily suspended.' },
      { status: 410 }
    );
  }

  // Top entry points -> the consumer app landing page (temporary redirect,
  // exact matches only so kept sub-pages are never caught).
  if (p === '/' || p === '/en' || p === '/ja' || p === '/en/' || p === '/ja/') {
    url.pathname = '/app';
    url.search = '';
    return NextResponse.redirect(url, 302);
  }

  const segments = p.split('/').filter(Boolean);
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0]);
  // Unprefixed legacy paths behaved as Japanese; keep that convention.
  const locale = hasLocale ? segments[0] : 'ja';
  const rest = hasLocale ? segments.slice(1) : segments;

  // Suspended B2B routes (locale-prefixed and unprefixed alike).
  if (rest.length > 0 && SUSPENDED_SEGMENTS.has(rest[0])) {
    return suspensionNotice(locale);
  }

  // Legacy behaviour for kept pages: /privacy, /dsr, /contact -> /ja/...
  if (!hasLocale && KEPT_UNPREFIXED.test(p)) {
    url.pathname = '/ja' + p;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|og.jpg|.*\\..*).*)'],
};
