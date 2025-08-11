'use client';
import CodeBlock from '@/app/components/common/CodeBlock';
import {useEffect, useState} from 'react';

const swiftCode = `import VisageAI
let client = VisageAI(apiKey: ProcessInfo.processInfo.environment["NEXT_PUBLIC_VISAGE_KEY"]!)
let result = try await client.analyzy(
    imageUrl: URL(string: "https://.../face.jpg")!,
    attributes: [.wrinkle, .pigmentation, .sagging]
)
print(result.recommendations)`;

export default function SwiftSdkPage({params}: {params: {locale: string}}) {
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
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.sdkSwift.title}
      </nav>
      <h1>{messages.docs.pages.sdkSwift.title}</h1>
      <p>{messages.docs.pages.sdkSwift.subtitle}</p>
      <CodeBlock code={swiftCode} id="sdk-swift-snippet" />
      <h2>{messages.docs.pages.sdkSwift.response}</h2>
      <pre className="rounded-xl bg-slate-900 text-slate-50 p-4 overflow-auto">{`{
 "face": {"bbox":[120,80,520,560]},
 "findings": {"wrinkle":{"score":0.62, "heatmap":"/cdn/hm_abc.png"}},
 "explanations":[{"attribute":"wrinkle","top_regions":["periocular","forehead"]}],
 "recommendations":[{"sku":"NARS-UV-001","reason":"SPF & anti-oxidant","confidence":0.87}]
}`}</pre>
      
      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-js`}>{messages.docs.common.navigation.prev} {messages.docs.pages.sdkSwift.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-kotlin`}>{messages.docs.pages.sdkSwift.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}