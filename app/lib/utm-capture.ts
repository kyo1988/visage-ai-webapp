const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type UtmParams = Partial<Record<UtmKey, string>>;

const SESSION_KEY = "visage_utms";

/**
 * URLのクエリパラメータからUTMを読み取り sessionStorage に保存する。
 * ページ遷移をまたいでUTMを引き継ぐために使用する。
 * クライアントサイドのみで呼び出すこと。
 */
export function captureUtms(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(found));
  }
}

/**
 * sessionStorage に保存済みの UTM パラメータを返す。
 * 未保存の場合は空オブジェクトを返す。
 */
export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

/**
 * 現在のUTM（URL優先、なければ sessionStorage）を返す。
 * analytics イベントに付与するために使用する。
 */
export function getCurrentUtms(): UtmParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  if (Object.keys(fromUrl).length > 0) return fromUrl;
  return getStoredUtms();
}


/**
 * Consent-preserving, short-lived attribution for the PUBLIC /learn -> /app
 * navigation only. We deliberately do not write identifiers/campaign state
 * before BOTH analytics consents have been granted.
 *
 * This is distinct from legacy B2B utm-capture storage. It never changes the
 * fixed App Store destination, cannot link to an install, and does not send
 * UTM data to the aggregate Vercel analytics provider.
 */
const LEARN_ATTRIBUTION_KEY = "visage_learn_utm_v1";
const LEARN_ATTRIBUTION_TTL_MS = 30 * 60 * 1000;
const SAFE_CAMPAIGN_VALUE = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;

function marketingConsentGranted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      localStorage.getItem("ga_consent") === "granted" &&
      localStorage.getItem("va_consent_v1") === "granted"
    );
  } catch {
    return false;
  }
}

function safeMarketingUtms(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const result: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    // Reject URLs, email addresses, free-text/search phrases, long tracking
    // IDs and other unbounded payloads even with analytics consent.
    if (value && SAFE_CAMPAIGN_VALUE.test(value)) result[key] = value;
  }
  return result;
}

export function captureConsentedLearnUtms(): void {
  if (typeof window === "undefined") return;
  try {
    // Clearing, unlike capturing, is always permitted after consent reversal.
    if (!marketingConsentGranted()) {
      sessionStorage.removeItem(LEARN_ATTRIBUTION_KEY);
      return;
    }
    const utms = safeMarketingUtms(window.location.search);
    if (Object.keys(utms).length === 0) {
      // Do not misattribute an untagged /learn visit to an earlier campaign
      // merely because it happened in the same tab.
      sessionStorage.removeItem(LEARN_ATTRIBUTION_KEY);
      return;
    }
    sessionStorage.setItem(
      LEARN_ATTRIBUTION_KEY,
      JSON.stringify({ utms, capturedAtMs: Date.now() }),
    );
  } catch {
    // Storage denial must never break the acquisition CTA.
  }
}

/**
 * App Store CTA source context only, never inferred installs or first
 * analyses. Pre-consent and expired/stale source state return UNKNOWN ({})
 * rather than last-touch campaign guesses.
 */
export function getConsentedAppUtms(): UtmParams {
  if (!marketingConsentGranted()) return {};
  try {
    const urlUtms = safeMarketingUtms(window.location.search);
    if (Object.keys(urlUtms).length > 0) return urlUtms;
    const raw = sessionStorage.getItem(LEARN_ATTRIBUTION_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const age = Date.now() - parsed.capturedAtMs;
    if (typeof age !== "number" || !Number.isFinite(age) ||
        age < 0 || age > LEARN_ATTRIBUTION_TTL_MS) return {};
    const obj = parsed.utms;
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
    const valid: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = obj[key];
      if (typeof value === "string" && SAFE_CAMPAIGN_VALUE.test(value))
        valid[key] = value;
    }
    return valid;
  } catch {
    return {};
  }
}
