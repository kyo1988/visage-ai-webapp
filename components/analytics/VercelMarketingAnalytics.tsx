"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import {
  permitsMarketingAnalytics,
  sanitizeMarketingPageUrl,
} from "./webAnalyticsPolicy";

const CONSENT_EVENT = "visage:web-analytics-consent-changed";

export default function VercelMarketingAnalytics({
  deploymentIsProduction,
}: {
  deploymentIsProduction: boolean;
}) {
  const [consented, setConsented] = useState(false);

  // This repo deploys to several Vercel projects. Restrict analytics to the
  // single canonical hostname and never load the SDK in other projects.
  const isAllowedNow = () => {
    if (typeof window === "undefined") return false;
    try {
      return permitsMarketingAnalytics(
        localStorage.getItem("ga_consent"),
        localStorage.getItem("va_consent_v1"),
        deploymentIsProduction,
        window.location.origin,
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const update = () => setConsented(isAllowedNow());
    update();
    window.addEventListener("storage", update);
    window.addEventListener(CONSENT_EVENT, update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener(CONSENT_EVENT, update);
    };
  }, [deploymentIsProduction]);

  const beforeSend = (event: BeforeSendEvent): BeforeSendEvent | null => {
    // Re-check consent after revocation; the SDK may already be loaded.
    if (!isAllowedNow()) return null;
    const url = sanitizeMarketingPageUrl(event.url, window.location.origin);
    if (!url) return null;
    return { ...event, url };
  };

  if (!consented) return null;
  return <Analytics beforeSend={beforeSend} />;
}
