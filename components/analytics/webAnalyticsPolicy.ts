/** Strict allowlist for public marketing pageviews. Not app First Analysis. */
export const CANONICAL_WEB_ORIGIN = "https://www.visageaiconsulting.com";

export function permitsMarketingAnalytics(
  gaConsent: string | null,
  vercelConsent: string | null,
  isProduction: boolean,
  currentOrigin: string,
): boolean {
  return (
    isProduction &&
    currentOrigin === CANONICAL_WEB_ORIGIN &&
    gaConsent === "granted" &&
    vercelConsent === "granted"
  );
}

export function sanitizeMarketingPageUrl(
  rawUrl: string,
  currentOrigin: string,
): string | null {
  if (currentOrigin !== CANONICAL_WEB_ORIGIN) return null;

  try {
    const url = new URL(rawUrl, currentOrigin);
    if (url.origin !== CANONICAL_WEB_ORIGIN) return null;
    const path = url.pathname;

    // Do not allow the entire /app namespace: future routes can be private.
    const permitted =
      path === "/app" ||
      path === "/app/" ||
      path === "/learn" ||
      path === "/learn/" ||
      /^\/learn\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/.test(path);
    if (!permitted) return null;

    return url.origin + path; // Drop query params and fragments.
  } catch {
    return null;
  }
}

/**
 * No user IDs, campaign tokens or arbitrary custom-event payloads. An event
 * is eligible only after explicit opt-in on a known public marketing page.
 */
export type PublicMarketingClick = "learn_app_cta_click" | "learn_hub_app_cta_click" | "app_store_cta_click";

export function permitsMarketingClick(
  name: PublicMarketingClick,
  rawPageUrl: string,
  gaConsent: string | null,
  vercelConsent: string | null,
  currentOrigin: string,
): boolean {
  // The exact canonical production origin is also the release-scope guard.
  if (!permitsMarketingAnalytics(gaConsent, vercelConsent, true, currentOrigin)) {
    return false;
  }
  const scrubbed = sanitizeMarketingPageUrl(rawPageUrl, currentOrigin);
  if (!scrubbed) return false;
  const path = new URL(scrubbed).pathname;
  if (name === "learn_hub_app_cta_click") {
    return path === "/learn" || path === "/learn/";
  }
  if (name === "learn_app_cta_click") {
    return path.startsWith("/learn/") && path.length > "/learn/".length;
  }
  if (name === "app_store_cta_click") {
    return path === "/app" || path === "/app/";
  }
  return false;
}
