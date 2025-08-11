'use client';
import {useEffect, useState} from 'react';

export default function SecurityPage({params}: {params: {locale: string}}) {
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

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.security.title}
      </nav>
      <h1>{messages.docs.pages.security.title}</h1>
      <ul>
        <li>PII not required (on-device preprocessing possible)</li>
        <li>Data retention: default 30 days (configurable)</li>
        <li>Regions: JP/US/EU selectable</li>
        <li>Transport: TLS 1.2+, JWT auth</li>
      </ul>
      
      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-kotlin`}>{messages.docs.common.navigation.prev} {messages.docs.pages.security.navigation.prev}</a></div>
        <div></div>
      </div>
    </article>
  );
}