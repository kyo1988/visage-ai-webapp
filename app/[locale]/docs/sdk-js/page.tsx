'use client';
import { useEffect, useState } from 'react';

export default function AppSetupPage({ params }: { params: { locale: string } }) {
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
    { num: '1', title: 'App Storeを開く', desc: 'iPadでApp Storeアプリを起動します。' },
    { num: '2', title: '「Visage AI」で検索', desc: '検索バーに「Visage AI」と入力して検索します。' },
    { num: '3', title: 'アプリをインストール', desc: '「入手」ボタンをタップしてダウンロードします。' },
    { num: '4', title: 'アプリを起動', desc: 'インストール完了後、アプリを開いて準備完了です。' },
  ] : [
    { num: '1', title: 'Open App Store', desc: 'Launch the App Store app on your iPad.' },
    { num: '2', title: 'Search "Visage AI"', desc: 'Type "Visage AI" in the search bar.' },
    { num: '3', title: 'Install the App', desc: 'Tap "Get" to download the app.' },
    { num: '4', title: 'Launch the App', desc: 'Open the app after installation. You\'re ready!' },
  ];

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.sdkJs.title}
      </nav>
      <h1>{messages.docs.pages.sdkJs.title}</h1>
      <p>{messages.docs.pages.sdkJs.subtitle}</p>

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

      <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-4">
        <h3 className="font-semibold text-green-800">{isJa ? '✓ インストール完了' : '✓ Installation Complete'}</h3>
        <p className="text-sm text-green-700 mt-1">
          {isJa
            ? 'これでアプリの導入は完了です。次のステップで初期設定を行いましょう。'
            : 'App installation is complete. Proceed to the next step for initial setup.'}
        </p>
      </div>

      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs`}>{messages.docs.common.navigation.prev} {messages.docs.pages.sdkJs.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-swift`}>{messages.docs.pages.sdkJs.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}