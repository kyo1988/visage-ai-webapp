import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
function load(file, env = {}, imports = {}) {
 const module = {exports:{}};
 const js = ts.transpileModule(read(file), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(js,{module,exports:module.exports,process:{env},require:n=>imports[n]??require(n),Date});
 return module.exports;
}
const source = load('content/b2c-search-pages.ts');
const pages = source.b2cSearchPages;

test('six existing slugs, hypothesis taxonomy and related-page graph remain intact',()=>{
 assert.deepEqual(JSON.parse(JSON.stringify(pages.map(p=>[p.slug,p.hypothesis]))),[
 ['is-my-skincare-routine-enough','H4'],['do-i-need-another-skincare-product','H2'],['how-to-simplify-skincare-routine','H4'],['is-my-skincare-routine-too-complicated','H4'],['how-to-track-skincare-routine-progress','H3'],['skincare-checklist-before-buying','H2']]);
 for(const p of pages){assert.equal(source.getB2CSearchPage(p.slug),p);assert.equal(source.getRelatedPages(p).length,p.relatedSlugs.length);assert.ok(p.sections.length>=4);assert.ok(p.faqs.length>=3)}
});

test('every acquisition CTA introduces a photo-based suggested priority rather than promising coverage',()=>{
 for(const p of pages){assert.match(p.cta.body,/photo/i);assert.match(p.cta.body,/suggested priority/i);assert.equal(p.cta.label,'Explore Visage AI');assert.doesNotMatch(p.cta.body,/already covers|checks your current products against|so you know before you buy/i)}
 const c=read('app/learn/LearnCta.tsx');assert.match(c,/href="\/app"/);assert.match(c,/track\("seo_app_cta_click", \{ slug, hypothesis, from: "learn" \}\)/);
});

test('routine and measurement claims preserve product boundaries',()=>{
 for(const p of pages.filter(p=>p.hypothesis!=='H3')){
  const body=JSON.stringify(p);assert.match(body,/category (presence|registration|is registered)/i);assert.match(body,/(does not|not whether|not a reason|not proof|cannot).*(effectiveness|priority|adequate|buy|purchase|sufficient|duplication)/i);
 }
 const progress=JSON.stringify(source.getB2CSearchPage('how-to-track-skincare-routine-progress'));
 assert.match(progress,/does not establish product causation/);assert.match(progress,/keep any routine-change notes separately/);assert.match(progress,/not proof of improvement/);
 const all=JSON.stringify(pages);assert.doesNotMatch(all,/compares your stated priority against|tells you plainly whether it.s already covered|What a routine check can tell you is whether your steps/);
});

test('only approved captures are used with true PNG dimensions and faithful alt text',()=>{
 const allowed=new Set(['todays-priority.png','routine-check.png','skin-journey.png']);
 for(const p of pages){const name=path.basename(p.image.src);assert.ok(allowed.has(name));const b=fs.readFileSync(path.join(root,'public',p.image.src));assert.equal(b.toString('ascii',1,4),'PNG');assert.equal(p.image.width,b.readUInt32BE(16));assert.equal(p.image.height,b.readUInt32BE(20));if(name==='routine-check.png'){assert.match(p.image.alt,/share card/i);assert.doesNotMatch(p.image.alt,/already covers|listing current products/)} }
 const render=read('app/learn/[slug]/page.tsx');assert.match(render,/width=\{page.image.width\}/);assert.match(render,/height=\{page.image.height\}/);
});

test('robots and sitemap use the same configured site origin and safe production fallback',()=>{
 for(const env of [{},{NEXT_PUBLIC_SITE_URL:'https://preview.example.test',NEXT_PUBLIC_BASE_URL:'https://wrong.example.test'}]){
  const robots=load('app/robots.ts',env).default();const sitemap=load('app/sitemap.ts',env,{'@/content/b2c-search-pages':source}).default();const base=env.NEXT_PUBLIC_SITE_URL??'https://www.visageaiconsulting.com';assert.equal(robots.sitemap,base+'/sitemap.xml');assert.ok(sitemap.every(x=>x.url.startsWith(base+'/')));assert.equal(robots.rules[0].allow,'/');for(const p of pages)assert.ok(sitemap.some(x=>x.url===base+'/learn/'+p.slug));
 }
 const render=read('app/learn/[slug]/page.tsx');assert.match(render,/index: true/);assert.match(render,/follow: true/);
});
