"use client";

import Link from "next/link";
import { trackConsentedMarketingClick } from "@/components/analytics/marketingClickTracking";
import { captureConsentedLearnUtms } from "@/app/lib/utm-capture";

/** Public /learn hub CTA. Only sends the allowlisted, consented aggregate click. */
export default function LearnHubCta() {
  return (
    <Link
      href="/app"
      data-analytics-id="learn_hub_app_cta_click"
      onClick={() => {
        captureConsentedLearnUtms();
        trackConsentedMarketingClick("learn_hub_app_cta_click");
      }}
      className="mx-auto mt-7 inline-flex min-h-11 items-center rounded-full border border-[#5F46BE] px-6 py-2.5 text-sm font-semibold text-[#5F46BE] transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5F46BE]"
    >
      Explore Visage AI for iPhone →
    </Link>
  );
}
