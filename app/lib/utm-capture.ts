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
