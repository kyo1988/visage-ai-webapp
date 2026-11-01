"use client";

import { track as vercelTrack } from "@vercel/analytics";
import {
  permitsMarketingClick,
  type PublicMarketingClick,
} from "./webAnalyticsPolicy";

/**
 * Aggregate-only optional click tracking, alongside legacy GA4 events.
 * Never read or send UTM, userId, analysisId, locale or other custom payloads.
 */
export function trackConsentedMarketingClick(name: PublicMarketingClick): void {
  if (typeof window === "undefined") return;
  try {
    if (!permitsMarketingClick(
      name,
      window.location.href,
      window.localStorage.getItem("ga_consent"),
      window.localStorage.getItem("va_consent_v1"),
      window.location.origin,
    )) return;
    vercelTrack(name);
  } catch {
    // No observable side effects or navigation failure when analytics fails.
  }
}
