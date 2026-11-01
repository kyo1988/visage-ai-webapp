import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  CANONICAL_WEB_ORIGIN,
  permitsMarketingAnalytics,
  sanitizeMarketingPageUrl,
} from "../components/analytics/webAnalyticsPolicy.ts";

const SITE = CANONICAL_WEB_ORIGIN;

test("missing consent and historic GA-only consent cannot enable tracking", () => {
  assert.equal(permitsMarketingAnalytics(null, null, true, SITE), false);
  assert.equal(permitsMarketingAnalytics("granted", null, true, SITE), false);
  assert.equal(permitsMarketingAnalytics("granted", "denied", true, SITE), false);
  assert.equal(permitsMarketingAnalytics(null, "granted", true, SITE), false);
  assert.equal(permitsMarketingAnalytics("denied", "granted", true, SITE), false);
});

test("new opt-in is permitted only on the canonical production origin", () => {
  assert.equal(permitsMarketingAnalytics("granted", "granted", true, SITE), true);
  assert.equal(permitsMarketingAnalytics("granted", "granted", false, SITE), false);
  assert.equal(permitsMarketingAnalytics("granted", "granted", true, "https://visage-ai-webapp-9drc.vercel.app"), false);
  assert.equal(permitsMarketingAnalytics("granted", "granted", true, "https://visageaiconsulting.com"), false);
  assert.equal(permitsMarketingAnalytics("granted", "granted", true, "http://www.visageaiconsulting.com"), false);
});

test("revocation immediately makes events ineligible", () => {
  assert.equal(permitsMarketingAnalytics("granted", "granted", true, SITE), true);
  assert.equal(permitsMarketingAnalytics("granted", "denied", true, SITE), false);
  assert.equal(permitsMarketingAnalytics("denied", "denied", true, SITE), false);
});

test("only public pageviews are stripped of query and fragment", () => {
  for (const path of ["/app", "/app/", "/learn", "/learn/", "/learn/how-to-simplify-skincare-routine"]) {
    assert.equal(sanitizeMarketingPageUrl(SITE + path + "?token=SECRET&email=private%40example.com#private", SITE), SITE + path);
  }
});

test("exclude sensitive, noncanonical and future dynamic routes", () => {
  for (const url of [
    SITE + "/report/ab123?token=SECRET",
    SITE + "/api/analysis",
    SITE + "/app/private",
    SITE + "/app/health",
    SITE + "/learn/draft/internal",
    SITE + "/learn/%2e%2e/report",
    SITE + "/en/privacy",
    "https://example.com/app",
    "http://www.visageaiconsulting.com/app",
    SITE + "/learn/my%2fsecret",
    "javascript:alert(1)",
    SITE + "/learn/my_secret",
    SITE + "/learn/🙂",
  ]) {
    assert.equal(sanitizeMarketingPageUrl(url, SITE), null, url);
  }
});

test("preview, HTTP and other origins cannot submit pageviews", () => {
  assert.equal(sanitizeMarketingPageUrl("/app", "https://visage-ai-webapp-9drc.vercel.app"), null);
  assert.equal(sanitizeMarketingPageUrl("/app", "http://www.visageaiconsulting.com"), null);
  assert.equal(sanitizeMarketingPageUrl("/app", SITE), SITE + "/app");
});
