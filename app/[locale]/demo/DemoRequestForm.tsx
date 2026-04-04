"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@/app/lib/analytics";
import { captureUtms, getCurrentUtms } from "@/app/lib/utm-capture";

type Locale = "ja" | "en";

type DemoFormState = {
  name: string;
  storeName: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
};

const defaultState: DemoFormState = {
  name: "",
  storeName: "",
  email: "",
  phone: "",
  industry: "cosmetics",
  message: "",
};

const copy = {
  ja: {
    heading: "無料デモを予約する",
    lead: "30分のオンラインデモで、店頭導入の流れと効果測定方法をご説明します。",
    name: "お名前",
    store: "会社/店舗名",
    email: "メール",
    phone: "電話番号（任意）",
    industry: "業種",
    message: "ご質問（任意）",
    submit: "デモを予約する",
    submitting: "送信中...",
    successTitle: "送信ありがとうございます。",
    successLead:
      "担当者から確認メールを送信しました。続けてご都合の良い日時をお選びください。",
    calendly: "日時を選ぶ（Calendly）",
    fallbackContact: "メールで連絡する",
    phoneTap: "電話で相談する",
    industries: [
      ["cosmetics", "コスメ・化粧品"],
      ["kimono", "着物レンタル・体験"],
      ["souvenir", "土産店"],
      ["clinic", "クリニック・サロン"],
      ["other", "その他"],
    ] as Array<[string, string]>,
    validation: "必須項目を入力してください。",
    error: "送信に失敗しました。時間をおいて再度お試しください。",
  },
  en: {
    heading: "Book a Free Demo",
    lead: "In a 30-minute session we walk through store setup, staff workflow, and KPI tracking.",
    name: "Name",
    store: "Company / Store Name",
    email: "Email",
    phone: "Phone (optional)",
    industry: "Industry",
    message: "Question (optional)",
    submit: "Submit Demo Request",
    submitting: "Submitting...",
    successTitle: "Thanks for your request.",
    successLead: "We sent a confirmation email. Please select your preferred time slot.",
    calendly: "Choose Date & Time (Calendly)",
    fallbackContact: "Contact via Email",
    phoneTap: "Call us",
    industries: [
      ["cosmetics", "Cosmetics / Beauty Retail"],
      ["kimono", "Kimono Rental / Experiences"],
      ["souvenir", "Souvenir Store"],
      ["clinic", "Clinic / Salon"],
      ["other", "Other"],
    ] as Array<[string, string]>,
    validation: "Please fill out required fields.",
    error: "Failed to submit. Please try again later.",
  },
} as const;

export default function DemoRequestForm({
  locale,
  calendlyUrl,
}: {
  locale: Locale;
  calendlyUrl: string;
}) {
  const t = copy[locale];
  const [form, setForm] = useState<DemoFormState>(defaultState);
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [landingPage, setLandingPage] = useState("");
  const [referrer, setReferrer] = useState("");

  useEffect(() => {
    // UTM を sessionStorage に永続化（LP 経由でない直接流入にも対応）
    captureUtms();
    // getCurrentUtms() は URL 優先 → sessionStorage フォールバック
    // LP でキャプチャした UTM がページ遷移後も引き継がれる
    const utms = getCurrentUtms();
    setUtm({
      source:   utms.utm_source   ?? "",
      medium:   utms.utm_medium   ?? "",
      campaign: utms.utm_campaign ?? "",
      content:  utms.utm_content  ?? "",
    });
    // landing_page: 最初の流入 URL を記録する（document.referrer は不正確なため location を使う）
    try {
      if (!sessionStorage.getItem("visage_landing_page")) {
        sessionStorage.setItem("visage_landing_page", window.location.href);
      }
      const stored = sessionStorage.getItem("visage_landing_page");
      setLandingPage(stored || window.location.href);
    } catch {
      setLandingPage(window.location.href);
    }
    // referrer: 直前のページ URL（外部 → デモページ の場合に有効）
    try {
      setReferrer(document.referrer || "");
    } catch { /* ignore */ }
  }, []);

  const scheduleUrl = useMemo(() => calendlyUrl || `/${locale}/contact`, [calendlyUrl, locale]);

  function onChange<K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.storeName.trim() || !form.email.trim()) {
      setError(t.validation);
      return;
    }

    setSubmitting(true);
    try {
      track("demo_request_submitted", {
        industry: form.industry,
        source: utm.source || "(none)",
        medium: utm.medium || "(none)",
        campaign: utm.campaign || "(none)",
      });

      // UTM / HubSpot fields: server side (route.ts) が submitToHubSpot() で送信済み
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          ...form,
          // UTM attribution
          utmSource:   utm.source,
          utmMedium:   utm.medium,
          utmCampaign: utm.campaign,
          utmContent:  utm.content,
          // HubSpot hidden fields
          landingPage,   // hs_analytics_first_url
          referrer,      // document.referrer — channel attribution fallback
          // locale は既に含まれる
        }),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("[demo] submit failed", err);
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-900">{t.successTitle}</h2>
        <p className="mt-2 text-sm text-emerald-800">{t.successLead}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("demo_scheduled", {
                industry: form.industry,
                source: utm.source || "(none)",
                medium: utm.medium || "(none)",
                campaign: utm.campaign || "(none)",
              })
            }
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {t.calendly}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center rounded-lg border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
          >
            {t.fallbackContact}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <h1 className="text-2xl font-semibold text-slate-900">{t.heading}</h1>
      <p className="mt-2 text-sm text-slate-600">{t.lead}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          {t.name}
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          {t.store}
          <input
            type="text"
            required
            value={form.storeName}
            onChange={(e) => onChange("storeName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          {t.email}
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          {t.phone}
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          {t.industry}
          <select
            value={form.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {t.industries.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700 md:col-span-2">
          {t.message}
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t.submitting : t.submit}
        </button>
        <a
          href="tel:+81-80-1180-8294"
          onClick={() => track("phone_tap", { page: `/${locale}/demo` })}
          className="text-sm font-medium text-sky-700 hover:underline"
        >
          {t.phoneTap}
        </a>
      </div>
    </form>
  );
}
