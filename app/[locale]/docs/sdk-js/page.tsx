import CodeBlock from '@/app/components/common/CodeBlock';

export async function generateMetadata({params:{locale}}:{params:{locale:string}}){
  const title = locale==='ja' ? 'Visage AI – JavaScript SDK（日本語）' : 'Visage AI – JavaScript SDK';
  const description = locale==='ja' ? '最短ステップでAI肌診断を組み込む手順' : 'Quickstart to embed AI skin analysis';
  return {
    title,
    description,
    openGraph:{ title, description, images:['/og.jpg'], url:`/${locale}/docs/sdk-js` },
    alternates:{ canonical:`/${locale}/docs/sdk-js` }
  };
}

const jsCode = `import { VisageAI } from '@visageai/sdk';
const client = new VisageAI({ apiKey: process.env.NEXT_PUBLIC_VISAGE_KEY! });
const result = await client.analyze({
  imageUrl: 'https://.../face.jpg',
  attributes: ['wrinkle','pigmentation','sagging']
});
console.log(result.recommendations);`;

export default async function JsSdkPage({params}: {params: {locale: string}}) {
  const messages = params.locale === 'ja' 
    ? await import('../../../../messages/ja.json')
    : await import('../../../../messages/en.json');

  return (
    <article className="prose prose-slate max-w-none">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <a href={`/${params.locale}/docs`} className="hover:underline">{messages.default.docs.common.breadcrumb}</a> / {messages.default.docs.pages.sdkJs.title}
      </nav>
      <h1>{messages.default.docs.pages.sdkJs.title}</h1>
      <p>{messages.default.docs.pages.sdkJs.subtitle}</p>
      <CodeBlock code={jsCode} id="sdk-js-snippet" />
      <h2>{messages.default.docs.pages.sdkJs.response}</h2>
      <pre className="rounded-xl bg-slate-900 text-slate-50 p-4 overflow-auto">{`{
 "face": {"bbox":[120,80,520,560]},
 "findings": {"wrinkle":{"score":0.62, "heatmap":"/cdn/hm_abc.png"}},
 "explanations":[{"attribute":"wrinkle","top_regions":["periocular","forehead"]}],
 "recommendations":[{"sku":"NARS-UV-001","reason":"SPF & anti-oxidant","confidence":0.87}]
}`}</pre>
      
      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs`}>{messages.default.docs.common.navigation.prev} {messages.default.docs.pages.sdkJs.navigation.prev}</a></div>
        <div><a className="text-slate-700 hover:underline" href={`/${params.locale}/docs/sdk-swift`}>{messages.default.docs.pages.sdkJs.navigation.next} {messages.default.docs.common.navigation.next}</a></div>
      </div>
    </article>
  );
}