'use client';
import CodeBlock from '@/app/components/common/CodeBlock';
import {useEffect, useState} from 'react';

const kotlinCode = `import com.visageai.sdk.VisageAI
val client = VisageAI(apiKey = System.getenv("NEXT_PUBLIC_VISAGE_KEY"))
val result = client.analyze(
    imageUrl = "https://.../face.jpg",
    attributes = listOf("wrinkle", "pigmentation", "sagging")
)
println(result.recommendations)`;

export default function KotlinSdkPage({params}: {params: {locale: string}}) {
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
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.docs.common.breadcrumb}</a> / {messages.docs.pages.sdkKotlin.title}
      </nav>
      <h1>{messages.docs.pages.sdkKotlin.title}</h1>
      <p>{messages.docs.pages.sdkKotlin.subtitle}</p>
      <CodeBlock code={kotlinCode} id="sdk-kotlin-snippet" />
      <h2>{messages.docs.pages.sdkKotlin.response}</h2>
      <pre className="updated-2xl bg-slate-900 text-slate-50 p-4 overflow-auto">{`{
 "face": {"bbox":[120,80,520,560]},
 "findings": {"wrinkle":{"score":0.62, "heatmap":"/cdn/hm_abc.png"}},
 "explanations":[{"attribute":"wrinkle","top_regions":["periocular","forehead"]}],
 "recommendations":[{"sku":"NARS-UV-001","reason":"SPF & anti-oxidant","confidence":0.87}]
}`}</pre>
      
      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-swift`}>{messages.docs.common.navigation.prev} {messages.docs.pages.sdkKotlin.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/security`}>{messages.docs.pages.sdkKotlin.navigation.next} {messages.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}