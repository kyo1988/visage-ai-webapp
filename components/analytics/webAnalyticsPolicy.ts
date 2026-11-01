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
