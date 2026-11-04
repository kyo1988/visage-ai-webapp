import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright-core';
// Public-only preview QA; no production changes or customer-data access.
const base=process.env.PREVIEW_BASE_URL;
assert.ok(base && /^https:\/\/[^/?#]+\.vercel\.app$/.test(base));
const dest='artifacts/privacy-preview-qa';
fs.mkdirSync(dest,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const summary=[];
async function goto(page,route){
  const r=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000});
  assert.ok(r);
  assert.equal(r.status(),200,route+' HTTP '+r.status());
  const body=(await page.locator('body').innerText()).slice(0,500);
  assert.ok(!/Vercel Authentication|Deployment Protection|Log in to Vercel/i.test(body),
    'Preview authentication blocks unattended QA');
}
async function privacy(width,height,locale){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await ctx.newPage();
  try{
    if(locale==='en'){
      await goto(page,'/app');
      const decline=page.getByRole('button',{name:/^decline$/i}).first();
      if(await decline.isVisible().catch(()=>false)) await decline.click();
      await page.locator('a[href="/en/privacy"]').first().click();
      await page.waitForURL(u=>u.pathname==='/en/privacy');
    }else{await goto(page,'/'+locale+'/privacy');}
    assert.equal(new URL(page.url()).pathname,'/'+locale+'/privacy');
    assert.equal(await page.locator('header.sticky').count(),0);
    assert.equal(await page.locator('[data-analytics-id="mobile_sticky_cta"]').count(),0);
    assert.equal(await page.locator('#mobile-nav').count(),0);
    const label=locale==='ja'?'Visage AIに戻る':'Back to Visage AI';
    const link=page.getByRole('link',{name:label});
    assert.equal(await link.count(),1);
    assert.equal(await link.getAttribute('href'),'/app');
    assert.ok(await link.isVisible());
    assert.ok(await link.evaluate(e=>{
      const r=e.getBoundingClientRect();
      return r.width>=24 && r.height>=24 && r.top>=0 && r.top<innerHeight;
    }));
    assert.ok(await page.getByText(locale==='ja'?
      '最終更新日: 2026年11月1日':'Last Updated: November 1, 2026').isVisible());
    const body=await page.locator('body').innerText();
    assert.ok(body.includes(locale==='ja'?'データ処理':'on-device'));
    await page.screenshot({path:dest+'/'+locale+'_'+width+'.png'});
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('href')),'/app');
    await page.keyboard.press('Enter');
    await page.waitForURL(u=>u.pathname==='/app');
    summary.push({route:locale+'/privacy',width,height,result:'PASS'});
  }finally{await ctx.close();}
}
async function b2b(width,height,route){
  const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await ctx.newPage();
  try{
    await goto(page,route);
    assert.ok(await page.locator('header.sticky').isVisible(),route+' header missing');
    const cta=page.locator('[data-analytics-id="mobile_sticky_cta"]');
    if(width<768){
      assert.ok(await cta.isVisible(),route+' fixed Demo missing');
      const menu=page.locator('button[aria-controls="mobile-nav"]');
      await menu.click();
      assert.ok(await page.locator('#mobile-nav').isVisible(),route+' menu did not open');
      await menu.click();
      assert.equal(await page.locator('#mobile-nav').count(),0);
    }else{assert.equal(await cta.isVisible(),false);}
    summary.push({route,width,height,result:'PASS'});
  }finally{await ctx.close();}
}
try{
  for(const [width,height] of [[1280,800],[390,844]]){
    for(const locale of ['en','ja']) await privacy(width,height,locale);
    for(const locale of ['en','ja'])
      for(const route of ['/'+locale,'/'+locale+'/pricing','/'+locale+'/demo'])
        await b2b(width,height,route);
  }
  console.log('PREVIEW_BROWSER_QA_PASS '+JSON.stringify(summary));
}finally{await browser.close();}
