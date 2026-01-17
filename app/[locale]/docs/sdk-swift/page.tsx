'use client';
import { useEffect, useState } from 'react';

export default function InitialSetupPage({ params }: { params: { locale: string } }) {
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
    { num: '1', title: 'アプリを起動', desc: 'Visage AIアプリをタップして開きます。' },
    { num: '2', title: '言語を選択', desc: '日本語、英語、中国語、韓国語から選択できます。' },
    { num: '3', title: 'カメラ権限を許可', desc: '「許可」をタップしてカメラへのアクセスを有効にします。' },
    { num: '4', title: '診断テスト', desc: 'ご自身の顔で診断をお試しください。結果が表示されれば設定完了です。' },
  ] : [
    { num: '1', title: 'Launch the App', desc: 'Tap the Visage AI app to open it.' },
    { num: '2', title: 'Select Language', desc: 'Choose from Japanese, English, Chinese, or Korean.' },
    { num: '3', title: 'Allow Camera Access', desc: 'Tap "Allow" to enable camera permissions.' },
    { num: '4', title: 'Test Diagnosis', desc: 'Try a diagnosis on yourself. If results appear, setup is complete!' },
  ];

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.sdkSwift.title}
      </nav>
      <h1>{messages.docs.pages.sdkSwift.title}</h1>
      <p>{messages.docs.pages.sdkSwift.subtitle}</p>

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

      <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">
        <h3 className="font-semibold text-blue-800">{isJa ? '💡 トライアル運用のコツ' : '💡 Trial Operation Tips'}</h3>
        <ul className="text-sm text-blue-700 mt-2 space-y-1">
          {isJa ? (
            <>
              <li>• 照明が明るい場所で診断すると精度が向上します</li>
              <li>• お客様に画面を見せながら説明すると効果的です</li>
              <li>• 診断結果は自動で多言語表示されます</li>
            </>
          ) : (
            <>
              <li>• Better lighting improves diagnosis accuracy</li>
              <li>• Show the screen to customers while explaining</li>
              <li>• Results display automatically in the selected language</li>
            </>
          )}
        </ul>
      </div>

      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-js`}>{messages.docs.common.navigation.prev} {messages.docs.pages.sdkSwift.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-kotlin`}>{messages.docs.pages.sdkSwift.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}