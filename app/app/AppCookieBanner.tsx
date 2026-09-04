"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ga_consent";

type ConsentValue = "granted" | "denied";

function gtag(...args: any[]) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(args);
}

// English-only consent banner scoped to /app. The shared CookieBanner
// component (used by /en and /ja) is hardcoded in Japanese with no
// locale switching, so it is not reused here rather than showing
// Japanese legal text on an English-only consumer page.
export default function AppCookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
  }, []);

  function applyConsent(value: ConsentValue) {
    gtag("consent", "update", {
      analytics_storage: value,
      ad_storage: value,
    });
    localStorage.setItem(CONSENT_KEY, value);
  }

  function accept() {
    applyConsent("granted");
    setVisible(false);
  }

  function decline() {
    applyConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[9999] mx-auto flex max-w-md flex-col gap-3 rounded-2xl bg-[#231C38]/95 px-5 py-4 text-xs text-[#f0f0f0] shadow-lg backdrop-blur sm:inset-x-auto sm:right-4"
    >
      <p className="leading-relaxed">
        This site uses Google Analytics to understand visitor behavior. See
        our{" "}
        <a href="/en/privacy" className="underline hover:text-white">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex shrink-0 justify-end gap-2">
        <button
          onClick={decline}
          className="rounded-lg border border-white/30 px-3 py-1.5 text-xs hover:bg-white/10"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="rounded-lg bg-[#5F46BE] px-3 py-1.5 text-xs font-semibold hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
