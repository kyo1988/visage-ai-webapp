"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

const VERCEL_CONSENT_KEY = "va_consent_v1";
const CONSENT_EVENT = "visage:web-analytics-consent-changed";

function mayTrack(): boolean {
  try {
    return (
      localStorage.getItem("ga_consent") === "granted" &&
      localStorage.getItem(VERCEL_CONSENT_KEY) === "granted"
    );
  } catch {
    return false;
  }
}

function redactMarketingPage(event: BeforeSendEvent): BeforeSendEvent | null {
  // This callback also enforces consent after revocation, even if a previously
  // loaded analytics script is still present in the browser.
  if (!mayTrack()) return null;
  try {
    const parsed = new URL(event.url, window.location.origin);
    if (parsed.origin !== window.location.origin) return null;
    const path = parsed.pathname;
    const isPublicMarketingPage =
      path === "/app" || path.startsWith("/app/") ||
      path === "/learn" || path.startsWith("/learn/");
    if (!isPublicMarketingPage) return null;
    // Do not send query strings, fragments, personal data or tokens via URL.
    return { ...event, url: parsed.origin + path };
  } catch {
    return null;
  }
}

export default function VercelMarketingAnalytics({
  deploymentIsProduction,
}: {
  deploymentIsProduction: boolean;
}) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const updateConsent = () => setConsented(mayTrack());
    updateConsent();
    window.addEventListener("storage", updateConsent);
    window.addEventListener(CONSENT_EVENT, updateConsent);
    return () => {
      window.removeEventListener("storage", updateConsent);
      window.removeEventListener(CONSENT_EVENT, updateConsent);
    };
  }, []);

  // Never load the analytics script in preview/development or before opt-in.
  if (!deploymentIsProduction || !consented) return null;
  return <Analytics beforeSend={redactMarketingPage} />;
}
