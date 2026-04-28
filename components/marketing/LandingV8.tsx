"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/app/lib/analytics";

type Locale = "ja" | "en";

const copy = {
  ja: {
    heroEyebrow: "Visage AI for Inbound Retail",
    heroTitle: "言葉の壁を超える、AI接客パートナー",
    heroLead:
      "インバウンド観光客の肌をAIで解析し、最適な商品提案までを多言語で支援。スタッフの接客力をデータで底上げします。",
    heroPocLink: "PoC協力店舗 募集中",
    heroTrust: [
      "美容・コスメ・観光小売向け",
      "多言語接客 (EN / ZH / KR / JA)",
      "PoC協力店舗 募集中",
    ],
    demo: "無料デモを予約する",
    whitepaper: "資料をダウンロード",
    problemsTitle: "あなたの店舗、こんなお悩みありませんか？",
    problems: [
      "インバウンド客に商品の良さを伝えきれない",
      "スタッフの提案が経験頼みで属人的",
      "店頭体験が「その場限り」で終わってしまう",
    ],
    solutionsTitle: "Visage AI が解決します",
    solutions: [
      "AIが肌を解析し、多言語で商品提案を自動生成",
      "スタッフ向け接客ガイドで提案力を標準化",
      "QRで結果を持ち帰り、Web Viewer経由でEC再購入へ接続",
    ],
    effectsTitle: "導入すると何が変わるか",
    effects: [
      {
        title: "接客データが見える化",
        body: "月次レポートで「何が売れたか」「何を改善すべきか」を定点観測できます。",
      },
      {
        title: "言語の壁がなくなる",
        body: "英・中・韓・日で自動提案。スタッフは日本語ガイドを見るだけで接客できます。",
      },
      {
        title: "客単価が上がる",
        body: "肌状態に基づく根拠のある提案で、高単価商品の提案確度を高めます。",
      },
      {
        title: "旅アトも繋がる",
        body: "QR→Web→EC で帰国後も購入導線を維持し、店頭体験を売上に繋げます。",
      },
    ],
    industryTitle: "業種別の活用イメージ",
    tabs: [
      {
        id: "cosmetics",
        label: "コスメ・化粧品店向け",
        heading: "インバウンド客に、言葉なしで最適なスキンケアを提案",
        bullets: [
          "Skin Transparencyで肌の奥の傾向を可視化",
          "メラニン蓄積傾向に合わせて美白系SKUを優先提案",
          "店舗SKUカタログを登録するだけで接客モードに反映",
        ],
      },
      {
        id: "inbound",
        label: "インバウンド接客全般向け",
        heading: "翻訳アプリでは届かない“提案力”をAIが補完",
        bullets: [
          "パーソナルカラー+肌質を組み合わせて推薦",
          "スタッフ向け接客トークを自動生成",
          "月次レポートで「どの商品が刺さったか」を可視化",
        ],
      },
    ],
    transparencyTitle: "肌の奥が見える「Skin Transparency」",
    transparencyLead:
      "表面からは見えないメラニン蓄積や赤みを可視化し、「なぜこの商品が合うのか」をエビデンスとして提示できます。",
    disclaimer:
      "※ 医療診断ではありません。美容提案の参考情報です。",
    pricingTitle: "PoCプラン（3ヶ月）",
    pricingItems: [
      "初月: セットアップ + 商品登録",
      "2-3ヶ月目: 現場テスト + データ収集",
      "毎月: 分析レポート + 改善提案",
    ],
    pricingNote: "※ 料金詳細はデモ時にご説明します。",
    phoneLabel: "お電話で相談する",
    poc: {
      eyebrow: "PoC協力店舗 募集中",
      title: "訪日客対応の説明負荷を、一緒に検証しませんか",
      lead:
        "Visage AIでは、コスメ・美容・観光関連店舗の皆さまと、訪日客への商品説明や多言語接客をどこまで軽くできるかを検証するPoCを準備しています。導入前提ではなく、まずは現場で困っていることを伺うところから始めます。",
      targetTitle: "こんな店舗・事業者を想定しています",
      target: [
        "訪日客への説明対応が発生する店舗",
        "商品説明や肌悩みヒアリングに時間がかかる店舗",
        "多言語対応をスタッフだけで担うのが難しい店舗",
        "美容・コスメ・着物レンタル・観光関連の事業者",
      ],
      validateTitle: "PoCで検証したいこと",
      validate: [
        "訪日客への説明負荷を減らせるか",
        "スタッフの接客補助として自然に使えるか",
        "店舗オペレーションを大きく変えずに組み込めるか",
      ],
      effortTitle: "ご参加にあたっての想定負担",
      effort: [
        "初回30分のヒアリング（オンライン可）",
        "PoC期間中の簡単なフィードバック",
        "店舗運用・人員体制の大幅な変更は不要",
      ],
      cta: "PoCについて相談する",
      ctaSub: "5分の事前ヒアリングのみでも歓迎です",
      note:
        "現在、初期PoCにご協力いただける店舗・事業者様を少数募集しています。導入前提ではなく、現場課題の確認から始めます。",
    },
  },
  en: {
    heroEyebrow: "Visage AI for Inbound Retail",
    heroTitle: "An AI sales partner for inbound retail",
    heroLead:
      "Visage AI analyzes guest skin conditions and supports multilingual product suggestions, so your staff can deliver consistent consultations.",
    heroPocLink: "Now recruiting pilot stores",
    heroTrust: [
      "For beauty, cosmetics & tourism retail",
      "Multilingual (EN / ZH / KR / JA)",
      "Recruiting pilot stores",
    ],
    demo: "Book a Free Demo",
    whitepaper: "Download Materials",
    problemsTitle: "Common retail challenges",
    problems: [
      "Difficulty explaining product value to inbound guests",
      "Consultation quality depends on individual staff skill",
      "In-store experience ends without follow-up conversion",
    ],
    solutionsTitle: "How Visage AI solves them",
    solutions: [
      "AI analysis + multilingual recommendation support",
      "Staff guide to standardize consultation quality",
      "QR handoff to Web Viewer and EC repurchase flow",
    ],
    effectsTitle: "Business impact",
    effects: [
      {
        title: "Actionable data",
        body: "Monthly reports clarify what sold and what to improve next.",
      },
      {
        title: "Language barrier reduction",
        body: "Suggestions in EN/ZH/KR/JA while staff use Japanese guidance.",
      },
      {
        title: "Higher basket value",
        body: "Evidence-based recommendations improve confidence for premium SKU proposals.",
      },
      {
        title: "OMO continuity",
        body: "QR to Web to EC keeps post-trip purchase opportunities alive.",
      },
    ],
    industryTitle: "Use cases by business type",
    tabs: [
      {
        id: "cosmetics",
        label: "Cosmetics Stores",
        heading: "Recommend the right skincare without language friction",
        bullets: [
          "Visualize hidden trends with Skin Transparency",
          "Prioritize brightening SKUs based on melanin tendency",
          "Inject store SKU catalog without app re-release",
        ],
      },
      {
        id: "inbound",
        label: "Inbound Retail & Experiences",
        heading: "AI augments recommendation quality beyond translation",
        bullets: [
          "Recommend by personal color + skin tendency",
          "Auto-generated staff scripts",
          "Monthly report for SKU-level interest tracking",
        ],
      },
    ],
    transparencyTitle: "Skin Transparency Demo",
    transparencyLead:
      "Visualize hidden melanin and redness tendencies to explain why a recommendation is relevant.",
    disclaimer: "This is for beauty support and not medical diagnosis.",
    pricingTitle: "PoC Plan (3 months)",
    pricingItems: [
      "Month 1: Setup + product catalog onboarding",
      "Month 2-3: In-store trial + data collection",
      "Monthly: Analysis report + improvement proposal",
    ],
    pricingNote: "Pricing details are shared during the demo.",
    phoneLabel: "Call us",
    poc: {
      eyebrow: "Now recruiting pilot stores",
      title: "Help us test AI-assisted support for inbound shoppers",
      lead:
        "Visage AI is preparing small pilot projects with beauty, cosmetics, and tourism-facing stores to validate how AI can support product explanations and multilingual customer interactions. This is not a full rollout request — we start by understanding real store-level challenges.",
      targetTitle: "Who we are looking to talk with",
      target: [
        "Stores that serve inbound travelers",
        "Teams that spend time explaining products or recommendations",
        "Stores where multilingual support depends heavily on staff",
        "Beauty, cosmetics, kimono rental, and tourism-related businesses",
      ],
      validateTitle: "What we want to validate together",
      validate: [
        "Whether AI can reduce explanation load for inbound shoppers",
        "Whether it can support staff naturally during customer interactions",
        "Whether it can fit existing store operations without major workflow changes",
      ],
      effortTitle: "Expected commitment",
      effort: [
        "An initial 30-minute discovery call (remote is fine)",
        "Light feedback during the pilot period",
        "No major changes to store operations or staffing required",
      ],
      cta: "Discuss a pilot",
      ctaSub: "A short 5-minute discovery conversation is welcome",
      note:
        "We are currently looking for a small number of stores or operators to join an early PoC. We start from listening to real on-site challenges, not from a sales pitch.",
    },
  },
} as const;

export default function LandingV8({ locale }: { locale: string }) {
  const lang: Locale = locale === "en" ? "en" : "ja";
  const t = copy[lang];
  const [activeTab, setActiveTab] = useState<"cosmetics" | "inbound">(
    "cosmetics",
  );
  const active = t.tabs.find((tab) => tab.id === activeTab) ?? t.tabs[0];

  // Fire poc_section_view once when the section is at least 50% visible.
  const pocSectionRef = useRef<HTMLElement | null>(null);
  const pocViewedRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = pocSectionRef.current;
    if (!node || pocViewedRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !pocViewedRef.current) {
            pocViewedRef.current = true;
            track("poc_section_view", { locale: lang });
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lang]);

  return (
    <main className="bg-gradient-to-b from-white via-sky-50/30 to-slate-50">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background decorative gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-sky-50/60 via-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-32 -z-10 h-[420px] w-[420px] rounded-full bg-sky-200/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 -z-10 h-[360px] w-[360px] rounded-full bg-rose-200/25 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 backdrop-blur">
                {t.heroEyebrow}
              </div>
              <h1 className="mt-5 text-[34px] font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-[42px] md:text-[52px] md:leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-[1.85] text-slate-600 sm:text-[17px]">
                {t.heroLead}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={`/${lang}/demo`}
                  onClick={() =>
                    track("lp_demo_click", { placement: "hero", locale: lang })
                  }
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.6)] transition hover:from-slate-800 hover:to-slate-700 hover:shadow-[0_10px_28px_-10px_rgba(15,23,42,0.55)]"
                >
                  {t.demo}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href={`/${lang}/whitepaper/ebm-2025`}
                  onClick={() =>
                    track("lp_whitepaper_click", {
                      placement: "hero",
                      locale: lang,
                    })
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  {t.whitepaper}
                </Link>
                <Link
                  href="#poc-recruitment"
                  onClick={() =>
                    track("hero_poc_link_click", { locale: lang })
                  }
                  className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800 hover:underline"
                >
                  {t.heroPocLink}
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <a
                href="tel:+81-80-1180-8294"
                className="mt-5 inline-flex text-sm font-medium text-slate-500 hover:text-slate-700"
                onClick={() => track("phone_tap", { page: `/${lang}` })}
              >
                {t.phoneLabel}
              </a>

              {/* Trust strip */}
              <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 text-xs font-medium text-slate-500">
                {t.heroTrust.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 tracking-wide"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-sky-100/70 via-white to-rose-100/40 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
                  <Image
                    src="/images/hero_inbound_v2.png"
                    alt="Visage AI iPad demo"
                    width={960}
                    height={720}
                    className="w-full object-cover"
                    priority
                  />
                </div>
                <div className="relative -mt-6 ml-8 hidden overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_18px_45px_-25px_rgba(15,23,42,0.3)] sm:block sm:w-[68%]">
                  <Image
                    src="/images/screens/staff_mode_v32.png"
                    alt="Show to Staff screen"
                    width={960}
                    height={720}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS / SOLUTIONS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            01 — Challenge &amp; Approach
          </span>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-7">
          <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50/70 via-white to-white p-7 shadow-sm md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
              Challenges
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-[26px]">
              {t.problemsTitle}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm leading-7 text-slate-700 sm:text-[15px]">
              {t.problems.map((problem) => (
                <li key={problem} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400"
                  />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50/80 via-white to-white p-7 shadow-sm md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700">
              Visage AI Approach
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-[26px]">
              {t.solutionsTitle}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm leading-7 text-slate-700 sm:text-[15px]">
              {t.solutions.map((solution) => (
                <li key={solution} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                  />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== EFFECTS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            02 — Outcomes
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[34px]">
            {t.effectsTitle}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {t.effects.map((effect, idx) => (
            <article
              key={effect.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_14px_36px_-18px_rgba(2,132,199,0.22)] md:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-8 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-[11px] font-semibold tracking-[0.12em] text-white shadow-sm">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 sm:text-[17px]">
                    {effect.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {effect.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== INDUSTRY TABS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            03 — Use Cases
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[34px]">
            {t.industryTitle}
          </h2>
        </div>
        <div
          role="tablist"
          aria-label={t.industryTitle}
          className="mt-8 inline-flex flex-wrap gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm"
        >
          {t.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id as "cosmetics" | "inbound")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm md:p-9">
          <h3 className="text-xl font-semibold leading-snug text-slate-900 sm:text-[22px]">
            {active.heading}
          </h3>
          <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 sm:text-[15px] md:grid-cols-3">
            {active.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 rounded-2xl bg-sky-50/60 p-4"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ===== SKIN TRANSPARENCY ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-sky-50/40 to-rose-50/30 p-7 shadow-sm md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:gap-12 md:items-center">
            <div className="md:col-span-5">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                04 — Technology
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-[32px]">
                {t.transparencyTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-[1.85]">
                {t.transparencyLead}
              </p>
              <p className="mt-5 text-xs leading-6 text-slate-500">
                {t.disclaimer}
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_45px_-25px_rgba(15,23,42,0.25)]">
                  <Image
                    src="/images/screens/analysis_result_en.png"
                    alt="Skin Transparency result example"
                    width={840}
                    height={1180}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_45px_-25px_rgba(15,23,42,0.25)] sm:mt-8">
                  <Image
                    src="/images/screens/staff_card_ja.png"
                    alt="Staff recommendation guide example"
                    width={840}
                    height={1180}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POC RECRUITMENT ===== */}
      <section
        id="poc-recruitment"
        ref={pocSectionRef}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-rose-50/40 p-6 shadow-[0_10px_40px_-20px_rgba(2,132,199,0.25)] sm:p-8 md:p-12">
          {/* Decorative soft blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur">
                05 — Pilot
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                </span>
                {t.poc.eyebrow}
              </span>
            </div>
            <h2 className="mt-5 max-w-3xl text-[26px] font-semibold leading-[1.35] tracking-tight text-slate-900 sm:text-3xl md:text-[34px] md:leading-[1.3]">
              {t.poc.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {t.poc.lead}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {(
                [
                  { num: "01", title: t.poc.targetTitle, items: t.poc.target },
                  {
                    num: "02",
                    title: t.poc.validateTitle,
                    items: t.poc.validate,
                  },
                  { num: "03", title: t.poc.effortTitle, items: t.poc.effort },
                ] as const
              ).map((card) => (
                <article
                  key={card.num}
                  className="group relative rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_12px_30px_-15px_rgba(2,132,199,0.25)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-[11px] font-semibold tracking-wider text-white shadow-sm">
                      {card.num}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {card.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`/${lang}/contact?utm_source=lp&utm_medium=poc_section&utm_campaign=poc_recruitment`}
                onClick={() =>
                  track("poc_cta_click", {
                    placement: "poc_recruitment",
                    locale: lang,
                  })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(15,23,42,0.6)] transition hover:from-slate-800 hover:to-slate-700 hover:shadow-[0_10px_28px_-10px_rgba(15,23,42,0.55)]"
              >
                {t.poc.cta}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <span className="text-xs text-slate-600 sm:ml-1">
                {t.poc.ctaSub}
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-500">
              {t.poc.note}
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRICING / FINAL CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-7 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)] md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:gap-12 md:items-center">
            <div className="md:col-span-7">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200 backdrop-blur">
                06 — PoC Plan
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-[34px]">
                {t.pricingTitle}
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200 sm:text-[15px]">
                {t.pricingItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-6 text-slate-400">
                {t.pricingNote}
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-7">
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/${lang}/demo`}
                    onClick={() =>
                      track("lp_demo_click", {
                        placement: "pricing",
                        locale: lang,
                      })
                    }
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                  >
                    {t.demo}
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={`/${lang}/contact?utm_source=lp&utm_medium=pricing_section&utm_campaign=poc_recruitment`}
                    onClick={() =>
                      track("poc_cta_click", {
                        placement: "pricing_section",
                        locale: lang,
                      })
                    }
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    {t.poc.cta}
                  </Link>
                  <Link
                    href={`/${lang}/whitepaper/ebm-2025`}
                    onClick={() =>
                      track("lp_whitepaper_click", {
                        placement: "pricing",
                        locale: lang,
                      })
                    }
                    className="inline-flex items-center justify-center text-sm font-medium text-sky-200 hover:text-white"
                  >
                    {t.whitepaper}
                    <span aria-hidden className="ml-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
