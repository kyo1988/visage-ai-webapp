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
const en = JSON.parse(read('messages/en.json'));
const ja = JSON.parse(read('messages/ja.json'));
const copy = en.landing.consumerApp;
const destination = 'https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785?ppid=2e97fead-211e-4219-a353-5ec1246b3730&pt=127999842&ct=owned-web-pvf-oct26&mt=8';

function load(file, imports = {}, globals = {}) {
  const module = { exports: {} };
  const js = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(js, {
    module, exports: module.exports, URLSearchParams,
    process: { env: { NEXT_PUBLIC_GA_ID: 'G-QA-LOCAL-ONLY' } },
    console: { log() {}, warn() {} },
    require: (name) => name in imports ? imports[name] : require(name),
    ...globals,
  }, { filename: file });
  return module.exports;
}

function elements(node, found = []) {
  if (Array.isArray(node)) { node.forEach((child) => elements(child, found)); return found; }
  if (!React.isValidElement(node)) return found;
  if (typeof node.type === 'function') return elements(node.type(node.props), found);
  found.push(node);
  elements(node.props.children, found);
  return found;
}

function page(track = () => {}, utms = {}) {
  return load('app/app/page.tsx', {
    'next/image': { __esModule: true, default: ({ priority: _priority, ...props }) => React.createElement('img', props) },
    '@/messages/en.json': en,
    '@/app/lib/analytics': { track },
    '@/app/lib/utm-capture': { getCurrentUtms: () => utms },
  }).default();
}

test('Product Value First hero, primary CTA and ordered product story render without hiding existing content', () => {
  const tree = page();
  const all = elements(tree);
  assert.equal(all.filter((el) => el.type === 'h1').length, 1);
  assert.equal(all.find((el) => el.type === 'h1').props.children, 'One photo. One clear skincare priority.');
  const html = renderToStaticMarkup(tree);
  const order = [copy.step1Title, copy.step2Title, copy.step3Title, copy.journeyTitle, copy.trustTitle];
  for (let i = 1; i < order.length; i++) assert.ok(html.indexOf(order[i - 1]) < html.indexOf(order[i]));
  assert.ok(html.includes(copy.freeLabel));
  assert.ok(all.some((el) => el.type === 'a' && el.props.href === '/en/privacy'));
  assert.ok(all.some((el) => el.type === 'a' && el.props.href === '/en'));
});

test('copy distinguishes category presence, priority and measured comparison from efficacy claims', () => {
  assert.match(copy.step3Body, /category being checked may be different from Today's Priority/);
  assert.match(copy.step3Body, /If a saved-category gap is confirmed and an eligible product is available/);
  for (const action of ['Not now', 'Save', 'Buy online']) assert.ok(copy.step3Body.includes(action));
  assert.match(copy.routineLimit, /category presence only/);
  for (const limit of ['ingredient compatibility', 'product effectiveness', 'consistent use', 'whole routine']) assert.ok(copy.routineLimit.includes(limit));
  assert.match(copy.screenDisclosure, /example results and products, not a customer analysis/);
  assert.match(copy.journeyBody, /not a promise of improvement/);
  assert.equal(copy.trustMedical, 'Beauty guidance, not medical diagnosis');
});

test('both CTA entrances preserve canonical destination and existing event payload with QA UTMs', () => {
  const events = [];
  const utms = { utm_source: 'qa', utm_medium: 'manual', utm_campaign: 'b1_lp_20261020', utm_term: 'consent_accept', utm_content: 'hero' };
  const links = elements(page((...args) => events.push(args), utms)).filter((el) => el.props['data-analytics-id'] === 'app_store_cta_click');
  assert.equal(links.length, 2);
  links.forEach((link, i) => {
    assert.equal(link.props.href, destination);
    assert.equal(link.props.children, copy.appStoreCta);
    assert.equal(link.props.target, '_blank');
    assert.match(link.props.rel, /noopener/);
    link.props.onClick();
    assert.equal(events[i][0], 'app_store_cta_click');
    assert.deepEqual(JSON.parse(JSON.stringify(events[i][1])), { from: i === 0 ? 'hero' : 'closing', page: '/app', ...utms });
  });
});

test('existing UTM capture survives navigation without sending QA or user identifiers into the fixed App Store URL', () => {
  const storage = new Map();
  const window = { location: { search: '?utm_source=qa&utm_medium=manual&utm_campaign=b1_lp_20261020&utm_content=qa_test&diagnosisId=not-forwarded' } };
  const utm = load('app/lib/utm-capture.ts', {}, { window, sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) } });
  utm.captureUtms();
  window.location.search = '';
  assert.equal(utm.getCurrentUtms().utm_campaign, 'b1_lp_20261020');
  assert.equal(utm.getCurrentUtms().diagnosisId, undefined);
  assert.deepEqual([...new URL(destination).searchParams.keys()], ['ppid', 'pt', 'ct', 'mt']);
});

for (const choice of ['granted', 'denied']) {
  test(`PR #47 consent ${choice} is immediately queued as Arguments, persists and closes`, () => {
    const storage = new Map();
    const window = { dataLayer: [] };
    let visible = false;
    const effects = [];
    const Banner = load('app/app/AppCookieBanner.tsx', {
      react: { useState: () => [visible, (next) => { visible = next; }], useEffect: (effect) => effects.push(effect) },
    }, { window, localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) } }).default;
    assert.equal(Banner(), null);
    effects.shift()();
    assert.equal(visible, true);
    const button = elements(Banner()).filter((el) => el.type === 'button').find((el) => el.props.children === (choice === 'granted' ? 'Accept' : 'Decline'));
    button.props.onClick();
    assert.equal(visible, false);
    assert.equal(storage.get('ga_consent'), choice);
    const command = window.dataLayer.at(-1);
    assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
    assert.equal(command[0], 'consent');
    assert.equal(command[1], 'update');
    assert.equal(command[2].analytics_storage, choice);
    assert.equal(command[2].ad_storage, choice);
    assert.equal(Banner(), null);
  });
}

test('CTA dispatch still reaches the existing GA4 gtag adapter', () => {
  const calls = [];
  const window = { gtag: (...args) => calls.push(args) };
  const ga = load('app/lib/gtag.ts', {}, { window });
  const dispatched = [];
  window.dispatchEvent = (event) => dispatched.push(event);
  const analytics = load('app/lib/analytics.ts', { './gtag': ga }, { window, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } } });
  const links = elements(page(analytics.track, { utm_source: 'qa' })).filter((el) => el.props['data-analytics-id'] === 'app_store_cta_click');
  links[0].props.onClick();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'event');
  assert.equal(calls[0][1], 'app_store_cta_click');
  assert.equal(calls[0][2].utm_source, 'qa');
  assert.equal(dispatched[0].detail.id, 'app_store_cta_click');
});

test('EN/JA new copy has complete key parity without replacing localized site messages', () => {
  assert.deepEqual(Object.keys(copy).sort(), Object.keys(ja.landing.consumerApp).sort());
  for (const [key, value] of Object.entries(ja.landing.consumerApp)) {
    assert.equal(typeof value, 'string');
    assert.ok(value.length > 0);
    if (!['step2Eyebrow', 'step3Eyebrow'].includes(key)) assert.notEqual(value, copy[key]);
  }
  assert.ok(ja.nav.product.includes('製品') || ja.nav.product.includes('プロダクト'));
  assert.ok(en.nav.product);
});

test('assessment and priority precede routine; only shortlisted device captures render', () => {
  const tree = page();
  const all = elements(tree);
  const headings = all.filter((el) => el.type === 'h3').map((el) => el.props.children);
  assert.deepEqual(headings.slice(0, 3), ['Start with a photo', 'See your priority', 'Check your routine']);
  const images = all.filter((el) => el.type === 'img');
  assert.deepEqual(images.map((el) => el.props.src), [
    '/images/app-landing/496/todays-priority.png',
    '/images/app-landing/496/routine-check.png',
    '/images/app-landing/496/skin-journey.png',
  ]);
  assert.deepEqual(images.map((el) => [el.props.width, el.props.height]), [[1086, 660], [1080, 970], [1146, 2355]]);
  assert.ok(images.every((el) => el.props.alt.length > 20));
  const html = renderToStaticMarkup(tree);
  assert.ok(html.indexOf(copy.step3Title) < html.indexOf(copy.productPhilosophy));
  assert.ok(html.includes('based on available measurements'));
  assert.ok(html.includes('Choosing not to buy is valid.'));
  assert.ok(html.includes('not the My Routine editor'));
  assert.ok(html.includes('not evidence of skin improvement'));
  assert.ok(!html.includes('Analyze Again'));
});

test('Product Value First metadata is aligned without a placeholder share image', () => {
  const { metadata } = load('app/app/layout.tsx', {
    'next/script': { __esModule: true, default: () => null },
    './AppCookieBanner': { __esModule: true, default: () => null },
  }, { URL });
  assert.equal(metadata.title, 'Visage AI — One photo. One clear skincare priority.');
  assert.equal(metadata.openGraph.title, metadata.title);
  assert.equal(metadata.twitter.title, metadata.title);
  assert.equal(metadata.openGraph.description, metadata.description);
  assert.equal(metadata.twitter.description, metadata.description);
  assert.match(metadata.description, /suggested priority/);
  assert.match(metadata.description, /separately checks saved product categories, which may differ/);
  assert.equal(metadata.openGraph.images, undefined);
  assert.equal(metadata.twitter.images, undefined);
  assert.equal(metadata.twitter.card, 'summary');
  assert.ok(!read('app/app/layout.tsx').includes('/og.jpg'));
});
