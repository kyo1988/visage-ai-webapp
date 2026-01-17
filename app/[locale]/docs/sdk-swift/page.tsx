'use client';
import { useEffect, useState } from 'react';

export default function InitialSetupPage({ params }: { params: { locale: string } }) {
  const [messages, setMessages] = useState<any>(null);

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

  const page = messages.docs.pages.sdkSwift;

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {page.title}
      </nav>
      <h1>{page.title}</h1>
      <p>{page.subtitle}</p>

      <div className="not-prose mt-6 space-y-4">
        {page.steps?.map((step: any) => (
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

      {page.tips && (
        <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <h3 className="font-semibold text-blue-800">{page.tips.title}</h3>
          <ul className="text-sm text-blue-700 mt-2 space-y-1">
            {page.tips.items?.map((item: string, i: number) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-js`}>{messages.docs.common.navigation.prev} {page.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-kotlin`}>{page.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}