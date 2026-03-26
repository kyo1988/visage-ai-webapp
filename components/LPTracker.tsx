"use client";

/**
 * LPTracker — LP ページに差し込む薄いクライアントコンポーネント
 *
 * 役割:
 *   1. ページロード時に UTM を captureUtms() で sessionStorage へ保存
 *   2. lp_viewed GA4 event を一度だけ送信する
 *   3. CTA ボタンのクリック計測ユーティリティを提供する
 *
 * Server Component の LP ページに <LPTracker /> を埋め込むだけで使える。
 */

import { useEffect } from "react";
import { captureUtms, getCurrentUtms } from "@/app/lib/utm-capture";
import { track } from "@/app/lib/analytics";

type Props = {
  /** GA4 に送る page_id (例: "inbound_retail_cosmetics_lp") */
  pageId: string;
};

export default function LPTracker({ pageId }: Props) {
  useEffect(() => {
    // 1. UTM を sessionStorage に保存
    captureUtms();

    // 1b. landing_page を記録（まだ保存されていない場合のみ初回 URL を保存）
    try {
      if (!sessionStorage.getItem("visage_landing_page")) {
        sessionStorage.setItem("visage_landing_page", window.location.href);
      }
    } catch { /* sessionStorage 不可環境では無視 */ }

    // 2. lp_viewed event（UTM 付き）を一度だけ送信
    const utms = getCurrentUtms();
    track("lp_viewed", {
      page_id: pageId,
      utm_source: utms.utm_source ?? "(none)",
      utm_medium: utms.utm_medium ?? "(none)",
      utm_campaign: utms.utm_campaign ?? "(none)",
      utm_content: utms.utm_content ?? "(none)",
    });
  }, [pageId]);

  return null;
}

/**
 * CTA クリック時に GA4 event を発火するラッパー。
 * サーバーコンポーネントから渡せないため、client component として使う。
 */
export function trackCtaClick(
  ctaId: string,
  destination: string,
  pageId: string
) {
  const utms = getCurrentUtms();
  track("lp_cta_clicked", {
    page_id: pageId,
    cta_id: ctaId,
    destination,
    utm_source: utms.utm_source ?? "(none)",
    utm_medium: utms.utm_medium ?? "(none)",
    utm_campaign: utms.utm_campaign ?? "(none)",
  });
}
