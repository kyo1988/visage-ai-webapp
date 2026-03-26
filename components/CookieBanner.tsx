"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ga_consent";

type ConsentValue = "granted" | "denied";

function gtag(...args: any[]) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(args);
}

export default function CookieBanner() {
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
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1a1a2e",
        color: "#f0f0f0",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 300px" }}>
        当サイトは Google Analytics を使用して訪問者の動向を把握しています。
        同意することで、サービス改善にご協力いただけます。
        詳しくは{" "}
        <a href="/privacy" style={{ color: "#a0c4ff", textDecoration: "underline" }}>
          プライバシーポリシー
        </a>
        をご参照ください。
      </p>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #888",
            background: "transparent",
            color: "#ccc",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          拒否
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          同意する
        </button>
      </div>
    </div>
  );
}
