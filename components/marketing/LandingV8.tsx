"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { track } from "@/app/lib/analytics";

type Locale = "ja" | "en";

const copy = {
  ja: {
    heroTitle: "言葉の壁を超える、AI接客パートナー",
    heroLead:
      "インバウンド観光客の肌をAIで解析し、最適な商品提案までを多言語で支援。スタッフの接客力をデータで底上げします。",
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
    heroTitle: "An AI sales partner for inbound retail",
    heroLead:
      "Visage AI analyzes guest skin conditions and supports multilingual product suggestions, so your staff can deliver consistent consultations.",
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

function CtaButtons({
  locale,
  primaryLabel,
  secondaryLabel,
  placement,
}: {
  locale: Locale;
  primaryLabel: string;
  secondaryLabel: string;
  placement: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/${locale}/demo`}
        onClick={() => track("lp_demo_click", { placement, locale })}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90"
      >
        {primaryLabel}
      </Link>
      <Link
        href={`/${locale}/whitepaper/ebm-2025`}
        onClick={() => track("lp_whitepaper_click", { placement, locale })}
        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}

export default function LandingV8({ locale }: { locale: string }) {
  const lang: Locale = locale === "en" ? "en" : "ja";
  const t = copy[lang];
  const [activeTab, setActiveTab] = useState<"cosmetics" | "inbound">(
    "cosmetics",
  );
  const active = t.tabs.find((tab) => tab.id === activeTab) ?? t.tabs[0];

  return (
    <main className="bg-gradient-to-b from-white to-slate-50">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:items-center md:p-10">
          <div>
            <p className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Visage AI for Inbound Retail
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {t.heroLead}
            </p>
            <div className="mt-6">
              <CtaButtons
                locale={lang}
                primaryLabel={t.demo}
                secondaryLabel={t.whitepaper}
                placement="hero"
              />
            </div>
            <a
              href="tel:+81-80-1180-8294"
              className="mt-4 inline-flex text-sm font-medium text-sky-700 hover:underline"
              onClick={() => track("phone_tap", { page: `/${lang}` })}
            >
              {t.phoneLabel}
            </a>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/hero_inbound_v2.png"
              alt="Visage AI iPad demo"
              width={960}
              height={720}
              className="w-full rounded-2xl border border-slate-200 object-cover"
              priority
            />
            <Image
              src="/images/screens/staff_mode_v32.png"
              alt="Show to Staff screen"
              width={960}
              height={720}
              className="w-full rounded-2xl border border-slate-200 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {t.problemsTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {t.problems.map((problem) => (
                <li key={problem}>❌ {problem}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {t.solutionsTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {t.solutions.map((solution) => (
                <li key={solution}>✅ {solution}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">{t.effectsTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {t.effects.map((effect) => (
            <article
              key={effect.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{effect.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{effect.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">{t.industryTitle}</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {t.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "cosmetics" | "inbound")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">{active.heading}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {active.bullets.map((bullet) => (
              <li key={bullet}>・{bullet}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">{t.transparencyTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{t.transparencyLead}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Image
              src="/images/screens/analysis_result_en.png"
              alt="Skin Transparency result example"
              width={840}
              height={1180}
              className="w-full rounded-2xl border border-slate-200 object-cover"
            />
            <Image
              src="/images/screens/staff_card_ja.png"
              alt="Staff recommendation guide example"
              width={840}
              height={1180}
              className="w-full rounded-2xl border border-slate-200 object-cover"
            />
          </div>
          <p className="mt-4 text-xs text-slate-500">{t.disclaimer}</p>
        </div>
      </section>

      <section
        id="poc-recruitment"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        onMouseEnter={() => track("poc_section_view", { locale: lang })}
      >
        <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm md:p-8">
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
            {t.poc.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
            {t.poc.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            {t.poc.lead}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                {t.poc.targetTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {t.poc.target.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                {t.poc.validateTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {t.poc.validate.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                {t.poc.effortTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {t.poc.effort.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lang}/contact?utm_source=lp&utm_medium=poc_section&utm_campaign=poc_recruitment`}
              onClick={() =>
                track("poc_cta_click", {
                  placement: "poc_recruitment",
                  locale: lang,
                })
              }
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90"
            >
              {t.poc.cta}
            </Link>
            <span className="text-xs text-slate-600">{t.poc.ctaSub}</span>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">{t.poc.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white md:p-8">
          <h2 className="text-2xl font-semibold">{t.pricingTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-100">
            {t.pricingItems.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-300">{t.pricingNote}</p>
          <div className="mt-6">
            <CtaButtons
              locale={lang}
              primaryLabel={t.demo}
              secondaryLabel={t.whitepaper}
              placement="pricing"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
