import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function component(file, route, locale = 'en') {
  const module = { exports: {} };
  const imports = {
    'next/link': { __esModule: true, default: ({ href, children, ...props }) =>
      React.createElement('a', { href, ...props }, children) },
    'next/image': { __esModule: true, default: () => null },
    'next/navigation': { usePathname: () => route },
    'react': { useEffect: () => {}, useState: () => [false, () => {}] },
    '@/app/lib/intl': {
      useLocale: () => locale,
      useTranslations: () => (name) => ({
        technology: 'Technology', useCases: 'Use Cases', poc: 'PoC',
        pricing: 'Pricing', contact: 'Contact', demo: 'Book a Demo',
        mobile: 'Book a 20-min Demo', menuOpen: 'Open menu', menuClose: 'Close menu',
      })[name] ?? name,
    },
    '@/app/lib/analytics': { track: () => {} },
    '../../app/lib/analytics': { track: () => {} },
    '../common/LocaleSwitcher': { LocaleSwitcher: () => null },
    '../common/DemoButton': { DemoButton: () => React.createElement('span', null, 'Book a Demo') },
  };
  const transpiled = ts.transpileModule(read(file), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(transpiled, {
    module, exports: module.exports, console,
    require: (name) => name in imports ? imports[name] : require(name),
  }, { filename: file });
  return module.exports;
}

test('EN and JA Privacy routes suppress B2B header and mobile fixed demo only', () => {
  for (const locale of ['en', 'ja']) {
    const route = `/${locale}/privacy`;
    assert.equal(component('components/layout/StickyHeader.tsx', route, locale).StickyHeader(), null);
    assert.equal(component('components/layout/MobileStickyCta.tsx', route, locale).default(), null);
  }
});

test('other B2B routes retain their existing sales navigation and mobile CTA', () => {
  for (const locale of ['en', 'ja']) {
    for (const route of [`/${locale}`, `/${locale}/pricing`, `/${locale}/demo`]) {
      const header = renderToStaticMarkup(component('components/layout/StickyHeader.tsx', route, locale).StickyHeader());
      const cta = renderToStaticMarkup(component('components/layout/MobileStickyCta.tsx', route, locale).default());
      assert.match(header, /Technology/);
      assert.match(header, /Pricing/);
      assert.match(header, /Book a Demo/);
      assert.match(cta, /Book a 20-min Demo/);
      assert.match(cta, new RegExp(`href="/${locale}/demo"`));
    }
  }
});

test('Privacy returns to the original B2C /app route in both locales without modifying copy', () => {
  const privacy = component('app/[locale]/privacy/page.tsx', '/en/privacy').default;
  for (const locale of ['en', 'ja']) {
    const html = renderToStaticMarkup(privacy({ params: { locale } }));
    assert.match(html, /href="\/app"/);
    assert.match(html, /focus-visible:outline/);
    assert.match(html, new RegExp(locale === 'ja' ? 'Visage AIに戻る' : 'Back to Visage AI'));
    assert.match(html, new RegExp(locale === 'ja' ? '最終更新日: 2026年11月1日' : 'Last Updated: November 1, 2026'));
    assert.match(html, /mailto:/);
    assert.doesNotMatch(html, /Book a 20-min Demo/);
  }
  assert.match(read('app/app/page.tsx'), /href="\/en\/privacy"/);
});
