'use client';
import { useEffect, useState } from 'react';

export default function CustomerUsePage({ params }: { params: { locale: string } }) {
  const [messages, setMessages] = useState<any>(null);
  const isJa = params.locale === 'ja';

  useEffect(() => {
    import(`../../../../messages/${params.locale}.json`).then(m => setMessages(m.default));
  }, [params.locale]);

  if (!messages) {
    return (
      <article className="prose prose-slate max-w-none">
        <div className="text-center py-8">Loading...</div>
      </article>
    );
  }

  const steps = isJa ? [
    { num: '1', title: 'お客様を案内', desc: 'カウンターにお客様をお招きし、iPadの前に座っていただきます。' },
    { num: '2', title: '言語を確認', desc: 'お客様の母語に合わせてアプリの言語を切り替えます。' },
    { num: '3', title: '診断を実行', desc: 'お客様の顔を撮影し、AIが肌診断を行います（約8秒）。' },
    { num: '4', title: '結果を説明', desc: 'ヒートマップを指さしながら、お客様に肌状態を説明します。' },
    { num: '5', title: '商品を提案', desc: 'AIのレコメンドに基づいて、最適な商品をご案内します。' },
  ] : [
    { num: '1', title: 'Welcome Customer', desc: 'Invite the customer to sit in front of the iPad at the counter.' },
    { num: '2', title: 'Confirm Language', desc: 'Switch the app language to match the customer\'s preference.' },
    { num: '3', title: 'Run Diagnosis', desc: 'Capture the customer\'s face. AI analyzes skin condition (~8 sec).' },
    { num: '4', title: 'Explain Results', desc: 'Point at the heatmap while explaining the skin condition.' },
    { num: '5', title: 'Recommend Products', desc: 'Guide optimal products based on AI recommendations.' },
  ];

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.sdkKotlin.title}
      </nav>
      <h1>{messages.docs.pages.sdkKotlin.title}</h1>
      <p>{messages.docs.pages.sdkKotlin.subtitle}</p>

      <div className="not-prose mt-6 space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="flex items-start gap-4 rounded-xl border p-4 bg-slate-50">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
              {step.num}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-purple-50 border border-purple-200 p-4">
        <h3 className="font-semibold text-purple-800">{isJa ? '🎯 ビジネスプランへのアップグレード' : '🎯 Upgrade to Business Plan'}</h3>
        <p className="text-sm text-purple-700 mt-1">
          {isJa
            ? '自社商品をAIにレコメンドさせたい場合は、ビジネスプラン（店舗契約）にお申し込みください。SKU登録を行うことで、お客様に最適な自社商品を自動で提案できます。'
            : 'Want AI to recommend your own products? Apply for the Business Plan (store contract). After SKU registration, AI will automatically suggest your products to customers.'}
        </p>
        <a
          href={`/${params.locale}/contact`}
          className="inline-block mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          {isJa ? '導入相談を予約' : 'Book Consultation'}
        </a>
      </div>

      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-swift`}>{messages.docs.common.navigation.prev} {messages.docs.pages.sdkKotlin.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/security`}>{messages.docs.pages.sdkKotlin.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}